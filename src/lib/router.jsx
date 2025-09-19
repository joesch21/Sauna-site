import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const RouterContext = createContext(null)
const RouteMatchContext = createContext({ params: {} })

function getWindowLocation() {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '', hash: '' }
  }
  const { pathname, search, hash } = window.location
  return { pathname, search, hash }
}

function normalizePath(path) {
  if (!path) return '/'
  if (path === '/') return '/'
  const trimmed = path.replace(/\/+$/, '').replace(/^\/+/, '')
  return `/${trimmed}`
}

function matchPath(pattern, pathname) {
  if (!pattern) return { matched: false, params: {} }
  if (pattern === '*') return { matched: true, params: {} }

  const target = normalizePath(pattern)
  const current = normalizePath(pathname)

  const targetSegments = target === '/' ? [] : target.slice(1).split('/')
  const currentSegments = current === '/' ? [] : current.slice(1).split('/')

  if (targetSegments.length !== currentSegments.length) {
    return { matched: false, params: {} }
  }

  const params = {}
  for (let i = 0; i < targetSegments.length; i += 1) {
    const tSeg = targetSegments[i]
    const cSeg = currentSegments[i]
    if (tSeg.startsWith(':')) {
      params[tSeg.slice(1)] = decodeURIComponent(cSeg)
    } else if (tSeg === cSeg) {
      continue
    } else {
      return { matched: false, params: {} }
    }
  }

  return { matched: true, params }
}

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(() => getWindowLocation())

  useEffect(() => {
    const handlePop = () => {
      setLocation(getWindowLocation())
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = useCallback((to, options = {}) => {
    if (typeof to === 'number') {
      window.history.go(to)
      setLocation(getWindowLocation())
      return
    }
    const url = typeof to === 'string' ? to : `${to}`
    const { replace = false } = options
    if (replace) {
      window.history.replaceState({}, '', url)
    } else {
      window.history.pushState({}, '', url)
    }
    setLocation(getWindowLocation())
  }, [])

  const value = useMemo(() => ({ location, navigate }), [location, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

function useRouterContext() {
  const ctx = useContext(RouterContext)
  if (!ctx) {
    throw new Error('Router hooks must be used within a BrowserRouter')
  }
  return ctx
}

export function useLocation() {
  const { location } = useRouterContext()
  return location
}

export function useNavigate() {
  const { navigate } = useRouterContext()
  return navigate
}

export function Routes({ children }) {
  const { location } = useRouterContext()
  const arrayChildren = Children.toArray(children)
  for (const child of arrayChildren) {
    if (!isValidElement(child)) continue
    const { path = '*' } = child.props
    const match = matchPath(path, location.pathname)
    if (match.matched) {
      return (
        <RouteMatchContext.Provider value={match}>
          {child.props.element ?? null}
        </RouteMatchContext.Provider>
      )
    }
  }
  return null
}

export function Route() {
  return null
}

function shouldHandle(event) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey
  )
}

export function Link({ to, replace = false, onClick, ...rest }) {
  const navigate = useNavigate()
  const href = typeof to === 'string' ? to : `${to}`
  return (
    <a
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (shouldHandle(event)) {
          event.preventDefault()
          navigate(href, { replace })
        }
      }}
    />
  )
}

export function NavLink({
  to,
  className,
  activeClassName = 'active',
  children,
  end = false,
  ...rest
}) {
  const location = useLocation()
  const href = typeof to === 'string' ? to : `${to}`
  const current = normalizePath(location.pathname)
  const target = normalizePath(href)
  const isActive = end
    ? current === target
    : current === target || current.startsWith(`${target}/`)

  const computedClassName =
    typeof className === 'function'
      ? className({ isActive })
      : [className, isActive ? activeClassName : null]
          .filter(Boolean)
          .join(' ')

  const renderedChildren =
    typeof children === 'function' ? children({ isActive }) : children

  return (
    <Link
      to={href}
      className={computedClassName || undefined}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {renderedChildren}
    </Link>
  )
}

export function useParams() {
  const match = useContext(RouteMatchContext)
  return match?.params ?? {}
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, to, replace])
  return null
}

export default {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
}

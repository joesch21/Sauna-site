# Sauna Atelier

A Vite + React single page application for Sauna Atelier, featuring product listings, services, gallery, and an enquiry form backed by a Vercel serverless function.

## Getting started

```bash
yarn install
yarn dev
```

### Available scripts

- `yarn dev` – start the development server.
- `yarn build` – create a production build.
- `yarn preview` – preview the production build locally.
- `yarn lint` – run ESLint checks.

## Environment variables

Analytics scripts are loaded at runtime if the following variables are supplied:

- `VITE_PLAUSIBLE_DOMAIN` – domain for [Plausible](https://plausible.io/) analytics.
- `VITE_GA_MEASUREMENT_ID` – Google Analytics 4 measurement ID (used when Plausible is not configured).

## Contact API

The contact form posts to `/api/contact`. The serverless function currently validates the payload and returns a `200 OK` response. Extend the handler with your preferred email or CRM integration before going live.

## Deployment

The project is configured for Vercel. A `vercel.json` rewrite routes all requests to `index.html` to support SPA navigation. Connect the repository to Vercel, ensure environment variables are set for analytics, and run `yarn build` during the build step.

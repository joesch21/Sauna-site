export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // TODO: Integrate with email service or CRM
  console.log('New sauna enquiry', { name, email, phone, message })

  return res.status(200).json({ ok: true })
}

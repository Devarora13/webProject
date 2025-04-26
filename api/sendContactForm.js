import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { helpType, firstName, lastName, email, phone, companyName, country } = req.body;

  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: 'New Contact Us Submission',
    text: `
      Help Type: ${helpType}
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Company: ${companyName}
      Country: ${country}
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.response?.body || error.message);
    res.status(500).json({ error: 'Failed to send contact form' });
  }
}

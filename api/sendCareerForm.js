import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, jobRole, resumeFileName, resumeFileContent } = req.body;

  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: `New Career Application for ${jobRole}`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Applied For: ${jobRole}
    `,
    attachments: [
      {
        content: resumeFileContent, // Base64 string
        filename: resumeFileName,
        type: 'application/octet-stream',
        disposition: 'attachment',
      },
    ],
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.response?.body || error.message);
    res.status(500).json({ error: 'Failed to send career form' });
  }
}

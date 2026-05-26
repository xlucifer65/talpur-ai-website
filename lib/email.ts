import nodemailer from "nodemailer";

export async function sendLeadNotification(settings: Record<string, string>, lead: {
  full_name: string;
  work_email: string;
  company_name: string;
  company_size: string;
  service: string;
  challenge: string;
  referral: string;
}) {
  const host = settings["smtp_host"] || process.env.SMTP_HOST;
  const port = parseInt(settings["smtp_port"] || process.env.SMTP_PORT || "587");
  const user = settings["smtp_user"] || process.env.SMTP_USER;
  const pass = settings["smtp_pass"] || process.env.SMTP_PASS;
  const to = settings["notification_email"];

  if (!host || !user || !pass || !to) return;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transport.sendMail({
    from: user,
    to,
    subject: `New lead from ${lead.full_name} (${lead.company_name})`,
    text: [
      `New contact form submission on talpur.ai`,
      ``,
      `Name: ${lead.full_name}`,
      `Email: ${lead.work_email}`,
      `Company: ${lead.company_name} (${lead.company_size})`,
      `Service: ${lead.service}`,
      `How they found you: ${lead.referral}`,
      ``,
      `Challenge:`,
      lead.challenge,
    ].join("\n"),
    html: `
      <h2>New lead: ${lead.full_name}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td><b>Name</b></td><td>${lead.full_name}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${lead.work_email}">${lead.work_email}</a></td></tr>
        <tr><td><b>Company</b></td><td>${lead.company_name}</td></tr>
        <tr><td><b>Size</b></td><td>${lead.company_size}</td></tr>
        <tr><td><b>Service</b></td><td>${lead.service}</td></tr>
        <tr><td><b>Source</b></td><td>${lead.referral}</td></tr>
      </table>
      <h3 style="margin-top:16px">Challenge</h3>
      <p style="font-family:sans-serif;font-size:14px;max-width:600px">${lead.challenge.replace(/\n/g, "<br>")}</p>
    `,
  });
}

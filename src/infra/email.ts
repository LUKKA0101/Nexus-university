import nodemailer from "nodemailer";

export async function transporter(to: string, token: string) {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transport.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Convite de acesso",
    html: `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #f5f5f5; padding: 2rem;">
  <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden;">
    <div style="background: #1a1a2e; padding: 1.5rem 2rem;">
      <p style="color: #fff; font-size: 18px; font-weight: 500; margin: 0;">Escola</p>
    </div>
    <div style="padding: 2rem;">
      <p style="font-size: 22px; font-weight: 500; margin: 0 0 0aolor: #fff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 15px;">
        Ativar minha conta
      </a>
      <p style="font-size: 13px; color: #999; margin: 1.5rem 0 0; line-height: 1.7;">
        Este link expira em 48 horas. Se você não esperava este email, pode ignorá-lo.
      </p>
    </div>
    <div style="border-top: 1px solid #eee; padding: 1rem 2rem;">
      <p style="font-size: 12px; color: #999; margin: 0;">© 2025 Escola. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>
`,
  });
}

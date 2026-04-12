import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? 'Victoria <noreply@benavidesasociados.com>';
const APP_URL = process.env.NEXTAUTH_URL ?? 'https://agentefiscal.vercel.app';

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Bienvenido/a a Victoria, ${name}`,
      html: welcomeHtml(name),
    });
  } catch (e) {
    // Log but don't block registration if email fails
    console.error('Error enviando email de bienvenida:', e);
  }
}

function welcomeHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:#0D2E35;padding:28px 36px;">
            <span style="font-size:20px;font-weight:700;color:white;letter-spacing:-0.04em;">Asesor</span><span style="font-size:20px;font-weight:700;color:#00B5AD;letter-spacing:-0.04em;position:relative;top:-1px;">IA</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 36px 28px;">
            <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">Hola, ${name} 👋</h1>
            <p style="margin:0 0 8px;font-size:15px;color:#374151;line-height:1.7;">
              Tu cuenta en <strong style="color:#0D2E35;">Victoria</strong> ha sido creada con éxito.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#6B7280;line-height:1.7;">
              Ya puedes consultar normativa fiscal española con inteligencia artificial — BOE, DGT y AEAT en tiempo real.
            </p>
            <a href="${APP_URL}/login"
               style="display:inline-block;background:#00B5AD;color:#0D2E35;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;">
              Iniciar sesión →
            </a>
          </td>
        </tr>
        <tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #F3F4F6;margin:0;"></td></tr>
        <tr>
          <td style="padding:20px 36px;font-size:12px;color:#9CA3AF;line-height:1.6;">
            Benavides Asociados · Pollença, Illes Balears<br>
            Si no creaste esta cuenta, puedes ignorar este email.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

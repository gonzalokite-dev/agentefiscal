import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? 'Victoria <noreply@getvictoria.app>';
const APP_URL = process.env.NEXTAUTH_URL ?? 'https://getvictoria.app';

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const firstName = name.split(' ')[0];
  const result = await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Bienvenido/a a Victoria, ${firstName}`,
    html: welcomeHtml(firstName),
  });
  if (result.error) {
    console.error('[Resend] Error enviando bienvenida:', result.error);
    throw new Error(result.error.message);
  }
  console.log('[Resend] Email enviado OK:', result.data?.id);
}

function welcomeHtml(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Bienvenido/a a Victoria</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FA;padding:48px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0D2E35;padding:28px 40px;">
            <img src="${APP_URL}/logo-victoria-transparent.png" alt="Victoria" height="28" style="display:block;">
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0D2E35;letter-spacing:-0.02em;">
              Hola, ${firstName}
            </h1>
            <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.7;">
              Tu cuenta en <strong style="color:#0D2E35;">Victoria</strong> ha sido creada con éxito.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#6B7280;line-height:1.7;">
              Ya puedes consultar normativa fiscal española con IA — BOE, DGT, AEAT, TEAC y jurisprudencia del CENDOJ en tiempo real.
            </p>

            <!-- CTA -->
            <a href="${APP_URL}/chat"
               style="display:inline-block;background:#00B5AD;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:0.01em;">
              Acceder a Victoria →
            </a>
          </td>
        </tr>

        <!-- Capabilities -->
        <tr>
          <td style="padding:0 40px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#F9FAFB;border-radius:10px;padding:20px 24px;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:0.1em;text-transform:uppercase;">
                    Qué puedes hacer con Victoria
                  </p>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:4px 0;font-size:13px;color:#4B5563;line-height:1.5;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Normativa fiscal</strong> — consultas a DGT, AEAT y BOE en tiempo real
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;font-size:13px;color:#4B5563;line-height:1.5;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Documentos</strong> — analiza facturas, contratos y expedientes
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;font-size:13px;color:#4B5563;line-height:1.5;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Redacción</strong> — recursos, liquidaciones y resúmenes para tus clientes
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #F3F4F6;margin:0;"></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;font-size:12px;color:#9CA3AF;line-height:1.7;">
            Benavides Asociados · Pollença, Illes Balears<br>
            <a href="${APP_URL}" style="color:#9CA3AF;text-decoration:underline;">getvictoria.app</a>
            &nbsp;·&nbsp;
            Si no creaste esta cuenta, puedes ignorar este email.
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

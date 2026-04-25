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
          <td style="padding:40px 40px 24px;">
            <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0D2E35;letter-spacing:-0.02em;">
              Hola, ${firstName}
            </h1>
            <p style="margin:0 0 12px;font-size:15px;color:#374151;line-height:1.7;">
              Tu cuenta en <strong style="color:#0D2E35;">Victoria</strong> ha sido creada con éxito. Bienvenido/a al copiloto fiscal diseñado para profesionales que trabajan con la fiscalidad española cada día.
            </p>
            <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
              Victoria es una IA especializada en derecho tributario español que consulta en tiempo real las fuentes oficiales: <strong style="color:#0D2E35;">BOE, DGT, AEAT, TEAC</strong> y jurisprudencia del <strong style="color:#0D2E35;">CENDOJ</strong>. No trabaja con datos desactualizados — cada respuesta parte de la normativa vigente.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
              Está pensada para <strong style="color:#0D2E35;">asesorías y gestorías</strong>, departamentos de contabilidad y profesionales independientes que necesitan respuestas precisas, con fuente y adaptadas a cada comunidad autónoma — sin tener que buscar manualmente en decenas de documentos.
            </p>

            <!-- CTA -->
            <a href="${APP_URL}/chat"
               style="display:inline-block;background:#00B5AD;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:0.01em;">
              Empezar a usar Victoria →
            </a>
          </td>
        </tr>

        <!-- Capabilities -->
        <tr>
          <td style="padding:16px 40px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#F9FAFB;border-radius:10px;padding:20px 24px;">
                  <p style="margin:0 0 14px;font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:0.1em;text-transform:uppercase;">
                    Qué puedes hacer con Victoria
                  </p>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding:5px 0;font-size:13px;color:#4B5563;line-height:1.6;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Consulta normativa</strong> — pregunta sobre IRPF, IVA, IS, sucesiones o cualquier tributo y obtén respuesta con cita de la fuente oficial
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;font-size:13px;color:#4B5563;line-height:1.6;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Analiza documentos</strong> — sube facturas, contratos, liquidaciones o expedientes y Victoria los interpreta fiscalmente
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;font-size:13px;color:#4B5563;line-height:1.6;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Redacta escritos</strong> — recursos de reposición, alegaciones, consultas vinculantes y resúmenes para clientes
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;font-size:13px;color:#4B5563;line-height:1.6;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Cobertura autonómica</strong> — aplica la normativa correcta según la CCAA del contribuyente, incluidos regímenes forales
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:5px 0;font-size:13px;color:#4B5563;line-height:1.6;">
                        ✦&nbsp;&nbsp;<strong style="color:#0D2E35;">Jurisprudencia</strong> — accede a sentencias del TS, AN y TSJ a través del CENDOJ para fundamentar criterios
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Tip -->
        <tr>
          <td style="padding:0 40px 32px;">
            <p style="margin:0;font-size:13px;color:#6B7280;line-height:1.7;border-left:3px solid #00B5AD;padding-left:14px;">
              <strong style="color:#374151;">Consejo para empezar:</strong> Dile a Victoria el tributo y la comunidad autónoma del contribuyente — cuanto más contexto le das, más precisa es la respuesta.
            </p>
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

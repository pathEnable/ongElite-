import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND_COLOR = '#059669'; // Un vert émeraude élégant pour l'ONG
const ADMIN_EMAIL = 'patrice03dev@gmail.com'; // À adapter si besoin

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'ONG Les Élites de Demain <onboarding@resend.dev>',
      to: email,
      subject: 'Bienvenue à notre Newsletter ! 🌟',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: ${BRAND_COLOR}; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Bienvenue aux Élites de Demain !</h1>
          </div>
          <div style="padding: 40px 30px; line-height: 1.6; color: #1e293b;">
            <p style="font-size: 18px;">Bonjour,</p>
            <p>C'est un plaisir de vous compter parmi nous ! Vous venez de rejoindre une communauté de jeunes engagés pour un avenir meilleur.</p>
            <p>Grâce à notre newsletter, vous serez au premier rang pour suivre :</p>
            <ul style="padding-left: 20px;">
              <li>L'évolution de nos projets sur le terrain</li>
              <li>Nos appels à bénévolat et événements</li>
              <li>L'impact de vos dons et de nos actions</li>
            </ul>
            <p>Ensemble, redonnons l'espoir !</p>
            <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; pt: 20px; text-align: center;">
              <p style="font-size: 14px; color: #64748b;">L'équipe de l'ONG Les Élites de Demain</p>
              <p style="font-size: 12px; color: #94a3b8;">Parakou, Bénin</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function sendContactConfirmationEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'ONG Les Élites de Demain <onboarding@resend.dev>',
      to: email,
      subject: 'Nous avons bien reçu votre message 📨',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: ${BRAND_COLOR}; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Merci de nous avoir contactés</h1>
          </div>
          <div style="padding: 40px 30px; line-height: 1.6; color: #1e293b;">
            <p style="font-size: 18px;">Bonjour ${name},</p>
            <p>Nous avons bien reçu votre message et nous vous remercions de l'intérêt que vous portez à l'ONG Les Élites de Demain.</p>
            <p>Notre équipe examine actuellement votre demande et reviendra vers vous dans les plus brefs délais (généralement sous 48h).</p>
            <p>En attendant, n'hésitez pas à nous suivre sur nos réseaux sociaux ou à consulter nos derniers projets sur notre site.</p>
            <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; pt: 20px; text-align: center;">
              <p style="font-size: 14px; color: #64748b;">Cordialement,<br />L'équipe de l'ONG Les Élites de Demain</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function sendAdminAlertEmail(contactData: { name: string, email: string, subject: string, message: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Alertes ONG <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `🚨 Nouveau message : ${contactData.subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ff0000; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #fef2f2; padding: 20px; border-bottom: 1px solid #fee2e2;">
            <h2 style="color: #991b1b; margin: 0;">Nouveau message de contact reçu</h2>
          </div>
          <div style="padding: 30px; line-height: 1.6; color: #1e293b;">
            <p><strong>De :</strong> ${contactData.name} (${contactData.email})</p>
            <p><strong>Sujet :</strong> ${contactData.subject}</p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid ${BRAND_COLOR}; margin: 20px 0;">
              <p style="margin: 0; white-space: pre-wrap;">${contactData.message}</p>
            </div>
            <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
              Vous pouvez répondre directement en écrivant à <a href="mailto:${contactData.email}">${contactData.email}</a>.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Admin alert error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Admin alert error:', error);
    return { success: false, error };
  }
}

export async function sendDonationReceiptEmail(email: string, name: string, amount: number) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'ONG Les Élites de Demain <onboarding@resend.dev>',
      to: email,
      subject: 'Merci pour votre générosité ! ❤️ Reçu de don',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: ${BRAND_COLOR}; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Un grand MERCI !</h1>
          </div>
          <div style="padding: 40px 30px; line-height: 1.6; color: #1e293b;">
            <p style="font-size: 18px;">Bonjour ${name},</p>
                <p>Nous avons bien reçu votre don de <strong>${amount.toLocaleString('fr-FR')} FCFA</strong> et nous vous en remercions du fond du cœur.</p>
            <p>Votre générosité est le moteur de nos actions. Grâce à vous, l'ONG <strong>Les Élites de Demain</strong> peut continuer à transformer des vies et à construire un avenir meilleur pour ceux qui en ont le plus besoin.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px dashed ${BRAND_COLOR}; margin: 20px 0; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">DÉTAILS DU DON</p>
              <h2 style="margin: 10px 0; color: ${BRAND_COLOR};">${amount.toLocaleString('fr-FR')} FCFA</h2>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">Donateur : ${name}</p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">Date : ${new Date().toLocaleDateString('fr-FR')}</p>
            </div>

            <p>Ce message fait office d'accusé de réception. Un reçu fiscal officiel vous sera envoyé ultérieurement si nécessaire.</p>
            
            <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; pt: 20px; text-align: center;">
              <p style="font-size: 14px; color: #64748b;">Ensemble, redonnons l'espoir.</p>
              <p style="font-size: 12px; color: #94a3b8;">L'équipe de l'ONG Les Élites de Demain</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

import { render } from '@react-email/render'
import { EmailService } from '@/common/service/email'
import ForgotPasswordEmail from '@/routes/api/users/email-template/auth/ForgotPasswordEmail'
import MultiFactorAuth from '@/routes/api/users/email-template/auth/MultiFactorAuth'

export type TSendEmailParams = {
  to: string[] | string
}

export class AuthEmail extends EmailService {
  async sendForgotPasswordEmail(
    sendEmailParams: TSendEmailParams & { magicLink: string }
  ) {
    const { to, magicLink } = sendEmailParams
    const emailHtml = await render(ForgotPasswordEmail({ magicLink }))
    const sendEmail = super.sendEmail({
      to: typeof to === 'string' ? [to] : to,
      template: emailHtml,
      subject: 'Forgot Password Link',
    })
    return await sendEmail
  }
  async sendMFA(sendEmailParams: TSendEmailParams & { code: string }) {
    const { to, code } = sendEmailParams
    const emailHtml = await render(MultiFactorAuth({ validationCode: code }))
    const sendEmail = super.sendEmail({
      to: typeof to === 'string' ? [to] : to,
      template: emailHtml,
      subject: 'Multi-factor Authentication Code',
    })
    return await sendEmail
  }
}

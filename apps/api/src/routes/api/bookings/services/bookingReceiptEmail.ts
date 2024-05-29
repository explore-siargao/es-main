import { render } from '@react-email/render'
import { EmailService } from '@/common/service/email'
import PaymentEmailConfirmation from '@/routes/api/bookings/email-template/PaymentEmailConfirmation'
import { APP_NAME } from '@repo/constants'

export type TSendEmailParams = {
  to: string[] | string
  imageKey: string
  title: string
}

export class BookingReceiptEmail extends EmailService {
  async sendReiptConfirmation(
    sendEmailParams: TSendEmailParams & {
      amount: string
      imageKey: string
      title: string
    }
  ) {
    const { to, amount, imageKey, title } = sendEmailParams
    const emailHtml = render(PaymentEmailConfirmation(amount, imageKey, title))
    const sendEmail = super.sendEmail({
      to: typeof to === 'string' ? [to] : to,
      template: emailHtml,
      subject: `Payment Receipt for ${APP_NAME}`,
    })
    return await sendEmail
  }
}

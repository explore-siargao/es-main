import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { APP_NAME } from '@repo/constants'
import * as React from 'react'
import {
  buttonContainer,
  button,
  container,
  heading,
  hr,
  logo,
  main,
  paragraph,
  reportLink,
  listingImage,
} from './styles'
import formatCurrency from '@/common/helpers/formatCurrency'

export const PaymentEmailConfirmation = (
  amount: string,
  imageKey: string,
  title: string
) => {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return (
    <Html>
      <Head />
      <Preview>Payment Receipt for {APP_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.WEB_URL}/logo-single.png`}
            width="42"
            height="42"
            alt={APP_NAME}
            style={logo}
          />
          <Heading style={heading}>
            You paid {formatCurrency(Number(amount))} to {APP_NAME}
          </Heading>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`${process.env.WEB_URL}/assets/${imageKey}`}
              width="50"
              height="42"
              alt={title}
              style={{ marginRight: '10px', marginTop: '7px' }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '7px',
              }}
            >
              <p style={{ fontWeight: 'bold', margin: 0 }}>{title}</p>
            </div>
          </div>
          <Text style={paragraph}>
            Transaction ID:
            <span style={{ marginRight: '10px' }}>
              <Link
                href="#"
                style={{
                  color: '#9DD5D6',
                  textDecoration: 'underline',
                  marginLeft: '10px',
                }}
              >
                ES-0001112222
              </Link>
            </span>
            <br />
            <span style={{ marginRight: '10px' }}>
              Transaction Date: {date}
            </span>
            <br />
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            "Thank you for choosing to visit us! We appreciate your patronage
            and hope you had an enjoyable experience. We look forward to
            welcoming you back soon!"
          </Text>
          <Hr style={hr} />
          <Link href={process.env.WEB_URL} style={reportLink}>
            {APP_NAME}
          </Link>
        </Container>
      </Body>
    </Html>
  )
}

export default PaymentEmailConfirmation

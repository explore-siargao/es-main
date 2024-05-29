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
} from '../styles'

interface ForgotPasswordEmailProps {
  magicLink: string
}

export const ForgotPasswordEmail = ({
  magicLink,
}: ForgotPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Your forgot password link for {APP_NAME}</Preview>
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
          Your forgot password link for {APP_NAME}
        </Heading>
        <Section style={buttonContainer}>
          <Button style={button} href={magicLink}>
            Change Password
          </Button>
        </Section>
        <Text style={paragraph}>
          This link will only be valid for the next 30 minutes.
        </Text>
        <Hr style={hr} />
        <Link href={process.env.WEB_URL} style={reportLink}>
          {APP_NAME}
        </Link>
      </Container>
    </Body>
  </Html>
)

export default ForgotPasswordEmail

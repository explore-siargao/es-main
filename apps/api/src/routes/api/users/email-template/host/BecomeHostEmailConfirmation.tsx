import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import { APP_NAME } from '@repo/constants'
import * as React from 'react'
import {
  container,
  heading,
  hr,
  logo,
  main,
  paragraph,
  reportLink,
} from '../styles'
import { WEB_URL } from '@/routes/../common/constants/ev'

export const BecomeHostEmailConfirmation = () => {
  return (
    <Html>
      <Head />
      <Preview>Start adding your listing {APP_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${process.env.WEB_URL}/logo-single.png`}
            width="42"
            height="42"
            alt={APP_NAME}
            style={logo}
          />
          <Heading style={heading}>Congratulations!</Heading>
          <Text style={paragraph}>
            You are now an ExploreSiargao host. We appreciate your trust and
            confidence with us. You can now start adding your listing.
          </Text>
          <Hr style={hr} />
          <Link href={WEB_URL} style={reportLink}>
            {APP_NAME}
          </Link>
        </Container>
      </Body>
    </Html>
  )
}

export default BecomeHostEmailConfirmation

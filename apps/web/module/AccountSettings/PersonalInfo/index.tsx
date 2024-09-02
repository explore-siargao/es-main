"use client"
import AccountSettingWrapper from "@/module/AccountSettings/components/AccountSettingWrapper"
import { LINK_ACCOUNT } from "@/common/constants"
import React from "react"
import LegalName from "./LegalName"
import EmailAddress from "./EmailAddress"
import PhoneNumber from "./PhoneNumber"
import GovernmentId from "./GovernmentId"
import Address from "./Address"
import EmergencyContact from "./EmergencyContact"
import { Breadcrumb } from "@/common/components/ui/Breadcrumb"
import useSessionStore from "@/common/store/useSessionStore"
import { E_UserRole, T_EmergencyContact } from "@repo/contract"
import { ACCOUNT, PERSONAL_INFO } from "@/common/constants"
import { Typography } from "@/common/components/ui/Typography"

const PersonalInfo = () => {
  const session = useSessionStore((state) => state)
  const userId = session.id
  const personalInfo = session?.personalInfo
  return (
    <AccountSettingWrapper>
      <div>
        <Breadcrumb home={ACCOUNT} page={PERSONAL_INFO} link={LINK_ACCOUNT} />
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="text-4xl my-3.5"
        >
          {PERSONAL_INFO}
        </Typography>
      </div>
      <div>
        <div className="divide-y">
          <LegalName
            firstName={personalInfo?.firstName}
            lastName={personalInfo?.lastName}
            userId={session?.id as string}
          />
          <EmailAddress
            email={session?.email as string}
            id={session?.id as number}
          />
          {session.role !== E_UserRole.Admin && (
            <>
              <PhoneNumber
                phoneNumber={personalInfo?.phoneNumber}
                userId={session?.id as string}
              />
              <GovernmentId governmentId={personalInfo?.governmentId} />
              <Address
                country={personalInfo?.Address?.country as string}
                city={personalInfo?.Address?.city as string}
                stateProvince={personalInfo?.Address?.stateProvince as string}
                streetAddress={personalInfo?.Address?.streetAddress as string}
                zipCode={personalInfo?.Address?.zipCode as number}
                personalInfoId={userId as string}
                aptSuite={personalInfo?.Address?.aptSuite}
                id={personalInfo?.Address?.id as string}
              />
              <EmergencyContact
                emergencyContact={
                  personalInfo?.emergencyContacts as T_EmergencyContact[]
                }
                id={personalInfo?.id as string}
              />
            </>
          )}
        </div>
      </div>
    </AccountSettingWrapper>
  )
}

export default PersonalInfo

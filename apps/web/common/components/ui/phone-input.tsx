import { Input } from "@/common/components/ui/Input"
import { Option, Select } from "@/common/components/ui/Select"
import React from "react"

interface PhoneInputProps {
  countryCode: string
  phoneNumber: string
  onCountryCodeChange: (value: string) => void
  onPhoneNumberChange: (value: string) => void
  disabled?: boolean
}

export const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+63", country: "PH" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+7", country: "RU" },
  { code: "+82", country: "KR" },
  { code: "+31", country: "NL" },
  { code: "+46", country: "SE" },
  { code: "+55", country: "BR" },
  { code: "+52", country: "MX" },
  { code: "+20", country: "EG" },
  { code: "+234", country: "NG" },
  { code: "+27", country: "ZA" },
  { code: "+62", country: "ID" },
  { code: "+60", country: "MY" },
  { code: "+64", country: "NZ" },
  { code: "+90", country: "TR" },
  { code: "+971", country: "AE" },
  { code: "+65", country: "SG" },
  { code: "+66", country: "TH" },
  { code: "+92", country: "PK" },
  { code: "+94", country: "LK" },
  { code: "+357", country: "CY" },
  { code: "+358", country: "FI" },
  { code: "+48", country: "PL" },
  { code: "+351", country: "PT" },
  { code: "+386", country: "SI" },
  { code: "+421", country: "SK" },
  { code: "+420", country: "CZ" },
  { code: "+32", country: "BE" },
  { code: "+43", country: "AT" },
  { code: "+41", country: "CH" },
  { code: "+372", country: "EE" },
  { code: "+375", country: "BY" },
  { code: "+370", country: "LT" },
  { code: "+371", country: "LV" },
  { code: "+373", country: "MD" },
  { code: "+380", country: "UA" },
  { code: "+998", country: "UZ" },
  { code: "+996", country: "KG" },
  { code: "+995", country: "GE" },
  { code: "+94", country: "LK" },
  { code: "+977", country: "NP" },
  { code: "+880", country: "BD" },
  { code: "+675", country: "PG" },
  { code: "+679", country: "FJ" },
  { code: "+676", country: "TO" },
  { code: "+677", country: "SB" },
  { code: "+685", country: "WS" },
  { code: "+686", country: "KI" },
  { code: "+687", country: "NC" },
  { code: "+689", country: "PF" },
  { code: "+350", country: "GI" },
  { code: "+356", country: "MT" },
  { code: "+357", country: "CY" },
  { code: "+218", country: "LY" },
  { code: "+213", country: "DZ" },
  { code: "+216", country: "TN" },
  { code: "+212", country: "MA" },
  { code: "+251", country: "ET" },
  { code: "+254", country: "KE" },
  { code: "+256", country: "UG" },
  { code: "+255", country: "TZ" },
]

export function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  disabled = false,
}: PhoneInputProps) {
  return (
    <div className="grid grid-cols-[120px,1fr]">
      <Select
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        disabled={disabled}
        label="Code"
        className="rounded-r-none border-r-0"
      >
        {countryCodes.map((country) => (
          <Option key={country.code} value={country.code}>
            {country.code} ({country.country})
          </Option>
        ))}
      </Select>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^0-9]/g, "")
          onPhoneNumberChange(numericValue)
        }}
        className="rounded-l-none"
        placeholder="Phone number"
        disabled={disabled}
        label="Phone number"
        required
      />
    </div>
  )
}

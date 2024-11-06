import { T_GovernmentId } from "@repo/contract"

export enum E_Listing_Status {
  edit = "edit",
  setup = "setup",
}

export enum E_Supported_Currencies {
  PHP = 'PHP',
  USD = 'USD',
  KRW = 'KRW',
  EUR = 'EUR',
  AUD = 'AUD',
  ILS = 'ILS',
  GBP = 'GBP'
}

export interface IUser {
  id?: number
  role?: UserRole
  registrationType?: RegistrationType
  email: string
  address?: string
  password?: string
  contactNumber?: number
  birthDate?: string
  createdAt?: string
  deletedAt?: string
  updatedAt?: string
}

export interface IPersonalInfo {
  id?: string
  userId?: string
  firstName?: string
  lastName?: string
  middleName?: string
  birthDate?: string
  governmentId?: T_GovernmentId[]
  phoneNumber?: string
  country?: string
  address?: IAddress
  emergencyContact?: IEmergencyContact[]
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface IAddress {
  id?: number
  peronalInfoId?: number
  streetAddress: string
  city: string
  zipCode: number
  country: string
  howToGetThere: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface IEmergencyContact {
  id?: string
  personalInfoId?: string
  name?: string
  relationship?: string
  email?: string
  phoneNumber?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface IPrice {
  id?: number
  fee: number
  cleaningFee: number
  serviceFee: number
  isNight: boolean
  checkIn?: string
  checkOut?: string
  countGuest?: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface IPaymentMethod {
  id?: string
  userId?: string
  cardNumber?: string
  countryRegion?: string
  cvv?: number
  expirationDate?: string
  zipCode?: number
  isDefault?: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface ICoupon {
  id?: number
  createdBy?: number
  usedBy?: number | null
  code?: string
  expirationDate?: string
  reward?: string
  isUsed: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface IWishGroup {
  id?: number
  title?: string
  newTitle?: string
  oldTitle?: string
  listingId?: number
  note?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface IReview {
  userId?: number
  listingId?: number
  cleanLinessRates?: number
  accuracyRates?: number
  checkInRates?: number
  communicationRates?: number
  locationRates?: number
  valueRates?: number
  comment?: string
}

export interface ComponentProps {
  onClick: () => void
  icon?: React.ReactNode
  text?: string
  note?: string
  id?: string
}

//stores
type Email = {
  email: string
}
type Action = {
  updateEmail: (email: Email["email"]) => void
}

export interface DetailsType {
  id: number
  link: string
  img: string
  title: string
  listingId: number | undefined
  address: string
  description: string
  price: string
  note: string
  isNight: boolean
  priceProps: IPrice
}

enum UserRole {
  Admin,
  Host,
  User,
}

export enum RegistrationType {
  "Manual",
  "Facebook",
  "Google",
}

export interface ITaxes {
  id?: number
  countryRegion: string
  vatId: string
  nameOnRegistration: string
  addressLine1: string
  addressLine2: string
  city: string
  provinceRegion: string
  zipPostalCode: string
  createdAt?: string
  updateAt?: string
  deleteAt?: string
}

export interface IAddress {
  street: string
  barangay: string
  city: string
  zipCode: number
  latitude: number
  longitude: number
}

export interface IPhotos {
  id?: number
  thumbKey?: string
  key: string
  description: string
  tags: string
  file: File
  isMain: boolean
}

import { Application } from 'express'
import { API_ROOT, MOCK_ROOT } from '@repo/constants'
import AssetsRoute from '@/routes/assets'

// api
import UsersRoute from '@/routes/api/users'
import PaymentsRoute from '@/routes/api/payments'
import TaxesRoute from '@/routes/api/taxes'
import ReportsRoute from '@/routes/api/reports'
import RentalsRoute from '@/routes/api/rentals'
import ActivitiesRoute from '@/routes/api/activities'
import PropertiesRoute from '@/routes/api/properties'

// mock
import MockUsersRoute from '@/routes/mock/users'
import MockBookingsRoute from '@/routes/mock/bookings'
import MockListingsRoute from '@/routes/mock/listings'
import MockCartRoute from '@/routes/mock/carts'
import MockConversationRoute from '@/routes/mock/conversations'
import MockPropertiesRoute from '@/routes/mock/properties'
import MockBookableUnitTypeRoute from '@/routes/mock/bookableUnitType'
import MockReservationsRoute from '@/routes/mock/reservations'
import MockRentalsRoute from '@/routes/mock/rentals'
import MockBookableUnits from '@/routes/mock/bookableUnits'
import MockActivitiesRoute from '@/routes/mock/activities'

export default function (app: Application) {
  app.use(`/assets`, AssetsRoute)

  // API
  app.use(`${API_ROOT}/users`, UsersRoute)
  app.use(`${API_ROOT}/payments`, PaymentsRoute)
  app.use(`${API_ROOT}/taxes`, TaxesRoute)
  app.use(`${API_ROOT}/reports`, ReportsRoute)
  app.use(`${API_ROOT}/rentals`, RentalsRoute)
  app.use(`${API_ROOT}/activities`, ActivitiesRoute)
  app.use(`${API_ROOT}/properties`, PropertiesRoute)

  // MOCK
  app.use(`${MOCK_ROOT}/users`, MockUsersRoute)
  app.use(`${MOCK_ROOT}/bookings`, MockBookingsRoute)
  app.use(`${MOCK_ROOT}/listings`, MockListingsRoute)
  app.use(`${MOCK_ROOT}/carts`, MockCartRoute)
  app.use(`${MOCK_ROOT}/conversations`, MockConversationRoute)
  app.use(`${MOCK_ROOT}/properties`, MockPropertiesRoute)
  app.use(`${MOCK_ROOT}/bookable-unit-type`, MockBookableUnitTypeRoute)
  app.use(`${MOCK_ROOT}/reservations`, MockReservationsRoute)
  app.use(`${MOCK_ROOT}/bookable-units`, MockBookableUnits)
  app.use(`${MOCK_ROOT}/rentals`, MockRentalsRoute)
  app.use(`${MOCK_ROOT}/activities`, MockActivitiesRoute)
}

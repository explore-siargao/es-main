import { Application } from 'express'
import { API_ROOT, API_ROOT_V2, MOCK_ROOT } from '@repo/constants'
import AssetsRoute from '@/routes/assets'

// api v1
// import UsersRoute from '@/routes/api/users'
import ListingsRoute from '@/routes/api/listings'
// import PaymentRoute from '@/routes/api/payments'
// import TaxesRoute from '@/routes/api/taxes'
// import XenditRoute from '@/routes/api/xendit'
// import BookingsRoute from '@/routes/api/bookings'
// import TransactionsRoute from '@/routes/api/transactions'
// import ReportsRoute from '@/routes/api/reports'

// api v2
import UsersRouteV2 from '@/routes/api/users-v2'
import PaymentsRouteV2 from '@/routes/api/payments-v2'
import TaxesRouteV2 from '@/routes/api/taxes-v2'
import ReportsRouteV2 from '@/routes/api/reports-v2'
import RentalsRouteV2 from '@/routes/api/rentals-v2'
import ActivitiesRouteV2 from '@/routes/api/activities-v2'
import PropertiesRouteV2 from '@/routes/api/properties-v2'

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

  // API V1
  // app.use(`${API_ROOT}/users`, UsersRoute)
  // app.use(`${API_ROOT}/payments`, PaymentRoute)
  // app.use(`${API_ROOT}/taxes`, TaxesRoute)
  app.use(`${API_ROOT}/listings`, ListingsRoute)
  // app.use(`${API_ROOT}/xendit`, XenditRoute)
  // app.use(`${API_ROOT}/bookings`, BookingsRoute)
  // app.use(`${API_ROOT}/transactions`, TransactionsRoute)
  // app.use(`${API_ROOT}/reports`, ReportsRoute)

  // API V2
  app.use(`${API_ROOT_V2}/users`, UsersRouteV2)
  app.use(`${API_ROOT_V2}/payments`, PaymentsRouteV2)
  app.use(`${API_ROOT_V2}/taxes`, TaxesRouteV2)
  app.use(`${API_ROOT_V2}/reports`, ReportsRouteV2)
  app.use(`${API_ROOT_V2}/rentals`, RentalsRouteV2)
  app.use(`${API_ROOT_V2}/activities`, ActivitiesRouteV2)
  app.use(`${API_ROOT_V2}/properties`, PropertiesRouteV2)

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

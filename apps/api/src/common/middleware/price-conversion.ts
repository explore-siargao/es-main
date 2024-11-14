import { ResponseService } from '@/common/service/response'
import { NextFunction, Request, Response } from 'express'
import redisClient from '@/common/utils/redisClient'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import {
  E_Supported_Currencies,
  Z_Supported_Currency,
} from '@repo/contract-2/currency'

type CurrencyRates = {
  [currency: string]: number
}

const response = new ResponseService()

const priceConversion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currency = req.header('currency');
  const isValid = Z_Supported_Currency.safeParse(currency).success
  const validCurrency = isValid
    ? (req.header('currency') as E_Supported_Currencies)
    : E_Supported_Currencies.PHP
  try {
    const date = new Date()
    const timeZone: string = 'Asia/Manila'
    const zonedDate: Date = toZonedTime(date, timeZone)
    const formattedDate: string = format(zonedDate, 'MM-dd-yyyy')

    const conversionRate = await redisClient.hGetAll(
      `conversion-rates:${formattedDate}`
    )

    if (!conversionRate || Object.keys(conversionRate).length === 0) {
      // If no conversion rates are found in Redis, fetch new data from the API
      const conversionRates = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/PHP`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )

      const data = await conversionRates.json()

      // Filter to only supported currencies
      const filteredRates = Object.keys(E_Supported_Currencies).reduce(
        (acc: CurrencyRates, currency: string) => {
          if (data.conversion_rates[currency] !== undefined) {
            acc[currency] = data.conversion_rates[currency]
          }
          return acc
        },
        {} as CurrencyRates
      )

      // Save filtered rates to Redis
      await redisClient.hSet(
        `conversion-rates:${formattedDate}`,
        Object.entries(filteredRates).reduce(
          (acc, [key, value]) => {
            acc[key] = value.toString()
            return acc
          },
          {} as Record<string, string>
        )
      )

      // Set response data
      res.locals.currency = {
        preferred: validCurrency,
        conversionRates: filteredRates,
      }
    } else {
      // If conversion rates are found in Redis, use them
      res.locals.currency = {
        preferred: validCurrency,
        conversionRates: conversionRate,
      }
    }

    next()
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}
export default priceConversion

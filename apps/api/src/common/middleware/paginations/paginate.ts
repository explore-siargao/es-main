import { Request, Response, NextFunction, RequestHandler } from 'express'

interface QueryParams {
  page?: string
  limit?: string
}

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        page: number
        limit: number
      }
    }
  }
}

const paginationMiddleware = (defaultLimit: number = 10): RequestHandler => {
  return (
    req: Request<{}, {}, {}, QueryParams>,
    res: Response,
    next: NextFunction
  ) => {
    const { page = '1', limit = defaultLimit.toString() } = req.query

    const parsedPage = parseInt(page, 10)
    const parsedLimit = parseInt(limit, 10)

    req.pagination = {
      page: isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage,
      limit: isNaN(parsedLimit) || parsedLimit < 1 ? defaultLimit : parsedLimit,
    }

    next()
  }
}

export default paginationMiddleware

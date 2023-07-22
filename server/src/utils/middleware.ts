import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express"

export const unknownEndpoint = (request: Request, response: Response) => {
    return response.status(404).send({ error: 'unknown endpoint' })
}
  
// FIX ME
export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


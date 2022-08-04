import { Request, Response, NextFunction } from "express"
import {
  AccessError,
  AuthorizationError,
  InvalidInputError,
  NonExistantDataError,
} from "../errors"

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  if (err instanceof InvalidInputError) {
    res.sendStatus(400)
  } else if (err instanceof AccessError || err instanceof AuthorizationError) {
    res.sendStatus(401)
  } else if (err instanceof NonExistantDataError) {
    res.sendStatus(404)
  } else {
    res.sendStatus(500)
  }
}

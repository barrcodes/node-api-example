import { validateOrReject } from "class-validator"

export class InvalidInputError implements Error {
  public name = "InvalidInputError"
  public message: string

  constructor(public field: string, public data: any) {
    const dataText = JSON.stringify(data)
    this.message = `Attempted to post invalid data. field: ${field}, value: ${dataText}`
  }
}

export const validateOrRejectInvalidInput = async (data: any) => {
  try {
    await validateOrReject(data)
  } catch (e) {
    throw new InvalidInputError("body", data)
  }
}

import { json } from "remix"

export type BadRequestData = {
  fields: {
    username?: string
    password?: string
    repeatPassword?: string
  }
  fieldErrors: {
    username?: string
    password?: string
    repeatPassword?: string
  }
}

export const badRequest = (data: BadRequestData) => {
  return json(data, { status: 404 })
}

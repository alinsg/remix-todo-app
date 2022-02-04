import { json } from "remix"

export type LoginBadRequestData = {
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

export type RegisterBadRequestData = {
  fields: {
    username?: string
    firstName?: string
    lastName?: string
    password?: string
    repeatPassword?: string
  }
  fieldErrors: {
    username?: string
    firstName?: string
    lastName?: string
    password?: string
    repeatPassword?: string
  }
}

export const loginBadRequest = (data: LoginBadRequestData) => {
  return json(data, { status: 404 })
}

export const registerBadRequest = (data: RegisterBadRequestData) => {
  return json(data, { status: 404 })
}

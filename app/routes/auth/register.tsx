import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/react"
import { Form, ActionFunction, useActionData, Link } from "remix"
import Card from "~/components/auth/AuthCard"
import DividerWithText from "~/components/auth/DividerWithText"

function validateUsername(username?: string) {
  const USERNAME_LENGTH = 3
  if (typeof username !== "string" || username.length < USERNAME_LENGTH) {
    return `Usernames must be at least ${USERNAME_LENGTH} characters long`
  }
}

function validatePassword(password?: string) {
  const PASSWORD_LENGTH = 5
  if (typeof password !== "string" || password.length < PASSWORD_LENGTH) {
    return `Password must be at least ${PASSWORD_LENGTH} characters long`
  }
}

function validateRepeatPassword(password?: string, passwordRepeat?: string) {
  if (passwordRepeat !== password) {
    return `The passwords do not match`
  }

  return validatePassword(passwordRepeat)
}

type ActionData = {
  formError?: string
  fields?: { username: string; password: string; passwordRepeat: string }
  fieldErrors?: {
    username?: string
    password?: string
    passwordRepeat?: string
  }
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const { username, password, passwordRepeat } = Object.fromEntries(
    await request.formData()
  )

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof passwordRepeat !== "string"
  ) {
    return { formError: `Form not submitted correctly` }
  }

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
    passwordRepeat: validateRepeatPassword(password, passwordRepeat),
  }

  const fields = { username, password, passwordRepeat }

  return { fields, fieldErrors }
}

function Register() {
  const actionData = useActionData<ActionData | undefined>()

  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card width="400px">
        <Form method="post">
          <Stack spacing="6">
            <FormControl
              id="username"
              isInvalid={actionData?.fieldErrors?.username !== undefined}
            >
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input name="username" type="text" />
              <FormHelperText>
                {actionData?.fieldErrors?.username &&
                  actionData?.fieldErrors?.username}
              </FormHelperText>
            </FormControl>
            <FormControl
              id="password"
              isInvalid={actionData?.fieldErrors?.password !== undefined}
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input name="password" type="password" />
              <FormHelperText>
                {actionData?.fieldErrors?.password &&
                  actionData?.fieldErrors?.password}
              </FormHelperText>
            </FormControl>
            <FormControl
              id="passwordRepeat"
              isInvalid={actionData?.fieldErrors?.passwordRepeat !== undefined}
            >
              <FormLabel htmlFor="passwordRepeat">Repeat password</FormLabel>
              <Input name="passwordRepeat" type="password" />
              <FormHelperText>
                {actionData?.fieldErrors?.passwordRepeat &&
                  actionData?.fieldErrors?.passwordRepeat}
              </FormHelperText>
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Register
            </Button>
            <DividerWithText>Already have an account?</DividerWithText>
            <Link to="/auth/login">
              <Button colorScheme="gray" size="lg" fontSize="md" width="100%">
                Login
              </Button>
            </Link>
          </Stack>
        </Form>
      </Card>
    </Flex>
  )
}

export default Register

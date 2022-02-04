import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/react"
import {
  Form,
  ActionFunction,
  useActionData,
  Link,
  LoaderFunction,
} from "remix"
import { loginBadRequest } from "~/utils/authUtils.server"
import Card from "~/components/auth/AuthCard"
import DividerWithText from "~/components/auth/DividerWithText"
import { createUserSession, login } from "~/utils/session.server"

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

type ActionData = {
  formError?: string
  fields?: { username: string; password: string }
  fieldErrors?: { username?: string; password?: string }
}

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const { username, password } = Object.fromEntries(await request.formData())

  if (typeof username !== "string" || typeof password !== "string") {
    return { formError: `Form not submitted correctly` }
  }

  const fields = { username, password }

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return loginBadRequest({ fields, fieldErrors })
  }

  const user = await login({ username, password })

  if (!user) {
    return {
      fields,
      formError: "Username and password combination is incorrect",
    }
  }

  return createUserSession(user.id, "/")
}

function Login() {
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
              <FormLabel htmlFor="username" textAlign="center">
                Username
              </FormLabel>
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
              <FormLabel htmlFor="password" textAlign="center">
                Password
              </FormLabel>
              <Input name="password" type="password" />
              <FormHelperText>
                {actionData?.fieldErrors?.password &&
                  actionData?.fieldErrors?.password}
              </FormHelperText>
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Sign in
            </Button>
            <DividerWithText>Don't have an account?</DividerWithText>
            <Link to="/register">
              <Button colorScheme="gray" size="lg" fontSize="md" width="100%">
                Register
              </Button>
            </Link>
          </Stack>
        </Form>
      </Card>
    </Flex>
  )
}

export default Login

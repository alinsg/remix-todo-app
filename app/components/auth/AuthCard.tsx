import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react"

export const Card = (props: BoxProps) => (
  <Box
    width="300px"
    bg={useColorModeValue("white", "gray.700")}
    py="8"
    px={{ base: "4", md: "10" }}
    shadow="base"
    rounded={{ sm: "lg" }}
    {...props}
  />
)

export default Card

import {
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "remix";
import type { MetaFunction } from "remix";
import { ChakraProvider, Flex } from "@chakra-ui/react";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ChakraProvider>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html>
      <head>
        <title>{title ? title : "Todo App"}</title>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      width="100%"
      height="100vh"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding={{ base: "0px", md: "16px", lg: "24px" }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        height="100%"
        width={{ base: "48px", sm: "128px", md: "184px", lg: "240px" }}
        paddingTop="24px"
        paddingBottom="24px"
      >
        <Link to="/">Todo App</Link>
      </Flex>
      <Flex
        width="100%"
        height="100%"
        backgroundColor="#F6F9FE"
        borderRadius="16px"
        marginLeft="16px"
        padding="24px"
      >
        {children}
      </Flex>
    </Flex>
  );
}

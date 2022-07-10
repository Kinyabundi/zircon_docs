import { ChakraProvider } from "@chakra-ui/react"
import ContextProvider from "../context/state"


function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <ContextProvider>
                <Component {...pageProps} />
            </ContextProvider>
        </ChakraProvider>
    )
}

export default MyApp

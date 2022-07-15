import { ChakraProvider } from "@chakra-ui/react"
import ContextProvider from "../context/state"
import dynamic from "next/dynamic"
import "@solana/wallet-adapter-react-ui/styles.css"


function MyApp({ Component, pageProps }) {
    const WalletConnectionProvider = dynamic(() => import("../context/WalletConnectionProvider"), { ssr: false })

    return (
        <ChakraProvider>
            <WalletConnectionProvider>
                <ContextProvider>
                    <Component {...pageProps} />
                </ContextProvider>
            </WalletConnectionProvider>
        </ChakraProvider>
    )
}

export default MyApp

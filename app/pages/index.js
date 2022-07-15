import Landing from "../components/Landing";
import Feed from "../components/Feed";
import { useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head"

export default function Home() {
    const { connected } = useWallet();

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100&display=swap"
                    rel="stylesheet"
                />
                <title>Home</title>
            </Head>
            {connected ? <Feed /> : <Landing />}
        </>
    );
}

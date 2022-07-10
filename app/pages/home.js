import {
    Button,
    Box,
} from '@chakra-ui/react'
import Side from "../components/Sidebar"
import { VscGitPullRequestCreate } from "react-icons/vsc"
import { useRouter } from "next/router"
import Head from "next/head"


const Home = () => {
    const router = useRouter()
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100&display=swap" rel="stylesheet" />
                <title>Home</title>
            </Head>
            <Side />
            <Box display="flex" justifyContent={"center"} h={"70vh"} alignItems={"center"}>
                <Button
                    colorScheme={'whatsapp'}
                    color={"gray.900"}
                    size="lg"
                    leftIcon={<VscGitPullRequestCreate />}
                    pl={20}
                    onClick={() => router.push('/create_request')}
                >
                    Create New Document Request
                </Button>
            </Box>
        </>
    );
}

export default Home;
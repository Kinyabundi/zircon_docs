import {
    Flex,
    Box,
    useColorModeValue,
    Text
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import RequestItem from "../components/RequestItem"
import ReplyMessage from "../components/ReplyMessage"
import ReplyDocument from "../components/ReplyDocument"
import Head from "next/head"


const MyRequests = () => {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100&display=swap" rel="stylesheet" />
                <title>My Requests</title>
            </Head>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontFamily={"Poppins"}
                pl={48}
            >
                <ReplyMessage />
                <ReplyDocument />
                <Sidebar />
                <Box mt={5} mx={"auto"} w={{ lg: 8 / 12, xl: 5 / 12 }}>
                <Text fontWeight="semibold" fontSize="lg" color={"teal.500"}>
                    My Requests
                </Text>
                    {[...Array(7)].map((_, i) => <RequestItem key={i} />)}
                </Box>
            </Flex>
        </>
    )
}

export default MyRequests
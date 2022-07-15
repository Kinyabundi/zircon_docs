import {
    Flex,
    Box,
    useColorModeValue,
    Text
} from "@chakra-ui/react"
import RequestItem from "./RequestItem"
import ReplyMessage from "./ReplyMessage"
import ReplyDocument from "./ReplyDocument"


const RequestsToMe = () => {
    return (
        <>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <ReplyDocument />
                <ReplyMessage />
                <Box mt={5} mx={"auto"} w={"100%"} px={20} >
                    {[...Array(7)].map((_, i) => <RequestItem key={i} />)}
                </Box>
            </Flex>
        </>
    )
}

export default RequestsToMe
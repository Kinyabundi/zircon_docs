import {
    Flex,
    Box,
    useColorModeValue,
    Text
} from "@chakra-ui/react"
import RequestItem from "./RequestItem"
import ReplyMessage from "./ReplyMessage"
import ReplyDocument from "./ReplyDocument"


const MyRequests = () => {
    return (
        <>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <ReplyMessage />
                <ReplyDocument />
                <Box mt={5} mx={"auto"} w={"100%"} px={20}>
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
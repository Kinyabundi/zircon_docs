import { Flex, Box, useColorModeValue, Text } from "@chakra-ui/react";
import RequestItem from "./RequestItem";

const RequestsToMe = ({ requests, getDocumentReplies, getMessageReplies }) => {
    return (
        <>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                {requests.length > 0 ? (
                    <Box mt={5} mx={"auto"} w={"100%"} px={20}>
                        {requests.map((request) => (
                            <RequestItem
                                key={request.account.requestIndex}
                                request={request.account}
                                getDocumentReplies={getDocumentReplies}
                                getMessageReplies={getMessageReplies}
                            />
                        ))}
                    </Box>
                ) : (
                    <Text>No new Requests</Text>
                )}
            </Flex>
        </>
    );
};

export default RequestsToMe;

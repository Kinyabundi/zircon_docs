import {
    Stack,
    Box,
    FormControl,
    FormLabel,
    Textarea,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
    Button,
    useColorModeValue,
    useToast,
    Flex,
} from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { TbSend } from "react-icons/tb";
import { useContext, useState } from "react";
import { ModalContext } from "../context";
import useRequests from "../hooks/useRequests";

const ReplyMessage = () => {
    const {
        requestIndex,
        replyCount,
        initialTab,
        setCurrentTab,
        setInitialTab
    } = useContext(ModalContext);
    const toast = useToast();

    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState("");
    const { createNewReplyMessage } = useRequests();

    const clickSubmit = async (e) => {
        e.preventDefault();
        if (!message || !author) {
            toast({
                title: "Error",
                description: "Please fill all the fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            await createNewReplyMessage(
                requestIndex,
                replyCount,
                message,
                author
            );
            setMessage("");
            setAuthor("");
            setCurrentTab(initialTab)
            setInitialTab(0)
            toast({
                title: "Reply message sent.",
                description:
                    "We've sent your reply message for you. await response from addressee",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            ustify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontFamily={"Poppins"}
            mt={5}
        >
            <Stack spacing={8} mx={"auto"} w={"400px"}>
                        <Box p={4}>
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>Message</FormLabel>
                                    <Textarea
                                        placeholder="Type a message ..."
                                        size="sm"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Your Name</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Icon as={FiUser} w={4} h={4} />
                                        </InputLeftElement>
                                        <Input
                                            variant={"flushed"}
                                            color={"gray.500"}
                                            placeholder={"Jake Novan"}
                                            value={author}
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
                                        />
                                    </InputGroup>
                                </FormControl>

                                <Button
                                    bg={"blue.400"}
                                    color={"white"}
                                    leftIcon={<TbSend />}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                    onClick={clickSubmit}
                                >
                                    Send a Reply
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
        </Flex>
    );
};

export default ReplyMessage;

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
    useToast,
    Text,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react";

import { FiUser } from "react-icons/fi";
import { TbSend } from "react-icons/tb";
import { BiUpload } from "react-icons/bi";
import { useContext, useState, useRef } from "react";
import { ModalContext } from "../context";
import useRequests from "../hooks/useRequests";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

const ReplyDocument = () => {
    const {
        requestIndex,
        replyCount,
        initialTab,
        setCurrentTab,
        setInitialTab,
        setTabname,
        setReplyCount,
        setRequestIndex,
    } = useContext(ModalContext);
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState("");
    const fileRef = useRef(null);
    const toast = useToast();

    const { createNewReplyDocument } = useRequests();

    const clickSubmit = async (e) => {
        e.preventDefault();
        if (!message || !author || !file) {
            toast({
                title: "Error",
                description: "Please fill all the fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            setLoading(true);
            const added = await client.add(file);
            await createNewReplyDocument(
                requestIndex,
                replyCount,
                message,
                author,
                filename,
                added.path
            );
            setLoading(false);
            setMessage("");
            setAuthor("");
            setFilename("");
            setFile(null);
            setCurrentTab(initialTab)
            setInitialTab(0)
            setTabname("")
            setReplyCount(0)
            setRequestIndex(0)
            toast({
                title: "Document sent.",
                description: "We've sent your document for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleFileChange = e => setFile(e.target.files[0]);

    return (
        <Flex
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontFamily={"Poppins"}
            mt={5}
        >
            <Stack spacing={8} mx={"auto"} w={"400px"}>
                <Box p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                placeholder="Type a message ..."
                                size="md"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
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
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <Flex align="center">
                            <Button
                                colorScheme={"teal"}
                                leftIcon={<BiUpload />}
                                variant={"solid"}
                                my={5}
                                onClick={() => fileRef.current.click()}
                            >
                                Upload Document
                            </Button>
                            {file && <Text>{file.name}</Text>}
                        </Flex>
                        <Input
                            mt={0}
                            type="file"
                            hidden
                            color={"gray.100"}
                            onChange={(e) => handleFileChange(e)}
                            ref={fileRef}
                        />
                        <Button
                            bg={"blue.400"}
                            color={"white"}
                            leftIcon={<TbSend />}
                            _hover={{
                                bg: "blue.500",
                            }}
                            isLoading={loading}
                            loadingText={"Uploading File ..."}
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

export default ReplyDocument;

import {
    Flex,
    useColorModeValue,
    Stack,
    Box,
    FormControl,
    FormLabel,
    Textarea,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Button,
    FormHelperText,
    useToast
} from "@chakra-ui/react"
import { FiUser } from "react-icons/fi"
import { IoWalletOutline } from "react-icons/io5"
import { TbSend } from "react-icons/tb"
import { useState } from "react"

const CreateRequest = ({ createNewRequest, refreshRequests }) => {
    const [message, setMessage] = useState("")
    const [author, setAuthor] = useState("")
    const [addressTo, setAddressTo] = useState("")
    const toast = useToast()

    const clickSubmit = async e => {
        e.preventDefault()
        if (!message || !author || !addressTo){
            toast({
                title: "Error",
                description: "Please fill all the fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }else {
            await createNewRequest(message, author, addressTo, "approved")
            setMessage("")
            setAuthor("")
            setAddressTo("")
            toast({
                title: 'Request created.',
                description: "We've created your request for you. await response from addressed to",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            refreshRequests()
        }
    }



    return (
        <>
            <Flex
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontFamily={"Poppins"}
                mt={5}
            >
                <Stack spacing={4} mx={"auto"} w={"450px"}>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Message</FormLabel>
                                <Textarea
                                    placeholder='Type request message'
                                    size='md'
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
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
                                        onChange={e => setAuthor(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Wallet Address</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={IoWalletOutline} w={4} h={4} />
                                    </InputLeftElement>
                                    <Input
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        placeholder={"e.g. 9cH8J47J9Xjc2MbeDY9Nmytf91brc3KSNDxxwRY3UgZA"}
                                        value={addressTo}
                                        onChange={e => setAddressTo(e.target.value)}
                                    />
                                </InputGroup>
                                <FormHelperText>Paste the Wallet Address of the Target Hospital</FormHelperText>
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
                                Send Request
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default CreateRequest
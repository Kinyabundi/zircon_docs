import {
    Flex,
    useColorModeValue,
    Stack,
    Text,
    Box,
    FormControl,
    FormLabel,
    Textarea,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Button,
    FormHelperText
} from "@chakra-ui/react"
import { FiUser } from "react-icons/fi"
import { IoWalletOutline } from "react-icons/io5"
import { TbSend } from "react-icons/tb"
import Side from "../components/Sidebar"
import Head from "next/head"

const CreateRequest = () => {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100&display=swap" rel="stylesheet" />
                <title>Create Request</title>
            </Head>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontFamily={"Poppins"}
                ml={30}
            >
                <Side />
                <Stack spacing={8} mx={"auto"} w={"450px"}>
                    <Stack align={"center"}>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            Create new Request
                        </Text>
                    </Stack>
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
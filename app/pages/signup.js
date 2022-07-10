import { useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    Icon,
} from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { BsFillTelephoneFill } from "react-icons/bs";
import Head from "next/head";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneno, setPhoneno] = useState("");



    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100&display=swap" rel="stylesheet" />
                <title>Signup</title>
            </Head>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontFamily={"Poppins"}
            >
                <Stack spacing={8} mx={"auto"} w={"450px"}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Welcome </Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            Create an Account
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
                                <FormLabel>Name</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={FiUser} w={4} h={4} />
                                    </InputLeftElement>
                                    <Input
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={"Hospital Name"}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={HiOutlineMail} w={4} h={4} />
                                    </InputLeftElement>
                                    <Input
                                        type="email"
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={"hospital@hosp.com"}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Phone no</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={BsFillTelephoneFill} w={4} h={4} />
                                    </InputLeftElement>
                                    <Input
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        value={phoneno}
                                        onChange={(e) => setPhoneno(e.target.value)}
                                        placeholder={"+91-1234567890"}
                                    />
                                </InputGroup>
                            </FormControl>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                leftIcon={<RiLoginCircleFill />}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Signup
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}
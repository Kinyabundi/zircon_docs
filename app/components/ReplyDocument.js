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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useColorModeValue,
} from "@chakra-ui/react"

import { FiUser } from "react-icons/fi"
import { TbSend } from "react-icons/tb"
import { BiUpload } from "react-icons/bi"
import { useContext } from "react"
import { ModalContext } from "../context"



const ReplyDocument = () => {
    const {
        documentModalOpen,
        setDocumentModalOpen,
    } = useContext(ModalContext)

    return (
        <Modal isOpen={documentModalOpen} onClose={setDocumentModalOpen} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Document Upload</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={8} mx={"auto"} w={"400px"}>
                        <Box
                            p={8}
                        >
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>Message</FormLabel>
                                    <Textarea
                                        placeholder='Type a message ...'
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

                                <Button
                                    colorScheme={"teal"}
                                    leftIcon={<BiUpload />}
                                    variant={"solid"}
                                    my={5}

                                >
                                    Upload Document
                                </Button>

                                <Button
                                    bg={"blue.400"}
                                    color={"white"}
                                    leftIcon={<TbSend />}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Send a Reply
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => setDocumentModalOpen(false)}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReplyDocument
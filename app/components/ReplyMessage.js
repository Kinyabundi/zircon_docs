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
import { useContext } from "react"
import { ModalContext } from "../context"



const ReplyMessage = () => {
    const {
        messageModalOpen,
        setMessageModalOpen,
    } = useContext(ModalContext)

    return (
        <Modal isOpen={messageModalOpen} onClose={setMessageModalOpen} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reply Message</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={8} mx={"auto"} w={"400px"}>
                        <Box
                            p={4}
                        >
                            <Stack spacing={4}>
                                <FormControl id="email">
                                    <FormLabel>Message</FormLabel>
                                    <Textarea
                                        placeholder='Type a message ...'
                                        size='sm'
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
                        onClick={() => setMessageModalOpen(false)}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReplyMessage
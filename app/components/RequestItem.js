import {
    Box,
    Flex,
    chakra,
    Text,
    Link,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Avatar,
    Button
} from "@chakra-ui/react";
import { RiMessage3Fill, RiRefreshLine } from "react-icons/ri"
import { useContext } from "react"
import { ModalContext } from "../context"


const RequestItem = () => {
    const { setMessageModalOpen, setDocumentModalOpen } = useContext(ModalContext)
    return (
        <Box mt={7}>
            <Flex alignItems={"center"}>
                <Flex alignItems={"center"}>
                    <Avatar src={"https://source.unsplash.com/random"} />
                    <Text mx={2} fontWeight={'bold'} color={'gray.700'}>
                        John Doe
                    </Text>
                    <Link mx={5} color={'gray.400'}>
                        H6iJCmgaVifcooW72YZ3grfg7MG2Yn9rHrK52F6ndFgD
                    </Link>
                </Flex>
                <chakra.p ml={5} fontSize={'sm'} color={'gray.600'}>
                    {'1 hour ago'}
                </chakra.p>
            </Flex>
            <chakra.p my={2} fontSize={'sm'} color={'gray.600'}>
                {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            </chakra.p>
            <Tabs isFitted variant={'enclosed'}>
                <TabList mb={'1em'}>
                    <Tab>Messages</Tab>
                    <Tab>Files / Documents</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex alignItems={"center"} justifyContent={"space-between"} mt={3}>
                            <Button colorScheme={'whatsapp'} leftIcon={<RiMessage3Fill />} onClick={() => setMessageModalOpen(true)}>
                                Send a New Message
                            </Button>
                            <Button colorScheme={'facebook'} leftIcon={<RiRefreshLine />} >
                                Refresh Messages
                            </Button>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex alignItems={"center"} justifyContent={"space-between"} mt={3}>
                            <Button colorScheme={'whatsapp'} leftIcon={<RiMessage3Fill />} onClick={() => setDocumentModalOpen(true)}>
                                Send a New Document
                            </Button>
                            <Button colorScheme={'facebook'} leftIcon={<RiRefreshLine />} >
                                Refresh Docs
                            </Button>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <br />
            <hr style={{ backgroundColor: "#cbd5e0", color: "#cbd5e0", height: 2 }} />
        </Box>
    )
}

export default RequestItem
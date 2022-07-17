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
    Button,
} from "@chakra-ui/react";
import { RiMessage3Fill, RiRefreshLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { ModalContext } from "../context";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import RequestReplyDocument from "./RequestReplyDocument";
import RequestReplyMessage from "./RequestReplyMessage";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

const RequestItem = ({ request, getMessageReplies, getDocumentReplies }) => {
    const {
        currentTab,
        setInitialTab,
        setCurrentTab,
        setRequestIndex,
        setReplyCount,
        setTabname,
    } = useContext(ModalContext);

    const [replyMsgs, setReplyMsgs] = useState([]);
    const [replyDocs, setReplyDocs] = useState([]);
    const [showMsgs, setShowMsgs] = useState(false);
    const [showDocs, setShowDocs] = useState(false);

    const openMessageModal = () => {
        setInitialTab(currentTab);
        setCurrentTab(4);
        setTabname("Reply Message");
        setRequestIndex(request.requestIndex);
        setReplyCount(request.requestReplyCount);
    };

    const openDocumentModal = () => {
        setInitialTab(currentTab);
        setCurrentTab(4);
        setTabname("Reply Document");
        setRequestIndex(request.requestIndex);
        setReplyCount(request.requestReplyCount);
    };

    const getMsgs = async () => {
        let msgs = await getMessageReplies(
            request.requestIndex,
            request.requestReplyCount
        );
        setReplyMsgs(msgs);
        // check if there are any messages and show the message tab
        msgs.every((el) => {
            el === null ? setShowMsgs(false) : setShowMsgs(true);
        });
    };
    const getDocs = async () => {
        let docs = await getDocumentReplies(
            request.requestIndex,
            request.requestReplyCount
        );
        setReplyDocs(docs);
        // check if the docs are null or not to show the reply document tab
        docs.every((el) => {
            el === null ? setShowDocs(false) : setShowDocs(true);
        });
    };

    return (
        <Box mt={7}>
            <Flex alignItems={"center"}>
                <Flex alignItems={"center"}>
                    <Avatar
                        src={`https://avatars.dicebear.com/api/adventurer/${request.requestAuthor
                            .toLowerCase()
                            .replaceAll(" ", "")}.svg`}
                    />
                    <Text mx={2} fontWeight={"bold"} color={"gray.700"}>
                        {request.requestAuthor}
                    </Text>
                    <Link mx={5} color={"gray.400"}>
                        {request.authority.toString()}
                    </Link>
                </Flex>
                <chakra.p ml={5} fontSize={"sm"} color={"gray.600"}>
                    {timeAgo.format(
                        new Date(request.requestTime * 1000),
                        "twitter-now"
                    )}
                </chakra.p>
            </Flex>
            <chakra.p my={2} fontSize={"sm"} color={"gray.600"}>
                {request.requestMessage}
            </chakra.p>
            <Tabs isFitted variant={"enclosed"}>
                <TabList mb={"1em"}>
                    <Tab>Messages</Tab>
                    <Tab>Files / Documents</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            mt={3}
                        >
                            <Button
                                colorScheme={"whatsapp"}
                                leftIcon={<RiMessage3Fill />}
                                onClick={openMessageModal}
                            >
                                Send a New Message
                            </Button>
                            <Button
                                colorScheme={"facebook"}
                                leftIcon={<RiRefreshLine />}
                                onClick={getMsgs}
                            >
                                Refresh Messages
                            </Button>
                        </Flex>
                        <Text>Messages</Text>
                        {showMsgs ? (
                            replyMsgs.map((reply) => (
                                <RequestReplyMessage
                                    key={reply?.replyIndex}
                                    replyDetail={reply}
                                />
                            ))
                        ) : (
                            <Text>No new replies</Text>
                        )}
                    </TabPanel>
                    <TabPanel>
                        <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            mt={3}
                        >
                            <Button
                                colorScheme={"whatsapp"}
                                leftIcon={<RiMessage3Fill />}
                                onClick={openDocumentModal}
                            >
                                Send a New Document
                            </Button>
                            <Button
                                colorScheme={"facebook"}
                                leftIcon={<RiRefreshLine />}
                                onClick={getDocs}
                            >
                                Refresh Docs
                            </Button>
                        </Flex>
                        <Text>Docs</Text>
                        {showDocs ? (
                            replyDocs.map((doc) => (
                                <RequestReplyDocument
                                    replyDetail={doc}
                                    key={doc?.replyIndex}
                                />
                            ))
                        ) : (
                            <Text>No new docs uploaded</Text>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <br />
            <hr
                style={{
                    backgroundColor: "#cbd5e0",
                    color: "#cbd5e0",
                    height: 2,
                }}
            />
        </Box>
    );
};

export default RequestItem;

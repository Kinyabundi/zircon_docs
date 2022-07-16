import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateRequest from "./CreateRequest";
import MyRequests from "./MyRequests";
import RequestsToMe from "./RequestsToMe";
import Signup from "./Signup";
import useAccount from "../hooks/useAccount";
import useRequests from "../hooks/useRequests";
import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../context";
import ReplyDocument from "./ReplyDocument";
import ReplyMessage from "./ReplyMessage";

const Feed = () => {
    const { isAccount, signup, authUser } = useAccount();
    const [myrequests, setMyRequests] = useState([]);
    const [requestsToMe, setRequestsToMe] = useState([]);
    const { currentTab, setCurrentTab, tabname, setTabname } =
        useContext(ModalContext);

    const { newRequest, getRequests, getDocumentReplies, getMessageReplies } =
        useRequests();

    const getRequestsToMe = async () => {
        const requests = await getRequests("receiver");
        setRequestsToMe(requests);
    };

    const getMyRequests = async () => {
        const requests = await getRequests("myrequests");

        setMyRequests(requests);
    };

    const refreshRequests = () => {
        getRequestsToMe();
        getMyRequests();
    };

    useEffect(() => {
        if (isAccount) {
            getRequestsToMe();
            getMyRequests();
        }
    }, [isAccount]);

    const onTabChange = (index) => {
        setCurrentTab(index);
        if (index != 4) {
            setTabname("");
        }
    };

    return (
        <>
            {isAccount ? (
                <Box fontFamily="Poppins" mx="auto" px={48} py={8}>
                    <Navbar
                        userDetail={authUser}
                        refreshRequests={refreshRequests}
                    />
                    <Tabs
                        isFitted
                        variant={"enclosed"}
                        mt={5}
                        index={currentTab}
                        onChange={(index) => onTabChange(index)}
                    >
                        <TabList>
                            <Tab>Home</Tab>
                            <Tab>Create New Request</Tab>
                            <Tab>My Requests</Tab>
                            <Tab>Requests To Me</Tab>
                            {tabname === "Reply Document" && (
                                <Tab>{tabname}</Tab>
                            )}
                            {tabname === "Reply Message" && (
                                <Tab>{tabname}</Tab>
                            )}
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Home />
                            </TabPanel>
                            <TabPanel>
                                <CreateRequest
                                    createNewRequest={newRequest}
                                    refreshRequests={refreshRequests}
                                />
                            </TabPanel>
                            <TabPanel>
                                <MyRequests
                                    requests={myrequests}
                                    getDocumentReplies={getDocumentReplies}
                                    getMessageReplies={getMessageReplies}
                                />
                            </TabPanel>
                            <TabPanel>
                                <RequestsToMe
                                    requests={requestsToMe}
                                    getDocumentReplies={getDocumentReplies}
                                    getMessageReplies={getMessageReplies}
                                />
                            </TabPanel>
                            {tabname === "Reply Document" && (
                                <TabPanel>
                                    <ReplyDocument />
                                </TabPanel>
                            )}
                            {tabname === "Reply Message" && (
                                <TabPanel>
                                    <ReplyMessage />
                                </TabPanel>
                            )}
                        </TabPanels>
                    </Tabs>
                </Box>
            ) : (
                <Signup signup={signup} />
            )}
        </>
    );
};

export default Feed;

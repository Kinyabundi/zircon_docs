import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateRequest from "./CreateRequest";
import MyRequests from "./MyRequests";
import RequestsToMe from "./RequestsToMe";
import Signup from "./Signup";
import useAccount from "../hooks/useAccount";
import useRequests from "../hooks/useRequests"

const Feed = () => {
    const { isAccount, signup, authUser } = useAccount();
    const { newRequest } = useRequests()
    return (
        <>
            {isAccount ? (
                <Box fontFamily="Poppins" mx="auto" px={48} py={8}>
                    <Navbar userDetail={authUser} />
                    <Tabs isFitted variant={"enclosed"} mt={5}>
                        <TabList>
                            <Tab>Home</Tab>
                            <Tab>Create New Request</Tab>
                            <Tab>My Requests</Tab>
                            <Tab>Requests To Me</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Home />
                            </TabPanel>
                            <TabPanel>
                                <CreateRequest createNewRequest={newRequest} />
                            </TabPanel>
                            <TabPanel>
                                <MyRequests />
                            </TabPanel>
                            <TabPanel>
                                <RequestsToMe />
                            </TabPanel>
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

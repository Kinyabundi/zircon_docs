import {
    Button,
    Box,
} from '@chakra-ui/react'
import Side from "../components/Sidebar"
import {VscGitPullRequestCreate} from "react-icons/vsc"


const Home = () => {
    return (
        <>
            <Side />
            <Box display="flex" justifyContent={"center"} h={"70vh"} alignItems={"center"}>
                <Button
                    colorScheme={'whatsapp'}
                    color={"gray.900"}
                    size="lg"
                    leftIcon={<VscGitPullRequestCreate />}
                    ml={20}
                >
                    Create New Document Request
                </Button>
            </Box>
        </>
    );
}

export default Home;
import {
    Button,
    Box,
} from '@chakra-ui/react'
import { VscGitPullRequestCreate } from "react-icons/vsc"


const Home = () => {

    return (
        <>
            <Box display="flex" justifyContent={"center"} h={"70vh"} alignItems={"center"}>
                <Button
                    colorScheme={'whatsapp'}
                    color={"gray.900"}
                    size="lg"
                    leftIcon={<VscGitPullRequestCreate />}
                    pl={20}
                >
                    Create New Document Request
                </Button>
            </Box>
        </>
    );
}

export default Home;
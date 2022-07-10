import {
    Flex,
    Box,
    Icon,
    useColorModeValue,
    Text,
    Link,
    Image
} from "@chakra-ui/react"

import { GoHome } from "react-icons/go"
import { VscGitPullRequestCreate } from "react-icons/vsc"
import { TbGitPullRequestDraft } from "react-icons/tb"
import { MdOutlineRequestPage } from "react-icons/md"
import { GiHelicopterTail } from "react-icons/gi"
import { useRouter } from "next/router"


const Side = () => {
    return (
        <Box
            as="nav"
            position="fixed"
            top="10"
            left="24"
            zIndex="sticky"
            h="400px"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            color={useColorModeValue("gray.100", "gray.900")}
            bg="white"
        >
            <Flex
                align="center"
                px="4"
                py="3"
            >
                <Icon
                    w={6}
                    h={6}
                    as={GiHelicopterTail}
                    mr={3}
                    color={"gray.800"}
                />
                <Text fontWeight="semibold" fontSize="lg" color={"teal.500"}>
                    Zircon Docs
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                px="4"
            >
                <NavItem icon={GoHome} text={"Home"} redirectPath={"home"} />
                <NavItem icon={VscGitPullRequestCreate} text={"Create New Medical File Request"} redirectPath={"create_request"} />
                <NavItem icon={TbGitPullRequestDraft} text={"My Requests"} redirectPath={"my_requests"} />
                <NavItem icon={MdOutlineRequestPage} text={"Requests To Me"} redirectPath={"requests_to_me"} />

                <Flex alignItems="center" mt={8} >
                    <Image
                        h={10}
                        fit="cover"
                        rounded="full"
                        src={`https://avatars.dicebear.com/api/adventurer/lance.svg`}
                        alt="Avatar"
                    />
                    <Link
                        mx={2}
                        fontWeight="bold"
                        color="gray.700"
                        _dark={{
                            color: "gray.200",
                        }}
                    >
                        {"Code Jekins Hospital"}
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}

const NavItem = ({ icon, text, redirectPath = "home" }) => {
    const router = useRouter()

    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            onClick={() => router.push(`/${redirectPath}`)}
        >
            <Icon
                mx="2"
                boxSize="4"
                _groupHover={{
                    color: useColorModeValue("gray.600", "gray.300"),
                }}
                as={icon}
            />
            <Text fontSize="md">
                {text}
            </Text>
        </Flex>
    )
}

export default Side
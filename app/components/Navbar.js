import { Flex, Icon, Text, Image } from "@chakra-ui/react";
import { GiHelicopterTail } from "react-icons/gi";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = ({ userDetail }) => {
    return (
        <Flex
            fontFamily="Poppins"
            mx="auto"
            justifyContent="space-between"
            alignItems={"center"}
            w={"100%"}
        >
            <Flex align="center" px="4" py="3">
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
            <Flex align="center" px="4" py="3">
                <WalletMultiButton />
                <Flex alignItems="center" ml={3}>
                    <Image
                        h={10}
                        fit="cover"
                        rounded="full"
                        src={`https://avatars.dicebear.com/api/adventurer/${userDetail.name
                            .toLowerCase()
                            .replaceAll(" ", "")}.svg`}
                        alt="Avatar"
                    />
                    <Text mx={2} fontWeight="bold" color="gray.700">
                        {userDetail.name}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Navbar;

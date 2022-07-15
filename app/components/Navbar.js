import { Flex, Button, Icon, Text } from "@chakra-ui/react";
import { GiHelicopterTail } from "react-icons/gi";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"


const Navbar = () => {
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
            <WalletMultiButton />
            
        </Flex>
    );
};

export default Navbar;

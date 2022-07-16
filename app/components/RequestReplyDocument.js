import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import DownloadFile from "./Download";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

const RequestReplyDocument = ({ replyDetail }) => {
    return (
        <Box mt={5} ml={4}>
            <Flex alignItems="center">
                <Flex alignItems="center">
                    <Image
                        h={6}
                        fit="cover"
                        rounded="full"
                        src={`https://avatars.dicebear.com/api/adventurer/${replyDetail?.replyAuthor
                            ?.toLowerCase()
                            ?.replaceAll(" ", "")}.svg`}
                        alt="Avatar"
                    />
                    <Link
                        mx={2}
                        fontWeight="bold"
                        color="gray.700"
                        _dark={{
                            color: "gray.200",
                        }}
                        fontSize={"sm"}
                    >
                        {replyDetail?.replyAuthor}
                    </Link>
                </Flex>
                <chakra.span
                    mx={1}
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                        color: "gray.300",
                    }}
                >
                    {timeAgo.format(
                        new Date(replyDetail?.replyTime * 1000),
                        "twitter-now"
                    )}
                </chakra.span>
            </Flex>
            <chakra.p
                mt={2}
                fontSize="sm"
                color="gray.600"
                _dark={{
                    color: "gray.400",
                }}
            >
                {replyDetail?.replyDocumentMessageContent}
            </chakra.p>
            <DownloadFile
                hash={replyDetail?.replyDocumentHash}
                filename={replyDetail?.replyDocumentName}
            />
        </Box>
    );
};

export default RequestReplyDocument;

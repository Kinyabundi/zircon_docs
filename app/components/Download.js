import useIPFS from "../hooks/useIPFS";
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";

const DownloadFile = ({ hash, filename }) => {
    const file = useIPFS(hash, filename);


    async function downloadAttachment() {
        try {
            const response = await axios.get(
                `https://ipfs.infura.io/ipfs/${hash}`,
                {
                    responseType: "blob",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            // get type from response
            const type = response.data.type

            // get arraybuffer from blob
            const arrayBf = await response.data.arrayBuffer();

            // get blob from arraybuffer
            const blob = new Blob([arrayBf], { type });

            // get url from blob
            const url = URL.createObjectURL(blob);
            

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            link.click();

            setTimeout(() => URL.revokeObjectURL(url), 3000);
        } catch (err) {}
    }

    return file ? (
        <Button onClick={downloadAttachment}>Download File</Button>
    ) : (
        <Text>No File available</Text>
    );
};

export default DownloadFile;

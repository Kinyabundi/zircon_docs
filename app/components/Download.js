import useIPFS from "../hooks/useIPFS";
import { Button, Text } from "@chakra-ui/react";
import axios from "axios";

const DownloadFile = ({ hash, filename }) => {
    const file = useIPFS(hash, filename);


    // base64 object to Blob


    function base64ToBlob(base64) {
        const pos = base64.indexOf(';base64,');
        const type = base64.substring(5, pos);
        console.log(type)
        const b64 = base64.substring(pos + 8);

        const byteString = atob(b64);
        const byteStringLength = byteString.length;
        const arrayBuffer = new ArrayBuffer(byteStringLength);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteStringLength; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }

        // const blob = new Blob([intArray], { type });
        return type;
    }


    

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
            

            // const url = URL.createObjectURL(response.data);
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

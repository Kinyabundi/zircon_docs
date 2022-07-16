import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance, filterRequests } from "../utils/utils";
const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { BN, web3 } = anchor;
const { SystemProgram } = web3;

const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
};

const useRequests = () => {
    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);

    /**
     * Get requests I created or addressed to Me
     * @param filterType must be either be "myrequests" or "receiver"
     */
    const getRequests = async (filterType) => {
        // fetch all the requests created
        const allRequests = await program.account.requestAccount.all();
        console.log(allRequests);
        const requests = filterRequests(
            allRequests,
            wallet.publicKey,
            filterType
        );

        // console.log(requests)
        return requests;
    };

    const newRequest = async (message, author, addressTo, status) => {
        let [state_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("state")],
            program.programId
        );

        let stateInfo;

        // check if state is created and if not create a new state
        try {
            stateInfo = await program.account.stateAccount.fetch(state_pda);
            console.log(stateInfo);
        } catch {
            await program.rpc.createState({
                accounts: {
                    state: state_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            });
            return;
        }

        stateInfo = await program.account.stateAccount.fetch(state_pda);

        let [request_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("request"),
                stateInfo.requestCount.toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        const addressToPubkey = new PublicKey(addressTo);

        const tx = await program.rpc.createRequest(
            message,
            author,
            addressToPubkey,
            status,
            {
                accounts: {
                    state: state_pda,
                    request: request_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            }
        );

        console.log(tx);
    };

    /**
     * Create a new reply message
     */

    const createNewReplyMessage = async (
        index,
        count,
        message_text,
        author
    ) => {
        console.log(index);
        console.log(count);
        // get the request_pda
        let [request_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("request"),
                new BN(index).toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        // get the reply_message pda
        let [reply_message_pda] =
            await anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode("reply_message"),
                    new BN(index).toArrayLike(Buffer, "be", 8),
                    new BN(count).toArrayLike(Buffer, "be", 8),
                ],
                program.programId
            );

        // now create new reply message transaction
        const tx = await program.rpc.createReplyMessage(message_text, author, {
            accounts: {
                request: request_pda,
                replyMessage: reply_message_pda,
                authority: wallet.publicKey,
                ...defaultAccount,
            },
        });

        // log the transaction
        console.log(tx);
    };

    /***
     * Create a new document reply message
     */

    const createNewReplyDocument = async (
        index,
        count,
        message_text,
        author,
        document_name,
        document_hash
    ) => {
        // get the request_pda
        let [request_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("request"),
                new BN(index).toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        // get the reply_message pda
        let [reply_document_pda] =
            await anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode("reply_document"),
                    new BN(index).toArrayLike(Buffer, "be", 8),
                    new BN(count).toArrayLike(Buffer, "be", 8),
                ],
                program.programId
            );

        // now create new reply message transaction
        const tx = await program.rpc.createReplyDocument(
            message_text,
            author,
            document_name,
            document_hash,
            {
                accounts: {
                    request: request_pda,
                    replyDocument: reply_document_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            }
        );

        // log the transaction
        console.log(tx);
    };

    const getDocumentReplies = async (index, count) => {
        let docsSigners = [];

        for (let i = 0; i < count; i++) {
            let [docSigner] = await anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode("reply_document"),
                    new BN(index).toArrayLike(Buffer, "be", 8),
                    new BN(i).toArrayLike(Buffer, "be", 8),
                ],
                program.programId
            );

            docsSigners.push(docSigner);
        }

        const documents =
            await program.account.replyDocumentAccount.fetchMultiple(
                docsSigners
            );

        // const documents = await program.account.replyDocumentAccount.all()
        console.log(documents.length)

        // sort documents by time
        documents.sort(
            (a, b) => b?.replyTime?.toNumber() - a?.replyTime?.toNumber()
        );

        return documents;
    };

    const getMessageReplies = async (index, count) => {
        console.log(index)
        console.log(count)
        let msgsSigners = [];

        for (let i = 0; i < count; i++) {
            let [msgSigner] = await anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode("reply_message"),
                    new BN(index).toArrayLike(Buffer, "be", 8),
                    new BN(i).toArrayLike(Buffer, "be", 8),
                ],
                program.programId
            );

            msgsSigners.push(msgSigner);
        }

        const messages =
            await program.account.replyMessageAccount.fetchMultiple(
                msgsSigners
            );

        console.log(messages)

        // sort the messages by time
        messages.sort(
            (a, b) => b?.replyTime?.toNumber() - a?.replyTime?.toNumber()
        );

        return messages;
    };

    return {
        getRequests,
        newRequest,
        createNewReplyMessage,
        createNewReplyDocument,
        getDocumentReplies,
        getMessageReplies,
    };
};

export default useRequests;

import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react"
import { SOLANA_HOST } from "../utils/constants"
import { getProgramInstance } from "../utils/utils"
const anchor = require("@project-serum/anchor")
const utf8 = anchor.utils.bytes.utf8;
const { web3 } = anchor;
const { SystemProgram } = web3
import { useState, useEffect } from "react"


// set up the default account options
const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
}

const useAccount = () => {
    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);

    const [authUser, setAuthUser] = useState(null);
    const [isAccount, setIsAccount] = useState(false);

    /**
     * This functions takes 3 params and uses them to create a new user account on solana blockchain.
     * @param {*} name 
     * @param {*} email 
     * @param {*} phoneno 
     */
    const signup = async (name, email, phoneno) => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("user"),
                wallet.publicKey.toBuffer(),
            ],
            program.programId,
        )

        // Now create the user account
        await program.rpc.createUser(name, email, phoneno,{
            accounts: {
                user: user_pda,
                authority: wallet.publicKey,
                ...defaultAccount,
            }
        })
    }

    // check if account is already created on blockchain
    const checkAccount = async () => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("user"),
                wallet.publicKey.toBuffer(),
            ],
            program.programId,
        )

        // confirm is account is already created using try/catch
        try {
            const userInfo = await program.account.userAccount.fetch(user_pda);
            console.log(userInfo);
            setAuthUser(userInfo);
            setIsAccount(true);
        } catch (error) {
            console.log(error);
            setIsAccount(false);
        }
    }

    useEffect(() => {
        if (wallet.connected){
            checkAccount();
        }
    }, [wallet.connected])

    // return the signup fn
    return { signup, authUser, isAccount };
}

export default useAccount;

import * as anchor from "@project-serum/anchor"
import { WalletNotConnectedError } from "@solana/wallet-adapter-base"
import {
    ZIRCON_DOCS_IDL,
    ZIRCON_DOCS_PROGRAM_ID,
} from "./constants"

export function getProgramInstance(connection, wallet){
    // check if wallet is connected if not throw error
    console.log(wallet.publicKey)
    // if(!wallet.publicKey) throw new WalletNotConnectedError();

    // get the provider
    const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions(),
    )

    // set the idl
    const idl = ZIRCON_DOCS_IDL;
    // the address of the deployed program
    const programId = ZIRCON_DOCS_PROGRAM_ID;

    // create a new program instance
    const program = new (anchor).Program(idl, programId, provider);

    return program;
}

export function filterRequests(allRequests, walletAddress, filterType){
    let newArray = allRequests.filter(function(el){
        if (filterType === "myrequests"){
            return el.account.authority.toString() === walletAddress.toString()
        }else if (filterType === "receiver") {
            return el.account.requestAddressTo.toString() === walletAddress.toString()
        }
    })

    // Now sort the array by request time
    newArray.sort(
        (a,b) => b.account.requestTime.toNumber() - a.account.requestTime.toNumber()
    )

    return newArray
}
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


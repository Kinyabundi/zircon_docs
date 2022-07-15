import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import zircon_docs from "./zircon_docs.json";

export const SOLANA_HOST = clusterApiUrl("devnet");

export const ZIRCON_DOCS_PROGRAM_ID = new PublicKey(
    "3osDmv7UbNiNeoz3sPMcWoALeST7usSUVfBK6UphrS5y"
)

export const ZIRCON_DOCS_IDL = zircon_docs;
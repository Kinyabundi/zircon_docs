import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import zircon_docs from "./zircon_docs.json";

export const SOLANA_HOST = clusterApiUrl("devnet");

export const ZIRCON_DOCS_PROGRAM_ID = new PublicKey(
    "2Qk4D7V8qdbUL2PQNgRKT19VCM8jwRLycTw2WeY9r1ed"
)

export const ZIRCON_DOCS_IDL = zircon_docs;
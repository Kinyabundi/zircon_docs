import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ZirconDocs } from "../target/types/zircon_docs";

describe("zircon_docs", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ZirconDocs as Program<ZirconDocs>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});

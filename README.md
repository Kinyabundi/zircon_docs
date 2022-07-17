## Inspiration 💡

Most of the time, people are fatally injured or have a life-threatening condition and they require advanced medical care.
For that they will be transferred to another hospital or medical facility where they will receive life saving treatment or procedure.
As a result, there is the need for a secure and efficient system to share medical documents and information with the medical team.

## ❓ What it does 💡
Zircon is a decentralized and secure medical record sharing system. Its built on the Solana blockchain and securely stores all the medical records requests and responses by use of the solana programs (smart contracts).

The medical records and information are securely stored in the ledger and can be accessed by the medical team administrator.

First, on the app, the medical team administrator of the hospital will connect their solana wallet to the Zircon app.

The wallet maybe either Phantom or Solflare.

If the its the first time the user is connecting their wallet, the user will be prompted to create add additional details about the hospital.

When the administrator of Hospital A requests the medical records of a patient, the system will send the request to Hospital B.

When the administrator of Hospital B logs on the app, he/she will view the request and respond to it either using a message or sending the medical records or even both.

When the administrator of Hospital A logs on the app, he/she will view the request and see the messages and medical records sent by the other hospital.

## ⚙ How it was built
- React, Next JS and Chakra UI for the frontend
- Phantom, Solflare, Solana Web3 for the Blockchain and smart contracts
- Anchor for building the smart contracts in Rust programming language
- IPFS for storing the medical records.
- Solana blockchain for the ledger

## 🚧 Challenges 🚧
- Implementing the smart contracts in Rust programming language was a challenge.
- Ran into bugs while building the smart contracts especially while building the anchor smart contract.


## 🚀 Extended Features 🚀
- Notifications for the medical team administrator to know when the request is made and when the response is received by use email or SMS.
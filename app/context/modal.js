import { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [documentModalOpen, setDocumentModalOpen] = useState(false);
    const [requestIndex, setRequestIndex] = useState(0);
    const [replyCount, setReplyCount] = useState(0);

    const modalState = {
        messageModalOpen,
        documentModalOpen,
        requestIndex,
        replyCount,
        setMessageModalOpen,
        setDocumentModalOpen,
        setRequestIndex,
        setReplyCount,
    };

    return (
        <ModalContext.Provider value={modalState}>
            {children}
        </ModalContext.Provider>
    );
};

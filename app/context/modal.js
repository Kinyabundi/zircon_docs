import { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [documentModalOpen, setDocumentModalOpen] = useState(false);
    const [requestIndex, setRequestIndex] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    const [currentTab, setCurrentTab] = useState(0)
    const [initialTab, setInitialTab] = useState(0)
    const [tabname, setTabname] = useState("");


    const modalState = {
        messageModalOpen,
        documentModalOpen,
        requestIndex,
        replyCount,
        setMessageModalOpen,
        setDocumentModalOpen,
        setRequestIndex,
        setReplyCount,
        setCurrentTab,
        currentTab,
        initialTab,
        setInitialTab,
        tabname,
        setTabname
    };

    return (
        <ModalContext.Provider value={modalState}>
            {children}
        </ModalContext.Provider>
    );
};

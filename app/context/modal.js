import { useState, createContext } from 'react';

export const ModalContext = createContext()

export const ModalContextProvider = ({ children }) => {
    const [messageModalOpen, setMessageModalOpen] = useState(false)
    const [documentModalOpen, setDocumentModalOpen] = useState(false)

    const modalState = {
        messageModalOpen,
        documentModalOpen,
        setMessageModalOpen,
        setDocumentModalOpen
    }

    return (
        <ModalContext.Provider value={modalState}>
            {children}
        </ModalContext.Provider>
    )
}
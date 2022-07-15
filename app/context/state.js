import { cloneElement } from "react"

import { ModalContextProvider, AuthContextProvider } from "."

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight(
        (kids, parent) => cloneElement(parent, { children: kids }),
        children
    )
}

const ContextProvider = ({ children }) => (
    <ProviderComposer
        contexts={[
            // <AuthContextProvider />,
            <ModalContextProvider/>,
        ]}
    >
        {children}
    </ProviderComposer>
)

export default ContextProvider;
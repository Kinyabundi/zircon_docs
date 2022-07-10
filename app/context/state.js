import { cloneElement } from "react"

import { ModalContextProvider } from "./modal"

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight(
        (kids, parent) => cloneElement(parent, { children: kids }),
        children
    )
}

const ContextProvider = ({ children }) => (
    <ProviderComposer
        contexts={[
            <ModalContextProvider/>,
        ]}
    >
        {children}
    </ProviderComposer>
)

export default ContextProvider;
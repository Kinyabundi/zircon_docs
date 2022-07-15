import { createContext, useContext } from 'react';
import useAccount from "../hooks/useAccount";

const AuthContext = createContext({
    authUser: null,
    isAccount: false,
    signup: async () => { },
    checkAccount: async () => { }
});

export function AuthContextProvider({ children }) {
    const { signup, authUser, isAccount, checkAccount } = useAccount();
    return (
        <AuthContext.Provider value={{ signup, authUser, isAccount, checkAccount }}>
            {children}
        </AuthContext.Provider>
    );
}

// create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);
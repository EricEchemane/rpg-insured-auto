import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>({});

export default function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }: any) {
    const [user, setUser] = useState<User>(UserContextInitialValue);

    const setEmail = (email: string) => {
        setUser((prev) => ({ ...prev, email }));
    };

    return (
        <UserContext.Provider value={{
            user, setEmail
        }}>
            {children}
        </UserContext.Provider>
    );
}

/* ======== TYPES ========================================= */

type User = {
    email: string;
};

export type UserContextType = {
    user: User;
    setEmail: (email: string) => void;
};

const UserContextInitialValue: User = {
    email: "not loged in"
};
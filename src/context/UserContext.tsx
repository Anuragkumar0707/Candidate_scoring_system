import { createContext, useState, ReactNode, useContext } from "react";

export interface User {
    name: string;
    email: string;
    dob: string;
    phone: string;
    resume: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const updateUser = (userData: User | null) => {
        setUser(userData);
        if (userData) {
            document.cookie = JSON.stringify(userData);
        } else {
            document.cookie = "";
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

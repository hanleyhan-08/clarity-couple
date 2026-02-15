import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UUIDContextType {
    userUUID: string | null;
    generateUUID: () => string;
}

const UUIDContext = createContext<UUIDContextType | undefined>(undefined);

export const UUIDProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userUUID, setUserUUID] = useState<string | null>(() => {
        // Check localStorage on initial load
        if (typeof window !== 'undefined') {
            return localStorage.getItem('user_uuid');
        }
        return null;
    });

    const generateUUID = () => {
        const uuid = crypto.randomUUID();
        localStorage.setItem('user_uuid', uuid);
        setUserUUID(uuid);
        return uuid;
    };

    useEffect(() => {
        // Ensure UUID exists on mount if we want to force it, 
        // or wait for explicit action.
        // Plan says "Generate on first click of 'Mulai Sekarang'".
        // So we don't auto-generate here unless needed.
        const stored = localStorage.getItem('user_uuid');
        if (stored) {
            setUserUUID(stored);
        }
    }, []);

    return (
        <UUIDContext.Provider value={{ userUUID, generateUUID }}>
            {children}
        </UUIDContext.Provider>
    );
};

export const useUUID = () => {
    const context = useContext(UUIDContext);
    if (context === undefined) {
        throw new Error('useUUID must be used within a UUIDProvider');
    }
    return context;
};

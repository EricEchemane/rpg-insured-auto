import React, { createContext, useState } from 'react';

const UserContext = createContext<any>(null);

export function useUserContext() {
    const [user, setUser] = useState<any>('hello context');
    return { user, setUser };
}

export default UserContext;
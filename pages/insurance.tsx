import UserContext from 'contexts/userContext';
import Head from 'next/head';
import React, { useContext } from 'react';

export default function Insurance() {
    const { user, setUser } = useContext(UserContext);

    return <>
        <Head> <title> RPG Insurance </title> </Head>
    </>;
}

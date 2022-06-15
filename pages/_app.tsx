import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import UserContext, { useUserContext } from 'contexts/userContext';

function MyApp({ Component, pageProps }: AppProps) {
  const userContext = useUserContext();

  return <>
    <MantineProvider
      theme={{
        primaryColor: 'orange'
      }}
    >
      <UserContext.Provider value={userContext}>
        <div className="landing">
          <Component {...pageProps} />
        </div>
      </UserContext.Provider>
    </MantineProvider>
  </>;

}

export default MyApp;

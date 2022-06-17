import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { UserContextProvider } from 'contexts/userContext';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <MantineProvider
      theme={{
        primaryColor: 'orange'
      }}
    >
      <UserContextProvider>
        <div className="landing">
          <Component {...pageProps} />
        </div>
      </UserContextProvider>
    </MantineProvider>
  </>;

}

export default MyApp;

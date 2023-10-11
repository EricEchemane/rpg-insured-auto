import '../styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from 'contexts/userContext';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <MantineProvider
        theme={{
          primaryColor: 'orange',
        }}
      >
        <UserContextProvider>
          <div className='landing'>
            <Notifications />
            <Component {...pageProps} />
          </div>
        </UserContextProvider>
      </MantineProvider>
    </div>
  );
}

export default MyApp;

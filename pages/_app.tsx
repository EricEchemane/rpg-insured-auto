import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { UserContextProvider } from 'contexts/userContext';
import { NotificationsProvider } from '@mantine/notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <MantineProvider
      theme={{
        primaryColor: 'orange'
      }}
    >
      <UserContextProvider>
        <NotificationsProvider>
          <div className="landing">
            <Component {...pageProps} />
          </div>
        </NotificationsProvider>
      </UserContextProvider>
    </MantineProvider>
  </>;

}

export default MyApp;

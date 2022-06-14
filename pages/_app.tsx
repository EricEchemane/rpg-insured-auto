import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <MantineProvider
      theme={{
        primaryColor: 'orange'
      }}
    >
      <div className="landing">
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  </>;

}

export default MyApp;

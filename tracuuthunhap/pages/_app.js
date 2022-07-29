import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css'
import 'antd/dist/antd.css';
import { theme } from '@chakra-ui/react';
import LayoutApp from '../components/Layout';


function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
  <ChakraProvider theme={theme}>
    <LayoutApp>
      <Component {...pageProps} />
    </LayoutApp>
  </ChakraProvider>
  )
}

export default MyApp

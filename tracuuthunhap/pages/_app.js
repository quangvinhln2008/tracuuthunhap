import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';
import '../styles/globals.css'
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LayoutApp from '../components/Layout';


function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
  <ChakraProvider theme={theme}>
    <LayoutApp>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} theme="colored" />
    </LayoutApp>
  </ChakraProvider>
  )
}

export default MyApp

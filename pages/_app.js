import { ChakraProvider } from '@chakra-ui/react'
import React,{useState} from 'react';
import '../styles/globals.css'
import theme from '../lib/theme';
import { useRouter } from 'next/router';
import AdminSidebar from '../components/admin/AdminSidebar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // If /admin then admin sidebar otherwise normal ui sidebar
  //admin sidebar will check if its admin or not at every route in its children
  const admin = router.route.includes('/admin'); 
  return (
  <>
    <ChakraProvider theme={theme} >

  {
    admin ? 
    <AdminSidebar>
      <Component {...pageProps} />
    </AdminSidebar>
    : <Component {...pageProps} />
  }
  </ChakraProvider>
  </>
  )
}

export default MyApp

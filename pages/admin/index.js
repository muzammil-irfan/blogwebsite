import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import AdminDashboard from '../../components/admin';

export default function Admin() {
  const [admin, setadmin] = useState(true)
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('userToken');
    if(token === undefined) {
      setadmin(false);
      router.push('/login');
    } else {
      axios.post('/api/auth/verify',{
        token
      })
      .then((response)=>{
        console.log(response);
        setadmin(true)
        
      })
      .catch((err)=>{
        console.log(err);
        router.push('/login');
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  return (
    <>
    {
      admin && <AdminDashboard />
    }
    </>
  )
}

import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

export default function Admin() {
  const router = useRouter();
  const [admin, setadmin] = useState(false)
  const toast = useToast();
  useEffect(() => {
    const token = Cookies.get('userToken');
    // console.log(token)
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

      })
    }
    
  }, []); 
  
  return (
    <>
    {
      admin && <div>Admin</div>
    }
    </>
  )
}

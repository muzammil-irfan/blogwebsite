import React,{useState} from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast
} from '@chakra-ui/react';
import axios from 'axios'
import { useFormik } from "formik";
import Loader from '../components/Loader';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Login() {
  const [loading, setloading] = useState(null)
  const toast = useToast();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email:'',
      password:''
    },
    onSubmit: (values)=>{
      handleSubmit(values);
    }
  });
  const handleSubmit = (values)=>{
    axios.post('/api/auth/login',{
      email:values.email,
      password:values.password
    })
    .then((response)=>{
      setloading(100);
      toast({
        title:'Login Successfuly',
        status:'success',
        duration:3000
      })
      Cookies.set('userToken',response.data.token);
      router.push('/admin')
      
    })
    .catch((error)=>{
      setloading(100);
      console.log(error)
      toast({
        title:error.message,
        status:'error',
        duration:3000
      })
    })

  }
  const handleSubmitClick = ()=>{
    setloading(0);
    formik.handleSubmit();
  }
  const values = formik.values;
  const change = formik.handleChange;
  return (
    <>
    
    <Loader progress={loading} />
    <Flex
      minH={'100vh'}
      // maxW={'4xl'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}>
      <Stack mx={'auto'} w={'xl'} py={6} px={6}>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'lg'}
          p={8} 
         
          >
          <Stack spacing={8}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login</Heading>
        </Stack>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' value={values.email} onChange={change} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password' value={values.password} onChange={change} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                mx={4}
                // type='submit'
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={()=>{handleSubmitClick()}}
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}

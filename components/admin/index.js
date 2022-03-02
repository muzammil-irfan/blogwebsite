import React,{useState,useEffect} from 'react'
import { Flex,Stack,Button, Heading } from '@chakra-ui/react' 
import { useRouter } from 'next/router'
import AdminSidebar from './AdminSidebar'
import AllPost from './AllPost';
import dynamic from 'next/dynamic';
export default function AdminDashboard() {
  const NewPost = dynamic(import('./NewPost'),{
    ssr:false,
    loading:()=>(<p>Loading...</p>)
  })
  const router = useRouter();
  const {asPath,pathname} = router;
  const hashPath = asPath.slice(pathname.length) || '#allpost';
  return (
    <>
    <Flex >
      <AdminSidebar >
        {
          hashPath === '#newpost' && <NewPost /> 
        }
        {
          hashPath === '#allpost' && <AllPost />
        }
      </AdminSidebar>
    </Flex>
    </>
  )
}

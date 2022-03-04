import React, { useState, useEffect } from "react";
import Loader from "../../Loader";
import axios from "axios";
import {
  HStack,
  Heading,
  Text,
  Box,
  Flex,
  Button,
  useDisclosure,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";
import { FiEdit, FiFilePlus } from "react-icons/fi";
import DeletePost from "./DeletePost";
import { errorToast, successToast } from "../../../lib/toast";
import { useRouter } from 'next/router';
import { AiOutlineDelete } from 'react-icons/ai'
import FullScreenLoader from "../../common/FullScreenLoader";

const AllPost = () => {
  const router = useRouter();
    const toast = useToast();
    const { isOpen,onOpen,onClose } = useDisclosure()
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [postId, setpostId] = useState(null);
  const pathname = router.asPath.includes('/publish');

  useEffect(() => {
    setloading(true);
    axios
      .get("/api/post")
      .then((res) => {
        setloading(false);
        //If true then publish otherwise draft
        if(pathname){
          const publishPost = res.data.filter(item=> !item.draft)
          if(publishPost.length > 0){
            setdata(publishPost);
          }
        }else {
          const draftPost = res.data.filter(item=>item.draft);
          if(draftPost.length > 0){
            setdata(draftPost)
          }
        }
        
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);
  const handleClick = (type,id) =>{
      if(type === 'edit'){
          router.push(`/admin/edit/${id}`)
    } else {
        onOpen();
        setpostId(id);
    }
  }
  const handleConfirmClick = ()=>{
      setloading(0);
        axios.delete(`/api/post/${postId}`)
        .then(res=>{
          setloading(100);  
          onClose();
            
            successToast('Deleted Successfuly',toast);
            const newPost = data.filter(post=>post._id !== postId);
            setdata(newPost);

        })
        .catch(err=>{
            setloading(100);
            console.log(err)
            onClose()
            errorToast(err.message,toast);
        })
  }
  return (
    <>
      {
        typeof loading !== Boolean &&
      <Loader progress={loading} />
      }
      {
        loading === true ?
        <FullScreenLoader /> :
        <>
        
      <DeletePost isOpen={isOpen} onClick={handleConfirmClick} onClose={onClose} />
      <Flex p={2} direction='column' w='full'>
        <HStack justify={'space-between'} mb={6}>
        <Heading size='lg'>
        {/* If true then publish otherwise draft */}
          {pathname ? 'Publish Post' : "Draft Post"}
        </Heading>
        <Button variant={'outline'} size='sm' colorScheme={'blue'} gap={1} onClick={()=>router.push('/admin/createpost')}>
          <FiFilePlus />
          Create Post
        </Button>
        </HStack>
        <SimpleGrid spacing={4} columns={{lg:2}} >
          {data.map((item) => {
            return (
              <>
                <Box
                  bg="white"
                  boxShadow={"lg"}
                  border="1px solid gray"
                  borderRadius={10}
                  p={2}
                  key={item.slug}
                >
                  <Text mb={2} fontWeight='semibold' fontSize={{ base: "xs", md: "md" }}>
                     
                    {item.title}
                  </Text>
                  <HStack>
                    <Text w="full" fontSize={{ base: "xs", md: "md" }}>
                      {item.createdAt.slice(0, 10)}
                    </Text>
                    <HStack>
                      <Button variant='outline'size="xs" gap={1} colorScheme={"green"} onClick={()=>handleClick('edit',item._id)}>
                        <FiEdit />
                        Edit
                      </Button>
                      <Button variant='outline'size="xs" gap={1} colorScheme={"red"} onClick={()=>handleClick('delete',item._id)}>
                        <AiOutlineDelete />  
                        Delete
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              </>
            );
          })}
        </SimpleGrid>
      </Flex>
        </>
      }
    </>
  );
};
export default AllPost;

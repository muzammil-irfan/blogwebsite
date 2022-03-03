import React, { useState, useEffect } from "react";
import Loader from "../../Loader";
import axios from "axios";
import {
  Stack,
  HStack,
  Heading,
  Text,
  Box,
  Flex,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { FiEdit, FiDelete } from "react-icons/fi";
import DeletePost from "./DeletePost";
import Cookies from 'js-cookie';

const AllPost = () => {
    const toast = useToast();
    const { isOpen,onOpen,onClose } = useDisclosure()
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(null);
  const [postId, setpostId] = useState(null);


  useEffect(() => {
    setloading(0);
    axios
      .get("/api/post")
      .then((res) => {
        setloading(100);
        setdata(res.data);
        
      })
      .catch((err) => {
        setloading(100);
        console.log(err);
      });
  }, []);
  const handleClick = (type,id) =>{
      if(type === 'edit'){
          
    } else {
        onOpen();
        setpostId(id);
    }
  }
  const handleConfirmClick = ()=>{
    const token = Cookies.get('userToken');
        axios.post('/api/post/delete',{id:postId,token})
        .then(res=>{
            console.log(res)
            onClose()
            toast({
                title:res.data,
                status:'success',
                duration: 3000
            })
            const newPost = data.filter(post=>post._id !== postId);
            setdata(newPost);
        })
        .catch(err=>{
            console.log(err)
            onClose()
            toast({
                title:err.message,
                status:'error',
                duration:3000
            })
        })
  }
  return (
    <>
      <Loader progress={loading} />
      <DeletePost isOpen={isOpen} onClick={handleConfirmClick} onClose={onClose} />
      <Flex p={2} direction='column' >
        <Heading textAlign={'center'} mb={2}>
          All Posts
        </Heading>
        <Stack spacing={4} w="full">
          {data.map((item,index) => {
            return (
              <>
                <Box
                  bg="white"
                  boxShadow={"lg"}
                  border="1px solid gray"
                  borderRadius={10}
                  p={2}
                  key={index}
                >
                  <Text mb={2} fontWeight='semibold' fontSize={{ base: "xs", md: "md" }}>
                     
                    {item.title}
                  </Text>
                  <HStack>
                    <Text w="full" fontSize={{ base: "xs", md: "md" }}>
                      {item.createdAt.slice(0, 10)}
                    </Text>
                    <HStack>
                      <Button size="xs" gap={1} colorScheme={"green"} onClick={()=>handleClick('edit',item._id)}>
                        <FiEdit />
                        Edit
                      </Button>
                      <Button size="xs" gap={1} colorScheme={"red"} onClick={()=>handleClick('delete',item._id)}>
                        <FiDelete />  
                        Delete
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              </>
            );
          })}
        </Stack>
      </Flex>
    </>
  );
};
export default AllPost;

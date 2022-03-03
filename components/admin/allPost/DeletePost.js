import React,{ useState} from 'react'
import {Modal,ModalOverlay,ModalContent,ModalBody,ModalCloseButton,ModalFooter,ModalHeader,Button, Heading, Input,useDisclosure,Text, useToast} from '@chakra-ui/react';

export default function DeletePost(props) {
    const [value, setvalue] = useState('');
  return (
    <>
    <Modal onClose={props.onClose} size={'md'} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Heading size='md'>Do you really want to delete this post?</Heading>
            <Text my={2}>Type DELETE to delete this post</Text>
            <Input placeholder='Type DELETE to confirm' value={value} onChange={e=>setvalue(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button mx={2} disabled={value === 'DELETE' ? false : true} onClick={()=>{props.onClick(); setvalue('')}} colorScheme='red'>Comfirm</Button>
            <Button colorScheme={'blue'} onClick={props.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

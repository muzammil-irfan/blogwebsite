import React from 'react'
import {Spinner,Flex } from '@chakra-ui/react'

export default function FullScreenLoader() {
  return (
    <>
    <Flex justifyContent='center' alignItems='center' height="90vh">
    <Spinner
  thickness='5px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
    </Flex>
    </>
  )
}

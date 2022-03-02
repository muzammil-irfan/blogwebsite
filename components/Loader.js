import { Flex } from '@chakra-ui/react'
import React from 'react'
import LoadingBar from 'react-top-loading-bar'
// import { BarLoader } from 'react-spinners'

export default function Loader(props    ) {
  return (
    <>
    {/* <BarLoader /> */}
    <LoadingBar progress={props.progress} />
    </>
  )
}

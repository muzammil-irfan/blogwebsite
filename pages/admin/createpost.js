import React from 'react'
import dynamic from 'next/dynamic'
import FullScreenLoader from '../../components/common/FullScreenLoader'
export default function Post() {
  const NewPost = dynamic(import('../../components/admin/newPost'),{
    ssr:false,
    loading:()=>(<FullScreenLoader />)
  })
  return (
    <>
    <NewPost />
    </>
  )
}

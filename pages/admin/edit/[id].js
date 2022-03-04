import React from "react";
import dynamic from "next/dynamic";
import FullScreenLoader from "../../../components/common/FullScreenLoader";

export default function EditPage() {
  const EditPost = dynamic(import('../../../components/admin/editPost'),{
    ssr:false,
    loading:()=>(<FullScreenLoader />)
  })
  return (
    <>
        <EditPost  />
    </>
  );
}

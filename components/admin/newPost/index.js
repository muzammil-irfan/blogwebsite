import React, { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { Heading,Flex, useToast } from "@chakra-ui/react";
import PostForm from "../PostForm";
import { successToast,errorToast } from "../../../lib/toast";
import { useRouter } from 'next/router';

export default function Post() {
    const router = useRouter();
  const initialValues = {
    title: "",
    description: "",
    coverImageUrl: "",
    coverImageAlt: "",
    slug: "",
    content: EditorState.createEmpty(),
    draft: false,
  }; //I have add it separately to clear it later after submission
  const [values, setvalues] = useState(initialValues);
  const [loading, setloading] = useState(null);
  const toast = useToast();
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(0);
    const htmlContent = draftToHtml(
      convertToRaw(values.content.getCurrentContent())
    );
    axios
      .post("/api/post/create", {
        title: values.title,
        slug: values.slug,
        description: values.description,
        coverImageUrl: values.coverImageUrl,
        coverImageAlt: values.coverImageAlt,
        content: htmlContent,
        draft: values.draft,
      })
      .then((response) => {
        setloading(100);
        if (response.data.error !== undefined) {
        // Show error when slug is already exist
        errorToast(response.data.error,toast)
        } else {
        successToast('Posted Successfully',toast)
          setvalues(initialValues);
        }
        router.push('/admin/publish');
      })
      .catch((error) => {
        setloading(100);
        errorToast('error',toast)
      });
  };
  return (
    <>
    <Flex direction='column' >
        <Heading size='xl'>Create Post</Heading>
      <PostForm
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
        values={values}
        handleDraftClick={() => setvalues({ ...values, draft: !values.draft })}
        onEditorStateChange={(newState) => {
          setvalues({ ...values, content: newState });
        }}
      />
    </Flex>
    </>
  );
}

import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputLeftAddon,
  InputGroup,
  HStack,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import Loader from "../Loader";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";

export default function NewPost() {
  const initialValues = {
    title: "",
    description: "",
    coverImageUrl: "",
    coverImageAlt: "",
    slug: "",
    content: EditorState.createEmpty(),
    draft: false,
  };//I have add it separately to clear it later after submission
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
        if(response.data.error !== undefined){
          toast({
            title: response.data.error,
            status: "error",
            duration: 3000,
          });
        }else{
          toast({
            title: 'Posted Successfuly',
            status: "success",
            duration: 3000,
          });
          setvalues(initialValues);
        }
      })
      .catch((error) => {
        setloading(100);
        console.log(error);
        toast({
          title: error,
          status: "error",
          duration: 3000,
        });
      });

  };
  return (
    <>
      <Stack>
        <Loader progress={loading} />
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Title:</FormLabel>
            <Input
              placeholder="Title of the post"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Slug:</FormLabel>
            <Input
              name="slug"
              placeholder="www.example.com/Slug (without slash)"
              value={values.slug}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description:</FormLabel>
            <Textarea
              name="description"
              placeholder="Meta description for seo and google search"
              value={values.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>CoverImage:</FormLabel>
            <HStack spacing={2}>
              <InputGroup w="50%">
                <InputLeftAddon  >
                URL
                </InputLeftAddon>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="coverImageUrl"
                  value={values.coverImageUrl}
                  placeholder="https://example.com/imageaddress"
                />
              </InputGroup>
              <InputGroup w="50%">
                <InputLeftAddon >Alt</InputLeftAddon>
                <Input
                  type="text"
                  name="coverImageAlt"
                  onChange={handleChange}
                  value={values.coverImageAlt}
                  placeholder="Image Alt Text"
                />
              </InputGroup>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Content:</FormLabel>
            {/* <RichTextEditor
            name="content"
            onChange={(e)=> contentData = e}
            defaultValue={values.content}
          /> */}
            <Box bgColor="white" p={2} border="1px">
              <Editor
              placeholder='Type Your content here...'
                editorState={values.content}
                onEditorStateChange={(newState) => {  
                  setvalues({ ...values, content: newState });
                }}
              />
            </Box>
          </FormControl>
          {/* <Stack>
        <HStack justifyContent={'space-between'}>
          <Text>Content:</Text>
           <Button onClick={()=>setdebug(!debug)}>Debug</Button>
        </HStack>
         {
           debug &&
           <EditableContent onChange={handleEditableChange} value={values.content} />
          } 
         { 
          !debug &&
          <RichTextEditor name='content' onChange={handleEditableChange} value={values.content} />
        } 
        </Stack> */}
          <HStack justifyContent={"flex-end"} my={4}>
            <Button
              type="submit"
              onClick={() => setvalues({ ...values, draft: !values.draft })}
            >
              Save as Draft
            </Button>
            <Button type="submit" id="publish">
              Publish
            </Button>
          </HStack>
        </form>
      </Stack>
    </>
  );
}

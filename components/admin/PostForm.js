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
} from "@chakra-ui/react";
import Loader from "../Loader";
import { Editor } from "react-draft-wysiwyg";

export default function PostForm(props) {
  return (
    <>
      <Stack>
        <Loader progress={props.loading} />
        <form onSubmit={props.onSubmit}>
          <FormControl isRequired my={6}>
            <FormLabel>Title:</FormLabel>
            <Input
              placeholder="Title of the post"
              name="title"
              value={props.values.title}
              onChange={props.onChange}
            />
          </FormControl>
          <FormControl isRequired my={6}>
            <FormLabel>Slug:</FormLabel>
            <Input
              name="slug"
              placeholder="www.example.com/Slug (without slash)"
              value={props.values.slug}
              onChange={props.onChange}
            />
          </FormControl>
          <FormControl isRequired my={6}>
            <FormLabel>Description:</FormLabel>
            <Textarea
              name="description"
              placeholder="Meta description for seo and google search"
              value={props.values.description}
              onChange={props.onChange}
            />
          </FormControl>
          <FormControl isRequired my={6}>
            <FormLabel>CoverImage:</FormLabel>
            <HStack spacing={2}>
              <InputGroup w="50%">
                <InputLeftAddon>URL</InputLeftAddon>
                <Input
                  type="text"
                  onChange={props.onChange}
                  name="coverImageUrl"
                  value={props.values.coverImageUrl}
                  placeholder="https://example.com/imageaddress"
                />
              </InputGroup>
              <InputGroup w="50%">
                <InputLeftAddon>Alt</InputLeftAddon>
                <Input
                  type="text"
                  name="coverImageAlt"
                  onChange={props.onChange}
                  value={props.values.coverImageAlt}
                  placeholder="Image Alt Text"
                />
              </InputGroup>
            </HStack>
          </FormControl>
          <FormControl isRequired my={6}>
            <FormLabel>Content:</FormLabel>
            {/* <RichTextEditor
            name="content"
            onChange={(e)=> contentData = e}
            defaultValue={props.values.content}
          /> */}
            <Box bgColor="white" p={2} border="1px">
              <Editor
                placeholder="Type Your content here..."
                editorState={props.values.content}
                onEditorStateChange={props.onEditorStateChange}
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
           <EditableContent onChange={handleEditableChange} value={props.values.content} />
          } 
         { 
          !debug &&
          <RichTextEditor name='content' onChange={handleEditableChange} value={props.values.content} />
        } 
        </Stack> */}
          <HStack justifyContent={"flex-end"} my={4}>
            <Button type="submit" onClick={props.handleDraftClick}>
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

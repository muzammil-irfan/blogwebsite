import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,ContentState, convertToRaw } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html'
import dynamic from 'next/dynamic';

export default function TextEditor(props) {
//      const Editor = dynamic(import('react-draft-wysiwyg').then((module)=>module.Editor),{
//     ssr:false,
//     loading:()=><p>Loading...</p>
//   })
const [editorState,seteditorState] = useState(EditorState.createEmpty())
  return (
    <>
    <Editor 
    // {...props}
        // editorState={props.value}
        // onEditorStateChange={props.onChange}
            // seteditorState(newState);
            // props.setContent(draftToHtml(convertToRaw(newState.getCurrentContent())))
        // }}
        editorState={props.editorState} onEditorStateChange={newState=>{
            props.seteditorState(newState);
            // console.log(newState)
            // props.onChange(draftToHtml(convertToRaw(newState.getCurrentContent())))
          }} 
        toolbarClassName={{
            display:'flex',
            // position:'sticky',
            top:0,
            'z-index':50,
            justifyContent:'center',
            marginRight:'auto',
            marginLeft:'auto',
        }}
        // editorClassName={{
        //     marginTop:''
        // }}
    />
    </>
  )
}

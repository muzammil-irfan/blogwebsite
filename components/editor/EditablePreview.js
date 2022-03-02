// import { Editable, EditableInput, EditablePreview,useEditableControls,Flex,IconButton,ButtonGroup } from '@chakra-ui/react'
// import { FiEdit,FiCheckSquare } from 'react-icons/fi';
// import { AiOutlineCloseSquare } from 'react-icons/ai';
// import React,{Component} from 'react';
// import React, { Component } from 'react'

// export default class EditableConstant extends Component {
//   render() {
//     return (
//       <div>EditablePreview</div>
//     )
//   }
// }

// class EditableContent extends Component {
    
// }
// (props) {
//     /* Here's a custom control */
//     function EditableControls() {
//       const {
//         isEditing,
//         getSubmitButtonProps,
//         getCancelButtonProps,
//         getEditButtonProps,
//       } = useEditableControls()
  
//       return isEditing ? (
//         <ButtonGroup justifyContent='center' size='sm'>
//           <IconButton icon={<FiCheckSquare />} {...getSubmitButtonProps()} />
//           <IconButton icon={<AiOutlineCloseSquare />} {...getCancelButtonProps()} />
//         </ButtonGroup>
//       ) : (
//         <Flex justifyContent='center'>
//           <IconButton size='sm' icon={<FiEdit />} {...getEditButtonProps()} />
//         </Flex>
//       )
//     }
  
//     return (
//       <Editable
//         defaultValue={props.value}
//         fontSize='2xl'
//         value={props.value}
//         onChange={props.onChange}
//       >
//         <EditablePreview  />
//         <EditableInput  />
//         <EditableControls />
//       </Editable>
//     )
//   }

//   export default EditableContent;
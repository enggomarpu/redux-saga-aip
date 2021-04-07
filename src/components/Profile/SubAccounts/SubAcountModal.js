import React, {useState} from 'react';
import { Modal, Button, Form,} from 'react-bootstrap';
import HttpService from '../../../shared/http.service';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../sharedError/error.messages";

const SubAccountModal = (props) => {
//export function SubAccountModal(props) {

    const [userRoleId, setUserRoleId] = useState(1);
    const [userEmail, setUserEmail] = useState();

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const { register, handleSubmit, errors, formState, reset, setValue } = useForm();

   const modalLoaded = () => {
        
        const userId = props.userroleid + '';
        setUserRoleId(userId);

        if(props.modalType !== 1){
          setValue('Name', props.subname);
          setValue('LastName', props.sublastname);
          setValue('UserRoleId', `${props.userroleid}`);
          setValue('Email', props.subemail);
          //setUserEmail(props.subemail);
        }
    };

    
  const createSubAccount = (data) => {
    HttpService.post('user/create-sub-account', data).then((response) => {
      if(response !== undefined){
    props.onHide();
      }
    }).catch(()=>{

    })
  }

  const onSubmit = (formData) => {
    console.log('on submit data', formData);
    props.modalType === 1 && createSubAccount(formData);
    props.modalType === 2 && saveSubAccount(formData); 
  }

  const saveSubAccount = (formdata) => {

    const subAccountDetails = {
      Email: props.subEmail
    }
    console.log('formdataffffffffffff', formdata)

    HttpService.put('user/profile', formdata).then((response) => {
      if(response !== undefined){
    props.onHide();

      }
    }).catch(()=>{

    })
  }
  const deleteSubAccount = () => {
    HttpService.delete(`user/delete-account/${props.userAffId}`).then((response) => {
      if(response !== undefined){
    props.onHide();

      }
    }).catch(()=>{
      console.log('record deleted successfully');
    })
  }

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onEntered={modalLoaded}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">

            {props.modalType === 1 ? 'Create': props.modalType === 2  || props.modalType === 3 ? 'Update' : 'Delate'} Sub Account
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
            <Form.Group controlId="formBasicName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="Name" placeholder="First Name" ref={register({ required: true })} />
                <ErrorMessage type={errors.Name && errors.Name.type} />
            </Form.Group>

            <Form.Group controlId="formBasicName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name = "LastName" placeholder="Last Name" ref={register({ required: true })}/>
                <ErrorMessage type={errors.LastName && errors.LastName.type} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name = "Email" placeholder="Enter email" ref={register({ required: true, pattern: emailRegex })}/>
                <ErrorMessage type={errors.Email && errors.Email.type} patternType={"email"}/>
            </Form.Group>
            
          
            {/* <Form.Check type="radio" id={`check-api`} ref={register}  name="UserRoleId" value={2} >
                <Form.Check.Input type="radio" 
                 name="UserRoleId" value={2}  checked = {userRoleId === "2" } />
                <Form.Check.Label>Admin <small>Has Full Access to portal and team members</small></Form.Check.Label>
            </Form.Check>

            <Form.Check type="radio" id={`check-apig`} ref={register}  name="UserRoleId" value={3} >
                <Form.Check.Input type="radio" 
                 checked= { userRoleId === "3"} />
                <Form.Check.Label>User <small>Has Full Access to portal </small></Form.Check.Label>
            </Form.Check>  */}

             <Form.Check type="radio" id={`check-api`}>
                <Form.Check.Input type="radio" 
                 ref={register} value={2} name="UserRoleId"  />
                <Form.Check.Label>Admin <small>Has Full Access to portal and team members</small></Form.Check.Label>
            </Form.Check>

            <Form.Check type="radio" id={`check-apig`}>
                <Form.Check.Input type="radio" name="UserRoleId"
                 ref={register} value={3}  />
                <Form.Check.Label>User <small>Has Full Access to portal and team members</small></Form.Check.Label>
            </Form.Check> 

       
            </Modal.Body>
            <Modal.Footer>
          {props.modalType === 1 && <Button type="submit">Create</Button> }
          {(props.modalType === 2 || props.modalType === 3) && 
          <><Button type="submit">Save Changes</Button>
          <Button onClick={deleteSubAccount}>Delete Account</Button></>
          }
          {props.modalType === 4 && <Button onClick={deleteSubAccount}>Delete</Button> }
        </Modal.Footer> 
        
        
        </Form>
        
      </Modal>
    );
  }
  export default SubAccountModal;
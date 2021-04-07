import React, {useState} from 'react';
import { Modal, Button, Form,} from 'react-bootstrap';
import HttpService from '../../../shared/http.service';
import { useToasts } from "react-toast-notifications";

const BioModel =  (props) => {

    const [userBio, setUserBio] = useState();
     const { addToast } = useToasts();

   const modalLoaded = () => {
        setUserBio(props.bioValue);
    };

  const handleBio = (e) => {
    const {value} = e.target;
    setUserBio(value);
  }
  const saveBio = async () => {

    const userLocal = JSON.parse(localStorage.getItem('user-info'));
    const userBioObject = {
      Email: userLocal.username,
      Bio: userBio
    }
    await HttpService.put(`user/profile`, userBioObject).then((response) => {
      if(response !== undefined){
         props.onHide();
      }
      addToast("Bio Updated Successfully", {
        appearance: "success",
      });
    }).catch(()=>{
    })
    //window.location.reload();
   }
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        onEntered={modalLoaded}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Bio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group controlId="dob">
              <Form.Control as="textarea" name="bio" placeholder="Enter Bio" onChange={handleBio} 
                value = {userBio}/>
              </Form.Group>         
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveBio}>Save Changes</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default BioModel;
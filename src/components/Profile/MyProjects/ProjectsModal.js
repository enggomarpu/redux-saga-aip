import React, { useState } from 'react';
import { format } from 'date-fns';
import { Modal, Button, Form, } from 'react-bootstrap';
import HttpService from '../../../shared/http.service';
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from './../../sharedError/error.messages';


const ProjectsModal = (props) => {
  const { addToast } = useToasts();
  const [projectId, setProjectId] = useState(1);
  const [affliateParnters, setAffliateParnters] = useState();
  const APIURL = 'affiliate-projects';

  const { register, handleSubmit, errors, formState, reset, setValue } = useForm();
  

  const modalLoaded = () => {
    
    getAffliatePartners();
    if(props.modalType !== 1){
      setProjectId(props.idofproject);
      get(props.idofproject);
    }

  };

  const get = async (projId) => {
    await HttpService.get(`affiliate-projects/${projId}`).then(async(res) => {
      if (res && res.data) {
        console.log('data in model for projects', res.data)
        setValue('ClientName', res.data.ClientName);
        setValue('StartDate', format(new Date(res.data.StartDate), 'yyyy-MM-dd'));
        setValue('EndDate', format(new Date(res.data.EndDate), 'yyyy-MM-dd'));
        setValue('Description', res.data.Description);
        setValue('ProjectStatus', res.data.ProjectStatus);
        //setValue('PartneredAffiliateUserId', res.data.PartneredAffiliateUserId);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  const getAffliatePartners = async () => {
    await HttpService.get('affiliate-team/all').then((response)=>{
      if(response && response.data){
        setAffliateParnters(response.data)
      }
    }).catch((err)=>{
      console.log(err);
    })
  }


  const createProject = async (modalObj) => {
    await HttpService.post(APIURL, modalObj).then((response) => {
      if (response !== undefined) {
        props.onHide()
      }
      addToast("Project Created Successfully", {
        appearance: "success",
      });
    }).catch(() => {

    })
  }

  const saveProject = (projecObj) => {    
    HttpService.put(`${APIURL}/${projectId}`, projecObj).then((response) => {
      if (response !== undefined) {
          props.onHide();
      }
      addToast("Project Updated Successfully", {
        appearance: "success",
      });
    }).catch(() => {
    })
  }
  
  const deleteConfirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject().then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "project Deleted Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        });
      }
    });
  };



  const deleteProject = async () => {
   return await HttpService.delete(`${APIURL}/${projectId}`).then((response) => {
      if (response !== undefined) {
        props.onHide();
      }
    }).catch(() => {
    })
  }

  const onSubmit = (formData) => {
    console.log('on submit data', formData);
    props.modalType === 1 && createProject(formData);
    props.modalType === 2 && saveProject(formData); 
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      onEntered={modalLoaded}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Projects
          {/* {props.modalType === 1 ? 'Create': props.modalType === 2  ? 'Update' : 'Delate'} Team Account */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Client Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="ClientName"
              ref={register({ required: true })}
            />
            <ErrorMessage type={errors.ClientName && errors.ClientName.type} />
          </Form.Group>

          
          
           <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Affliate Partner</Form.Label>
            <Form.Control
              as="select"
              custom
              className="form-select"
              name="PartneredAffiliateUserId"
              ref={register({ required: true })}
            >
               <option value="">Select Affliate Partner</option>
              {affliateParnters &&
                affliateParnters.map((res) => {
                  return <option value={res.id}>{res.name}</option>;
                })}
              
            </Form.Control>
            <ErrorMessage type={errors.PartneredAffiliateUserId && errors.PartneredAffiliateUserId.type} /> 
          </Form.Group>     

          <Form.Group controlId="dob">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="StartDate"
              ref={register({ required: true })}
              />
              <ErrorMessage type={errors.StartDate && errors.StartDate.type} /> 
          </Form.Group>

          <Form.Group controlId="dob">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="EndDate"
              ref={register({ required: true })}
              />
              <ErrorMessage type={errors.EndDate && errors.EndDate.type} /> 
          </Form.Group>

          <Form.Group controlId="projectDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Description"
              name="Description"
              rows={8}
              ref={register({ required: true })}
              />
              <ErrorMessage type={errors.Description && errors.Description.type} /> 
          </Form.Group>

          <Form.Group controlId="projectStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              custom
              className="form-select"
              name="ProjectStatus"
              ref={register({ required: true })}
            >
              <option value="">Select Status</option>
              <option value="1">Ongoing</option>
              <option value="2">Completed</option>
              <option value="3">Rejected</option>
              {/* <option value={props.modalType !== 1 ? statusValue : "1"}>Ongoing</option>
                <option value={props.modalType !== 1 ? statusValue : "2"}>Completed</option> */}
            </Form.Control>
            <ErrorMessage type={errors.ProjectStatus && errors.ProjectStatus.type} /> 
          </Form.Group>

          <Modal.Footer>
       
        {props.modalType === 1 &&  <Button type="submit">Create</Button> } 
        {props.modalType === 2 &&  <Button type="submit">Save Changes</Button>}
        {props.modalType === 3 &&  <Button onClick={deleteConfirmation}>Delete</Button>}
        
      </Modal.Footer>
        </Form>
      </Modal.Body>
     
    </Modal>
  );
}
export default ProjectsModal;
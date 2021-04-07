import React, { useState } from 'react';
import { Modal, Button, Form, } from 'react-bootstrap';
import HttpService from '../../../shared/http.service';
import { format } from 'date-fns';
import Select from 'react-select';
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../sharedError/error.messages";

const CertificationModal = (props) => {
  const apiRoute = 'affiliate-certification/';
  const { addToast } = useToasts();
  const [certificationId, setCertificationId] = useState(props.certificationId);
  const [teamMembers, setTeamMembers] = useState([]);
  const [options, setOptions] = useState([]);
  const { register, handleSubmit, errors, formState, reset } = useForm();

  const get = async (certificationId) => {
    await HttpService.get(`${apiRoute}${certificationId}`).then((res) => {
      if (res && res.data) {
        res.data.IssueDate = res.data.IssueDate ? format(new Date(res.data.IssueDate), 'yyyy-MM-dd') : '';
        res.data.DateCompleted = res.data.DateCompleted ? format(new Date(res.data.DateCompleted), 'yyyy-MM-dd') : '';
        reset(res.data);
        let teamMem = res.data.TeamMembers ? res.data.TeamMembers.map(item => { return { value: item.AffiliateTeamMemberId, label: item.Name, isDisabled: item.IsApproved } }) : [];
        setTeamMembers(teamMem);
      }
    }).catch((err) => {
      console.log(err);
    });

  }

  const getLookup = async () => {
    await HttpService.get('affiliate-team').then((res) => {
      if (res && res.data) {
        let data = res.data.map((item) => { return { value: item.AffiliateTeamMemberId, label: item.Name, isDisabled: item.IsApproved } });
        setOptions(data);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const onSubmit = (data) => {
    if (teamMembers && teamMembers.length > 0) {
      data.TeamMemberIds = teamMembers.map(item => item.value)
    }

    certificationId && certificationId > 0 ? onEdit(data) : onAdd(data);
  }

  const onAdd = (data) => {
    HttpService.post(apiRoute, data).then((response) => {
      if (response) {
        addToast("Certification Created Successfully", {
          appearance: "success",
        });
        props.onHide();
      }
    }).catch(() => {
      console.log('error');
    })
  }

  const onEdit = (data) => {
    HttpService.put(`${apiRoute}${certificationId}`, data).then((response) => {
      reset(response.data)
      if (response !== undefined) {
        addToast("Certification Updated Successfully", {
          appearance: "success",
        });
        props.onHide();
      }
    }).catch(() => {

    })
  }

  const onDelete = () => {
    console.log('klkl;klk', certificationId)
    if (certificationId) {
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
          deleteRecord(certificationId);
        }
      });
    }
  }

  const deleteRecord = () => {
    return HttpService.delete(apiRoute + certificationId).then((response) => {
      if (response) {
        addToast("Certification Deleted Successfully", {
          appearance: "success",
        });
        props.onHide();
      }
    }).catch(() => {
      //add alert here!
      console.log('something weired happened');
    });
  }

  const changeHandler = (option) => {
    setTeamMembers(option);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onShow={() => {
        if (props.certificationId && props.certificationId > 0) {
          setCertificationId(props.certificationId)
          get(props.certificationId);
        }
        getLookup();
      }}
    >
      <Modal.Header closeButton>

        <Modal.Title id="contained-modal-title-vcenter">
          {certificationId && certificationId > 0 ? 'Update' : 'Create'} Certification
        </Modal.Title>

      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className='form-group'>
            <label>Title</label>
            <input type='text'
              className='form-control' name="Title" placeholder="Title Name" ref={register({ required: true })} />
            <ErrorMessage type={errors.Title && errors.Title.type} />
          </div>

          <div className='form-group'>
            <label> Provider </label>
            <input type='text'
              className='form-control' name="Provider" placeholder="Udemey" ref={register({ required: true })} />
            <ErrorMessage type={errors.Provider && errors.Provider.type} />

          </div>

          <div className='form-group'>
            <label>Issue Date</label>
            <input type='date'
              className='form-control' name="IssueDate" placeholder="Issue Date" ref={register({ required: true })} />
            <ErrorMessage type={errors.IssueDate && errors.IssueDate.type} />
          </div>

          <div className='form-group'>
            <label>Expiry Date</label>
            <input type='date'
              className='form-control' name="DateCompleted" placeholder="Expiry Completed" ref={register({ required: true })} />
            <ErrorMessage type={errors.DateCompleted && errors.DateCompleted.type} />
          </div>

          <div className='form-group'>
            <label>Certification URL</label>
            <input type='text'
              className='form-control' name="CertificationUrl" placeholder="Certification Url" ref={register({ required: true })} />
            <ErrorMessage type={errors.CertificationUrl && errors.CertificationUrl.type} />
          </div>

          <Form.Group controlId="teamMember">
            <Form.Label>Team Member</Form.Label>
            <Select
              isMulti
              name="teamMember"
              value={teamMembers}
              onChange={changeHandler}
              options={options}
            ></Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {
            certificationId && certificationId > 0
              ?
              <>
                <Button type="submit">Save Changes</Button>
                <Button type="button" onClick={onDelete}>Delete</Button>
              </>
              :
              <Button type="submit">Create</Button>
          }
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default CertificationModal;
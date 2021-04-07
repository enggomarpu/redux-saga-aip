import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Modal, Button, Image } from 'react-bootstrap'
import HttpService from '../../../shared/http.service'
import PlusCircle from '../../../img/plus-circle.png'
import TagAddModel from './tag-add-modal'
import { useToasts } from 'react-toast-notifications'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '../../sharedError/error.messages';
import ImagePicker from '../../../shared/image-picker/image-picker.component'

const PostModel = (props) => {
  const { addToast } = useToasts()
  const [imageValid, setImageValid] = useState(false)
  const [profileImg, setProfileImg] = useState()
  const [imageUpload, setImageUpload] = useState()
  const [imagesUpload, setImagesUpload] = useState([])
  const [fileName, setFileName] = useState()
  const [uploadPDF, setUploadPDF] = useState()
  const [tags, setTags] = useState([])
  const [options, setOptions] = useState([])

  const [postBtnTitle, setPostBtnTitle] = useState('Add Post')
  const [postHeader, setPostHeader] = useState('Create a Post')
  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (props.postselectid) {
      setPostBtnTitle('Edit Post')
      setPostHeader('Edit a Post')
      get()
    }
  }, [props])

  const changeHandler = (option) => {
    setTags(option)
  }

  const get = async () => {
    await HttpService.get(`posts/${props.postselectid}`)
      .then((res) => {
        if (res) {
          reset(res.data);
          setImagesUpload(res.data.PostAttachments);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const createTag = () => {
    setOpenModal(true)
    setModalType(1)
  }

  const getLookup = async () => {
    await HttpService.get('tag/lookup')
      .then((res) => {
        if (res) {
          let data = res.data.map((item) => {
            return {
              value: item.TagId,
              label: item.TagName,
              isDisabled: !item.IsApproved,
            }
          })
          setOptions(data)
          let postTags = props.PostTags
            ? props.PostTags.map((item) => {
              return {
                value: item.TagId,
                label: item.TagName,
                isDisabled: !item.IsApproved,
              }
            })
            : []
          setTags(postTags)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const modalLoaded = async () => {
    setFileName('')
    setProfileImg('')
    getLookup()
  }

  const imageHandler = (e) => {
    let imageObject = e.target.files[0]
    let imageError = false
    let fileExtension
    console.log('pdf file', imageObject)
    if (imageObject) {
      //console.log('object found');
      let imageName = imageObject.name.toLowerCase()
      setFileName(imageName)
      fileExtension = imageName.split('.').pop()
      //if(!imageName.match(/\/(jpg|jpeg|png|pdf|gif)$/)){
      if (
        !imageName.match(
          /(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG|\.GIF|\.PDF|\.pdf|\.mp3)$/
        )
      ) {
        console.log('please upload file wih valid extension')
        imageError = true
      }
      if (imageObject.size > 1000000) {
        console.log('size is too big.. upload with smaller size')
        imageError = true
      }
    }
    if (!imageError) {
      setImageValid(true)
      setImageUpload(e.target.files[0])

      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (fileExtension === 'pdf') {
            setUploadPDF(reader.result)
          }
          if (fileExtension === 'jpg' || fileExtension === 'png') {
            setProfileImg(reader.result)
          }
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const imageUploadPost = async () => {
    let response
    const data = new FormData()
    data.append('attachment', imageUpload)
    await HttpService.post('attchements/upload', data)
      .then((res) => {
        console.log('File upload Successfully', res.data.FileName)
        //setRetAttaId(res.data.AttachmentId);
        response = res.data.AttachmentId.toString()
        //AttachmentId
      })
      .catch((error) => { })

    return response
  }

  const savePost = async data => {
    data.PostAttachments = imagesUpload;
      if (tags && tags.length > 0) {
        data.TagIds = tags.map(item => item.value)
      }
      if (props.postselectid) {
        await HttpService.put(`posts/${props.postselectid}`, data).then(
          () => {
            addToast('Post Updated Successfully', {
              appearance: 'success',
            })
          }
        )
      } else {
        await HttpService.post('posts', data).then(() => {
          addToast('Post Created Successfully', {
            appearance: 'success',
          })
        })
      }
    props.onHide()
  }

  const onModalClose = (tagAdded) => {
    setOpenModal(false)
    if (tagAdded) {
      getLookup()
    }
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'gray' : null,
        color: isDisabled ? 'white' : null,
        cursor: isDisabled ? 'not-allowed' : 'default',
      }
    },
  }

  const afterUploaded = (filedata) => {
    let attachments = [];
    filedata.map((image) =>  {
      attachments.push({
        FileHandler: image.FileHandler,
        FileName: image.FileName,
        FileSize: image.FileSize,
        FileType: image.FileType,
        FilePath: image.FilePath,
      });
    });
    setImagesUpload(attachments);
  }

  return (
    <>
      <Modal
        {...props}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        backdrop="static"
        onEntered={modalLoaded}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {postHeader}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(savePost)} >
          <Modal.Body>
            <ImagePicker data={imagesUpload} afterUpload={afterUploaded}/>

            <label className='custom-select'>
              <i className='fas fa-file'></i>Add a Document
              <input className="form-control"
                type='file'
                id='inputGroupFile033'
                label='Add a File'
                onChange={imageHandler}
                style={{ display: 'none' }}
              />
            </label>

            <div className="form-group">
              <input className="form-control"
                type='text'
                name='PostTitle'
                placeholder='Enter text'
                ref={
                  register({
                    required: true
                  })
                }
              />
              <ErrorMessage type={errors.PostTitle && errors.PostTitle.type} />
            </div>

            <div className="form-group">
              <input className="form-control"
                as='textarea'
                id='inputTextArea'
                name="PostContent"
                placeholder='Enter text'
                rows={8}
                ref={
                  register({
                    required: true
                  })
                }
              />
              <ErrorMessage type={errors.PostContent && errors.PostContent.type} />
            </div>

            <div className="form-group" controlId='tags'>
              <div className='justify-content-between d-flex mb-2'>
                <label className='mb-0 align-self-center'>Tags</label>
                <button type='button' className='btn p-0' onClick={createTag}>
                  <img src={PlusCircle} alt='PlusCircle' />
                </button>
              </div>

              <Select
                isMulti
                name='tags'
                value={tags}
                onChange={changeHandler}
                options={options}
                styles={colourStyles}
              ></Select>
            </div>

            {imageValid && <Image src={profileImg} fluid />}

          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">{postBtnTitle}</Button>
            <Button onClick={props.onHide}>Cancel</Button>
          </Modal.Footer>
        </form>
      </Modal>

      <TagAddModel
        modaltype={modalType}
        show={openModal}
        onHide={onModalClose}
      />
    </>
  )
}
export default PostModel

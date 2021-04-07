import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import HttpService from './http.service';

class FileUpload {
    // constructor(props) {
    //     super(props);
    //     this.state = { files: [] };
    // }

    // componentDidMount() {
    //     if (this.state.files.length > 0) {
    //         this.state.files = this.props.files;
    //         this.FileUpload();
    //     }
    // }

    // uploadedFiles = event => {
    //     Array.from(event.target.files)
    //         .forEach(file => {
    //             this.state.files.push(file);
    //         });
    //     this.FileUpload();
    // }

    // FileUpload = () => {
    //     this.state.files
    //         .forEach(file => {
    //             const data = new FormData();
    //             data.append('attachment', file);
    //             HttpService.post('attchements/upload', data)
    //                 .then(res => {
    //                     console.log('File upload Successfully', res.data.FileName);
    //                 }).catch((error) => {
    //                     Swal.fire({
    //                         icon: 'Error',
    //                         title: error.response.status,
    //                         html: error.response.data.message,
    //                     });
    //                 });
    //         });
    //         Swal.fire({
    //             icon: 'success',
    //             title: "Success Message",
    //             html: 'File(s) uploaded',
    //         });
    //     return;

    // }

    // onClickHandler = () => {
    //     const data = new FormData()
    //     data.append('image', this.state.selectedFile);
    //     axios.post("http://localhost:3001/attchements/upload", data, { // receive two parameter endpoint url ,form data 
    //     })
    //         .then(res => { // then print response status
    //             this.setState({ fileUploaded: 'File uploaded successfully' })
    //         }).catch((error) => {
    //             Swal.fire({
    //                 icon: 'Error',
    //                 title: error.response.status,
    //                 html: error.response.data.message,
    //             });
    //         });
    // }

    // render() {
    //     return (
    //         <>
    //         </>
    //         // <form onSubmit={this.handleUploadImage}>
    //         //     <div>
    //         //         <input type="file" name="file" multiple="multiple" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
    //         //         text/plain, application/pdf, image/*" onChange={this.uploadedFiles} />
    //         //     </div>
                
    //         //     <h3>{this.state.fileUploaded}</h3>
    //         // </form>
    //     );
    // }
}

export default FileUpload;
import React, { useState, useEffect } from 'react'
import httpService from '../../../shared/http.service';

const documentsfile = () => {

  const [userDocuments, setuserDocuments] = useState([]);

  useEffect(() => {
    get();
  }, []);
  const get = async () => {
    await httpService.get('user/my-documents').then((res) => {
      if (res) {
        setuserDocuments(res.data);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <>
      <div className='card custom-card'>
        <div className='card-header d-flex justify-content-between'>
          <h5 className='card-title align-self-center'>My Documents</h5>
          <div className='header-button align-self-center'>
            {/* <label>
              Add account
              <button
                type='button'
                className='btn p-1 ms-1'
                data-toggle="modal" data-target="#exampleModal"
              >
                <img src={PlusCircle} alt='PlusCircle' />
                
              </button>
            </label> */}
          </div>
        </div>
        
        <div className='card-body p-0'>
       
          <ul className='accounts-list'>
          {userDocuments.map((result) => {
                    return (
            <li>{/*console.log('sub account aal details', result)*/}
              <div className='d-flex justify-content-between' key = {result.DocumentId}>
                <div className='align-self-center'>{result.DocumentName}</div>
                <div className='align-self-center'>
                {/* {console.log("file chekc",result.DocumentType.split('/').pop())} */}
                        {result.DocumentType.split('/').pop() === "jpeg" ?
                          
                        <a href = {result.DocumentType}><div className='fa fa-file-image-o'></div></a> :
                        <a href = {result.DocumentType}><div className='fa fa-file-pdf-o'></div></a>
                        
                        } 
                   
                </div>
                </div>
            </li>
                    )})}
          </ul> 
        </div>
      </div>
             
    </>
  )
}

export default documentsfile

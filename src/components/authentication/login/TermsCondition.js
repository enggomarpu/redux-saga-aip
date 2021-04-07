import React, { useState, useEffect } from 'react'
import HttpService from '../../../shared/http.service'

const Model = () => {
  const [TAC, setTAC] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    await HttpService.getwithoutTokken('TermsAndConditions').then((res) => {
      setTAC(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='AppModalLabel'>
              Terms & Conditions
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'

            ></button>
          </div>
          <div className='modal-body'>
            {TAC.map((result, index) => {
              return (
                <>
                  <div className='form-check'>
                    <label className='form-check-label' htmlFor='TermsConditions'>
                      {result.Message}
                    </label>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Model

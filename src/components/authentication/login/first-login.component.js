import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { firstLogin } from '../../../reducers/first-login/firstlogin.reducer';
import Logo from '../../../img/logo.png'
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from './../../sharedError/error.messages'
import { Link } from 'react-router-dom';
import { login } from '../../../reducers/login/login.reducer';

const FirstLoginComponent = (props) => {

    const firstLoginState = useSelector(state => state.firstLogin);
    const loginState = useSelector(state => state.login);
    const { register, handleSubmit, errors, formState, reset, setValue } = useForm();


    const dispatch = useDispatch();
    const { token } = useParams();

    useEffect(() => {

        if (!firstLoginState.isVerified && !firstLoginState.error) {
            dispatch(firstLogin(token))
        }
        if(firstLoginState.isVerified){
            props.history.push('/')
        }

        // if(loginState && loginState.isAuthenticated){
        //     props.history.push("/dashboard");
        // }

        console.log('verified', firstLoginState.isVerified, firstLoginState.error)

    }, [firstLoginState.isVerified, firstLoginState.error])

    // const rememberMeFunction = () => {
    //     if (localStorage.getItem('isChecked') && (localStorage.getItem('username') !== '')) {
    //       setValue('username', localStorage.getItem('username'));
    //       setValue('password', localStorage.getItem('password'));
    //     }
    //   }

    const onSubmit = async (formdata, e) => {
        console.log('submit called');
        e.preventDefault();

        if (formdata.rememberme) {
          localStorage.setItem('username', formdata.username);
          localStorage.setItem('password', formdata.password);
          localStorage.setItem('isChecked', formdata.isChecked);
        }
        const userObject = {
            username: formdata.username,
            password: formdata.password
        }
        console.log(userObject)
        dispatch(login());
    }

    return (

        <div>
             {firstLoginState && !firstLoginState.isVerified &&
            <div className='container bg-white'>
                <div className='row justify-content-center pt-5 pb-5'>
                  <div className='col-md-8 text-center' >
                    <h2 className='text-center mb-5'>Link has been Expired</h2>
                    <br />
                    <Link to={`/`} className=''>
                      <button type='button' className='btn btn-primary btn-block btn-height text-center mb-5'>Back to Login</button>
                    </Link>
                  </div>
                </div> 
            </div>}
        </div>
           
            

    )

}
export default FirstLoginComponent;
import React, { useEffect, useState } from 'react'
import BackButton from '../../BackButton/BackButton'
import './login.scss'
import Logo from '../../../img/logo.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from './../../sharedError/error.messages'
import { login } from '../../../reducers/login/login.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'

const LoginComponent = (props) => {
  const [message, setMessage] = useState('User is not valid');
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    isOTP: false,
  });
  const loginState = useSelector(state => state.login);
  const loginType = loginState && loginState.type
  const { register, handleSubmit, errors, formState, reset, setValue } = useForm();

  useEffect(() => {
    rememberMeFunction();
    switch (loginType) {
      case 'login/loginSuccess':
        if (loginState && loginState.user.IsFirstLogin) {
          props.history.push("/create-profile");
        } else {
          props.history.push(`/verify-otp/${loginState.user.Email}`);
        }
        break;
      case 'login/error':
        break;
      default:
        break;
    }
  }, [loginState])

  const rememberMeFunction = () => {
    if (localStorage.getItem('isChecked') && (localStorage.getItem('username') !== '')) {
      setValue('username', localStorage.getItem('username'));
      setValue('password', localStorage.getItem('password'));
    }
  }

  const onSubmit = async (formdata, e) => {
    e.preventDefault();
    if (formdata.rememberme) {
      localStorage.setItem('username', formdata.username);
      localStorage.setItem('password', formdata.password);
      localStorage.setItem('isChecked', formdata.isChecked);
    }
    dispatch(login(formdata));
    // if (twoFactorEmail !== "" && formdata.otp !== "") {
    //   // this.setState({
    //   //   SubmitLoading: true,
    //   // });
    //   await HttpService.twoFactorValidation("verify-two-factor", {
    //     Email: twoFactorEmail,
    //     //VerificationCode: parseInt(twoFactorCode),
    //     VerificationCode: parseInt(formdata.otp),
    //   })
    //     .then((res) => {
    //       // this.setState({
    //       //   SubmitLoading: false,
    //       // });
    //       localStorage.setItem("user-info", JSON.stringify(res.data));
    //       if (res.data && res.data.isFirstLogin === true) {
    //         props.history.push("/create-profile");
    //       } else {
    //         props.history.push("/dashboard");
    //       }
    //     })
    //     .catch((err) => {
    //       // this.setState({
    //       //   SubmitLoading: false,
    //       // });
    //       console.log(err);
    //     });
    //   return;
    // } else {
    //   //for login
    //   //this.form.validateAll();

    //   // if (errors.length === 0) {

    //   if (formdata.rememberme) {
    //     localStorage.setItem('username', formdata.username)
    //     localStorage.setItem('password', formdata.password)
    //     localStorage.setItem('isChecked', formdata.isChecked)
    //   }

    //   await HttpService.login('login', formdata.username, formdata.password)

    //     //dispatch(singIn())

    //     .then((res) => {
    //       console.log('in the login call', res);
    //       if (res && res.Email && res.IsFirstLogin === true) {
    //         HttpService.getwithoutTokken('user-first-login-detail/' + res.Email)
    //           .then((res) => {
    //             localStorage.setItem("user-info", JSON.stringify(res.data));
    //             props.history.push("/create-profile");
    //             window.location.reload();

    //           })
    //           .catch((err) => {
    //             console.log(err);
    //           })

    //         // this.setState({
    //         //   loading: false,
    //         // })
    //         setIsLoading(false)
    //       }
    //       else if (res && res.Email) {
    //         setIsShowTwoFactor(true);
    //         setIsLoading(false);
    //         setIsDisabled(true);
    //         setDate(Date.now() + 9000);
    //         setTwoFactorEmail(res.Email)
    //       }
    //       // this.props.history.push("/dashboard");
    //       // window.location.reload();
    //     },
    //       error => {
    //         const resMessage =
    //           (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //           error.message ||
    //           error.toString();

    //         setIsLoading(false);
    //         setMessage(resMessage)
    //       }
    //     );
    //   // }
    //   // else {
    //   //   setIsLoading(false);
    //   //   setMessage("Please enter valid Form.")
    //   // }
    // }
  }

  return (
    <>
      <div className='login-container'>
        <BackButton />
        <div className='text-center mt-5 mb-5'>
          <img src={Logo} alt='Logo' />
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='container bg-white'>
            <div className='row justify-content-center pt-5 pb-5'>
              <div className='col-md-8'>
                <h2 className='text-center mb-5'>Login to your Account</h2>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    name="username"
                    ref={register({ required: true })}
                  />
                  <ErrorMessage type={errors.username && errors.username.type} />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    className="form-control"
                    type='password'
                    placeholder='Password'
                    name="password"
                    ref={register({ required: true })}
                  />
                  <ErrorMessage type={errors.password && errors.password.type} />
                </div>
                <div className='form-check'>
                  <input
                    id='Remember'
                    className='form-check-input'
                    type='checkbox'
                    name="rememberme"
                    ref={register}
                  />
                  <label className="pull-left checkbox-inline">
                    Remember me
                        </label>
                  <Link to='' className='float-end link'>
                    Forgot password?
                      </Link>
                </div>
                <div className='form-group d-grid'>
                  <button type='submit' className='btn btn-primary btn-block btn-height'>
                    {loginState && loginState.loading && (<span className="spinner-border spinner-border-sm"></span>)}
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default LoginComponent

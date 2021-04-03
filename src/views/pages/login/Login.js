import React from 'react'
import validateInput from "../../../pages/validation/validation";
import SetAuth from "../../../pages/setHeader/JwtHeader"
import Swal from 'sweetalert2'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class LoginForm extends React.Component {

  constructor() {
    super()

    this.state = {
      email: "",
      password: "",
      isLoading: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }


  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      Swal.fire(
        'Error',
        errors,
        'error'
      )
    }

    return isValid
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      this.setState({isLoading : true})
      axios.post('https://coreapi.aaitheantiquebake.com/register/login/',this.state)
      .then(response => {
        const getResponse = response.data
        let checkMsg = getResponse.message
        let token = getResponse.token
        if(checkMsg === "Auth deny") {
          Swal.fire(
            'Error',
            "Please check username and password",
            'error'
          )
          this.setState({isLoading : false})
        }
        else {
          localStorage.setItem('virusInput', token)
          SetAuth(token)
          console.log(jwt.decode(token));
          Swal.fire(
            'Success',
            "Welcome!",
            'success'
          )
          this.setState({isLoading : false})
          window.location.reload(true);
        }
      })
      .catch(function (error) {
        // handle error
        alert("Please check your Internet!")
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value})
  }

  render() {

    let {email, password, isLoading} = this.state

    let CurrentDate = new Date();
    let currentHour = CurrentDate.getHours();

    let goodQuote, goodWish;


    goodQuote = "Something"
    goodWish = "Morning";

    if(currentHour <= 11) {
      goodQuote = "Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve."
      goodWish = "Morning";
    }
    else if(currentHour <= 16) {
      goodQuote = "I wake up every morning and think to myself, ‘how far can I push this company in the next 24 hours."
      goodWish = "Afternoon";
    }
    else {
      goodQuote = "We need to accept that we won’t always make the right decisions, that we’ll screw up royally sometimes – understanding that failure is not the opposite of success, it’s part of success."
      goodWish = "Night";
    }

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" value={email} name="email" autoComplete="username" onChange={this.onChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" value={password} name="password" autoComplete="current-password" onChange={this.onChange} />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="primary" className="px-4" disabled={isLoading} onClick={this.onSubmit} >Login</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Good {goodWish}</h2>
                      <p>{goodQuote}</p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
  
}



export default LoginForm

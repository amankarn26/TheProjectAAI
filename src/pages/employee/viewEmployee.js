import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CInputFile,
  CImg,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CFormText,
  CTextarea,
  CDataTable,
  CSwitch
} from '@coreui/react'


import mobileIcon from '../../includes/imgs/svg/mobile.svg'

import cartData from '../api/employee/JobEmployee'

class Employee extends Component {

    constructor(props) {
        super(props)
        

        this.state = {
            EName : 'Quintin Roti',
            EAddress : 'This Food is fibulas for 2 person per payali. We encourage you prefer this.',
            ESalary : 240,
            EContact : "8600 240 516",
            DOB : "",
            DOJ : "",
            collapsed : true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCollapsed = this.handleCollapsed.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    handleSubmit() {
        window.location.replace("#/operation/employee")
    }

    handleCollapsed() {
        this.setState(privState => {
            return {
                collapsed: privState.collapsed
            }
        });
    }

    photoUpload() {
        alert("Image Uploaded Successfully.")
        document.getElementById('file-input').value = null
    }
 
    render() {

        
        const fields = ['amount', 'date', 'type']

        return (
            <>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                Overview of the Employee
                            </CCardHeader>
                            <CCardBody>
                                <CForm action="" method="post" className="form-horizontal">
                                    <CRow>
                                        <CCol xs="12" lg="5">
                                            <CImg 
                                                src={mobileIcon}
                                                fluidGrow
                                                className="leftImageOrderView"
                                            />
                                            
                                        </CCol>
                                        <CCol xs="12" lg="7">
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="EName">Employee Name</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput
                                                        type="text"
                                                        id="EName"
                                                        name="EName"
                                                        placeholder="Enter Employee Name.."
                                                        autoComplete="false"
                                                        value={this.state.EName} 
                                                        onChange={this.handleChange}
                                                    />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="ESalary">Employee Salary</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput
                                                        type="number"
                                                        id="ESalary"
                                                        name="ESalary"
                                                        placeholder="Enter Employee Salary.."
                                                        value={this.state.ESalary} 
                                                        onChange={this.handleChange}
                                                    />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="DOB">Employee DOB</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput
                                                        type="date"
                                                        id="DOB"
                                                        name="DOB"
                                                        placeholder="Enter Employee DOB.."
                                                        value={this.state.DOB} 
                                                        onChange={this.handleChange}
                                                    />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="EContact">Employee Contact</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput
                                                        type="text"
                                                        id="EContact"
                                                        name="EContact"
                                                        placeholder="Enter Employee Contact.."
                                                        value={this.state.EContact} 
                                                        onChange={this.handleChange}
                                                    />
                                                </CCol>
                                            </CFormGroup>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="DOJ">Employee DOJ</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput
                                                        type="date"
                                                        id="DOJ"
                                                        name="DOJ"
                                                        placeholder="Enter Employee DOJ.."
                                                        value={this.state.DOJ} 
                                                        onChange={this.handleChange}
                                                    />
                                                </CCol>
                                            </CFormGroup>
                                            <div className="empty-sm"></div>
                                            <hr />
                                            <div className="empty-sm"></div>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="EAddress">Employee Address</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CTextarea 
                                                        name="EAddress" 
                                                        id="EAddress" 
                                                        rows="3"
                                                        placeholder="Address..." 
                                                        value={this.state.EAddress} 
                                                        onChange={this.handleChange}
                                                    />
                                                    <CFormText className="help-block">Please Enter Employee Address</CFormText>
                                                </CCol>
                                            </CFormGroup>
                                            <div className="empty-sm"></div>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="PActive">Status</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CSwitch className={'mx-1'} variant={'3d'} id='PActive' color={'success'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
                                                </CCol>
                                            </CFormGroup>
                                            <div className="empty-sm"></div>
                                        </CCol>
                                    </CRow>
                                </CForm>
                                <div className="empty-xl"></div>
                                <CRow>
                                    <CCol xs="12" lg="3">
                                        <CInputFile id="file-input" name="file-input"/>
                                    </CCol>
                                    <CCol xs="12" lg="9">
                                        <CRow>
                                            <CCol xs="12" lg="6">
                                                <CButton shape="pill" size="sm" onClick={this.photoUpload} color="success" className="">Upload Image</CButton>
                                            </CCol>
                                            <CCol xs="12" lg="3">
                                                <CButton block shape="pill" size="sm" onClick={this.handleSubmit} color="success" className="">Save and Exit</CButton>
                                            </CCol>
                                            <CCol xs="12" lg="3">
                                                <CButton block shape="pill" size="sm" onClick={this.handleSubmit} color="secondary" className="">Exit</CButton>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                Delivery Done by this Employee
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                items={cartData}
                                fields={fields}
                                itemsPerPage={10}
                                pagination
                                sorter
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </>
        )
    }
    
}

export default Employee

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
  CSwitch
} from '@coreui/react'


import mobileIcon from '../../includes/imgs/svg/mobile.svg'



class Product extends Component {

    constructor(props) {
        super(props)
        

        this.state = {
            PName : 'Quintin Roti',
            PDescription : 'This Food is fibulas for 2 person per payali. We encourage you prefer this.',
            PPrice : 240
        }

        this.handleChange = this.handleChange.bind(this)
    }

    // For input box
    // const [PName, setPName] = useState('Quintin Roti')
    // const [PDescription, setPDescription] = useState('This Food is fibulas for 2 person per payali. We encourage you prefer this.')
    // const [PPrice, setPPrice] = useState('240')

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    handleSubmit() {
        window.location.replace("#/operation/product")
    }

    photoUpload() {
        alert("Image Uploaded Successfully.")
        document.getElementById('file-input').value = null
    }
 
    render() {

        return (
            <>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                Overview of the order
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
                                                    <CLabel htmlFor="PName">Product Name</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput
                                                        type="text"
                                                        id="PName"
                                                        name="PName"
                                                        placeholder="Enter Product Name.."
                                                        autoComplete="false"
                                                        value={this.state.PName} 
                                                        onChange={this.handleChange}
                                                    />
                                                    <CFormText className="help-block">Please Enter Product Name</CFormText>
                                                </CCol>
                                            </CFormGroup>
                                            <div className="empty-md"></div>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="PPrice">Product Price</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CInput
                                                        type="number"
                                                        id="PPrice"
                                                        name="PPrice"
                                                        placeholder="Enter Product Price.."
                                                        value={this.state.PPrice} 
                                                        onChange={this.handleChange}
                                                    />
                                                    <CFormText className="help-block">Please Enter Product Price</CFormText>
                                                </CCol>
                                            </CFormGroup>
                                            <div className="empty-md"></div>
                                            <hr/>
                                            <div className="empty-md"></div>
                                            <CFormGroup row>
                                                <CCol xs="12" md="3">
                                                    <CLabel htmlFor="PDescription">Product Description</CLabel>
                                                </CCol>
                                                <CCol xs="12" md="9">
                                                    <CTextarea 
                                                        name="PDescription" 
                                                        id="PDescription" 
                                                        rows="5"
                                                        placeholder="Description..." 
                                                        value={this.state.PDescription} 
                                                        onChange={this.handleChange}
                                                    />
                                                    <CFormText className="help-block">Please Enter Product Description</CFormText>
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
            </>
        )
    }
    
}

export default Product

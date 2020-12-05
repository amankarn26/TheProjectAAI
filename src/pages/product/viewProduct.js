import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from "axios";
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
  CSwitch,
  CSpinner
} from '@coreui/react'


import mobileIcon from '../../includes/imgs/svg/mobile.svg'

const getSwitch = (status, handleChange) => {
    if (status === 'Active') return <CSwitch className={'mx-1 floatRight'} name="selectStatus" onChange={handleChange} variant={'3d'} id='PActive' color={'success'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
    else return <CSwitch className={'mx-1 floatRight'} variant={'3d'} id='PActive' name="selectStatus" onChange={handleChange} color={'success'} labelOn={'\u2713'} labelOff={'\u2715'}/>
}


class Product extends Component {

    constructor(props) {
        super(props)
        

        this.state = {
            PName : '',
            PDescription : '',
            PPrice : 0,
            selectStatus : 'Active',
            selectImage : mobileIcon,
            newImage : null,
            isLoaded : false,
            ReceivedData : {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.exitSubmit = this.exitSubmit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.dataUpdated = this.dataUpdated.bind(this)
        this.photoUpload = this.photoUpload.bind(this)
        this.dataLoading = this.dataLoading.bind(this)
    }

    componentDidMount() {
        let url = this.props.location.YeID
        axios.get(url)
            .then(response => {
                let data = response.data.products
                this.setData(data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    setData(data) {
        console.log(data[0]);
        this.setState(() => {
          return {
            isLoaded : true,
            PName : data[0].name,
            PDescription : data[0].description,
            PPrice : data[0].price,
            selectStatus : data[0].status,
            selectImage : data[0].productImage,
          }
        })
    }

    // For input box
    // const [PName, setPName] = useState('Quintin Roti')
    // const [PDescription, setPDescription] = useState('This Food is fibulas for 2 person per payali. We encourage you prefer this.')
    // const [PPrice, setPPrice] = useState('240')

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name === "selectStatus") {
            if (this.state.selectStatus === "Active") {
                this.setState({
                    selectStatus: "Inactive"
                })
            } else {
                this.setState({
                    selectStatus: "Active"
                })
            }
        } 
        else if(name === "selectImage") {
            this.setState({
                newImage : target.files[0]
            })
        }
        else {
            this.setState({
                [name]: value
            });
        }
    }

    handleSubmit() {
        let url = this.props.location.YeID

        this.dataLoading()

        axios.patch(url, {
            name: this.state.PName,
            description: this.state.PDescription,
            price: this.state.PPrice,
            status: this.state.selectStatus
        })
        .then(response => {
            this.dataUpdated()
        })
        .catch(function (error) {
            alert(error);
        });

    }

    dataUpdated() {
        this.props.history.push("#/operation/product")
    }

    dataLoading() {
        this.setState({
            isLoaded : false
        })
    }

    exitSubmit() {
        this.props.history.push("#/operation/product")
    }

    photoUpload() {
        // let upload_image_ref = document.getElementById('file-input')
        // let value_image = upload_image_ref.value
        // alert("Image=" + value_image)
        // upload_image_ref.value = null
        // this.props.history.push("#/operation/product")

        console.log(this.state.newImage)

        this.dataLoading()

        const fd = new FormData();
        fd.append('productImage',this.state.newImage, this.state.newImage.name);

        let url = this.props.location.YeID

        axios.patch(url, fd)
        .then(response => {
            this.dataUpdated()
        })
        .catch(function (error) {
            alert(error);
        });
    }
 
    render() {

        if (!this.props.location.YeID) {
            return (<Redirect to="/operation/product" />)
        }
        else
            if (this.state.isLoaded) {
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
                                                        src={this.state.selectImage}
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
                                                            {getSwitch(this.state.selectStatus, this.handleChange)}
                                                        </CCol>
                                                    </CFormGroup>
                                                    <div className="empty-sm"></div>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                        <div className="empty-xl"></div>
                                        <CRow>
                                            <CCol xs="12" lg="3">
                                                <CInputFile id="file-input" name="selectImage" onChange={this.handleChange} />
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
                                                        <CButton block shape="pill" size="sm" onClick={this.exitSubmit} color="secondary" className="">Exit</CButton>
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
            else {
                return (
                    <>
                      <CRow>
                        <CCol>
                          <CCard>
                            <CCardHeader>
                                Overview of the order
                            </CCardHeader>
                            <CCardBody>
                              <center>
                                <CSpinner
                                  color="primary"
                                  style={{width:'4rem', height:'4rem'}}
                                />
                              </center>
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                    </>
                  )
            }
    }
    
}

export default Product

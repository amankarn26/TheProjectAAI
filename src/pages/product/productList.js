import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CBadge,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CImg,
  CSwitch,
  CSpinner
} from '@coreui/react'

// import productData from '../api/product/allProduct'

import mobileIcon from '../../includes/imgs/svg/mobile.svg'



//normal start

const TrimDescription = description => {
    if(description.length > 25) return description.substring(0,25)
    return description
}

const fields = [
    'name', 
    {
      key: 'price',
      label: 'Amount'
    }, 
    'description',
    'status',
    {
        key: 'action',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    }
]

const patinationProps = {
    values: [10,20,50,100]
}

const FilterProps = {
    label: 'Search Here'
}

const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'danger'
      default: return 'warning'
    }
}


class Product extends Component {

  constructor() {
    super()

    this.state = {
      large : false,
      selectName : 'Quintin Roti',
      selectPrice : '240',
      selectDes : 'This Food is fibulas for 2 person per payali. We encourage you prefer this.',
      selectStatus : 'Active',
      selectImage : mobileIcon,
      selectUrl : null,
      isLoaded : false,
      ReceivedData : {}
    }

    this.setLarge = this.setLarge.bind(this)
    this.setData = this.setData.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    axios.get('https://coreapi.aaitheantiquebake.com/products/')
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

  handleStatusChange(){
    if (this.state.selectStatus === 'Active') {
      this.setState({selectStatus:"Inactive"})
      this.ChangeStatus("Inactive",this.state.selectUrl)
    }
    else {
      this.setState({selectStatus:"Active"})
      this.ChangeStatus("Active",this.state.selectUrl)
    }    
  }

  ChangeStatus(NewStatus, url){
    axios.patch(url, {
      status: NewStatus
    })
    .then(response => {
      this.fetchData()
    })
    .catch(function (error) {
      alert(error);
    });
  }

  getSwitch(status){
    if (status === 'Active') return <CSwitch className={'mx-1 floatRight'} onChange={this.handleStatusChange} variant={'3d'} id='PActive' color={'success'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
    else return <CSwitch className={'mx-1 floatRight'} variant={'3d'} onChange={this.handleStatusChange} id='PActive' color={'success'} labelOn={'\u2713'} labelOff={'\u2715'}/>
  }

  setLarge(state, name, price, des, status,img,url) {
    this.setState(() => {
      return {
        large : state,
        selectName : name,
        selectPrice : price,
        selectDes : des,
        selectStatus : status,
        selectImage : img,
        selectUrl : url
      }
    })
  }

  setData(data) {
    this.setState(() => {
      return {
        isLoaded : true,
        ReceivedData : data
      }
    })
  }
  

  updateState(id,status) {
    
  }


  render() {

    if (this.state.isLoaded) {
      return (
        <>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                    All Product are listed here.
                </CCardHeader>
                <CCardBody>
                <CDataTable
                    items={this.state.ReceivedData}
                    fields={fields}
                    tableFilter={FilterProps}
                    footer
                    itemsPerPage={10}
                    itemsPerPageSelect={patinationProps}
                    hover
                    sorter
                    pagination
                    scopedSlots = {{
                        'status':
                            (item)=>(
                                <td>
                                <CBadge color={getBadge(item.status)}>
                                    {item.status}
                                </CBadge>
                                </td>
                            ),
                          'price':
                              item => (
                                <td>
                                    {item.price} Rs/ Payali
                                </td>
                              ),
                        'description':
                            item => (
                                <td>
                                    {TrimDescription(item.description)}...
                                </td>
                            )
                        ,
                        'action':
                            item=> (
                                <td>
                                  <CButton block shape="pill" onClick={() => this.setLarge(!this.state.large,item.name,item.price,item.description,item.status,item.productImage,item.url)} size="sm" color="primary" className="">View</CButton>
                                </td>
                        )
                    }}
                />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CModal 
            show={this.state.large} 
            onClose={() => this.setLarge(!this.state.large)}
            size="lg"
          >
            <CModalHeader closeButton>
              <CModalTitle>Product Detail</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow>
                <CCol xs="12" lg="5">
                    <CImg 
                        src={this.state.selectImage}
                        fluidGrow
                        className="leftImageOrderView"
                    />
                </CCol>
                <CCol xs="12" lg="7">
                    <h1>{this.state.selectName}</h1>
                    <div className="empty-md"></div>
                    <CRow>
                        <CCol xs="12" lg="6">
                            <b>{this.state.selectPrice}</b> Rs / Payli
                        </CCol>
                        <CCol xs="12" lg="6"></CCol>
                    </CRow>
                    <div className="empty-md"></div>
                    <hr/>
                    <div className="empty-md"></div>
                    <CRow>
                        <CCol xs="12" lg="3">
                            Description :
                        </CCol>
                        <CCol xs="12" lg="9">
                          {this.state.selectDes}
                        </CCol>
                    </CRow>
                    <div className="empty-md"></div>
                    <CRow>
                        <CCol>
                          {this.getSwitch(this.state.selectStatus)}
                        </CCol>
                    </CRow>
                    <div className="empty-sm"></div>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <Link to={{
                pathname: '/view/product',
                YeID: this.state.selectUrl
              }}>
                <CButton color="primary" onClick={() => this.setLarge(!this.state.large)}>Edit</CButton>
              </Link>
              {' '}
              <CButton color="secondary" onClick={() => this.setLarge(!this.state.large)}>Cancel</CButton>
            </CModalFooter>
          </CModal>
        </>
      )
    } else {
      return (
        <>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                    All Product are listed here.
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

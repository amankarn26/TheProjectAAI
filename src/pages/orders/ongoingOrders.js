import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CSpinner
} from '@coreui/react'

// import usersData from '../api/orders/ongoingOrder'
import Axios from 'axios'

const getBadge = status => {
  switch (status) {
    case 'onway': return 'success'
    case 'Preparing': return 'secondary'
    case 'Hold': return 'primary'
    case 'Pending': return 'danger'
    default: return 'warning'
  }
}

const getApproval = status => {
    switch (status) {
        case 'onway': return 'On Way'
        case 'Preparing': return 'Preparing'
        case 'Hold': return 'Approval Pending'
        case 'Pending': return 'Waiting'
        default: return 'Unusual Data'
    }
}

const TrimAddress = address => {
  if(address.length > 40) return address.substring(0,40) + "......"
  return address
}

const fields = ['name','Amount', 'address', 'Status', 'action']


export default class ongoingOrders extends Component {


  constructor() {
    super()

    this.state = {
      isLoaded : false,
      ReceivedData : {}
    }

    this.setData = this.setData.bind(this)
  }

  componentDidMount() {
    this.fatchData()
  }

  fatchData() {
    Axios.get('https://coreapi.aaitheantiquebake.com/order/all/ongoing')
      .then(response => {
        console.log(response.data);
        let data = response.data.cart
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
    this.setState(() => {
      return {
        isLoaded : true,
        ReceivedData : data
      }
    })
  } 


  render() {
    if (this.state.isLoaded) {
      return (
        <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Ongoing Orders are listed here.
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={this.state.ReceivedData}
                fields={fields}
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'address':
                      item => (
                          <td>
                              {TrimAddress(item.address)}
                          </td>
                      )
                  ,
                  'Amount':
                      item => (
                          <td>
                              {item.Amount} Rs
                          </td>
                      )
                  ,
                  'Status':
                    (item)=>(
                      <td>
                        <CBadge color={getBadge(item.Status)}>
                          {getApproval(item.Status)}
                        </CBadge>
                      </td>
                    ),
                  'action':
                    (item)=> (
                      <td>
                          <Link to={{
                            pathname: '/view/order',
                            YeID: item.id
                          }}>
                              <CButton block shape="pill" size="sm" color="primary" className="">View</CButton>
                          </Link>
                      </td>
                    )
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
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


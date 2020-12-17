import React, { useState , useEffect} from 'react'
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

import Axios from 'axios'


//normal start

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

const getType = type => {
    switch (type) {
        case 'delivery': return 'Home Delivery'
        case 'Pickup': return 'Self Pickup'
        default: return 'UnKnown'
    }
}

const fields = [
    'name', 
    'Amount', 
    {
      key: 'created',
      label: 'Ordered'
    }, 
    {
      key: 'Delivery_Type',
      label: 'Type'
    }, 
    'Status', 
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


const TrimData = data => {
  return data.substring(0,10)
}

const Tables = () => {


  const [isLoaded, setisLoaded] = useState(false)
  const [CData, setCData] = useState([])


  useEffect(() => {

    let query = "https://coreapi.aaitheantiquebake.com/order/all/schedule"
    Axios.get(query)
      .then(response => {
        console.log(response.data.cart)
        setCData(response.data.cart)
        setisLoaded(true)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      
    // eslint-disable-next-line
  }, []) 


  if (isLoaded) {
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
                  items={CData}
                  fields={fields}
                  tableFilter={FilterProps}
                  footer
                  itemsPerPage={10}
                  itemsPerPageSelect={patinationProps}
                  hover
                  sorter
                  pagination
                  scopedSlots = {{
                      'type':
                      (item)=>(
                          <td>
                          {getType(item.type)}
                          </td>
                      ),
                      'Status':
                      (item)=>(
                          <td>
                          <CBadge color={getBadge(item.Status)}>
                              {getApproval(item.Status)}
                          </CBadge>
                          </td>
                      ),
                      'created':
                      (item)=>(
                          <td>
                            {TrimData(item.created)}
                          </td>
                      ),
                      'action':
                      item=> (
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

export default Tables

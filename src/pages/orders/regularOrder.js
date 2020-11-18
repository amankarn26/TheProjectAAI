import React from 'react'
import { Link } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'

import usersData from '../api/orders/normalOrder'


//normal start

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'primary'
    case 'Banned': return 'danger'
    default: return 'warning'
  }
}

const getApproval = status => {
    switch (status) {
        case 'Active': return 'Delivered'
        case 'Inactive': return 'InProcess'
        case 'Pending': return 'Payment Pending'
        case 'Banned': return 'Rejected'
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
    'amount', 
    'ordered', 
    'type', 
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

const Tables = () => {
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
                items={usersData}
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
                    'status':
                    (item)=>(
                        <td>
                        <CBadge color={getBadge(item.status)}>
                            {getApproval(item.status)}
                        </CBadge>
                        </td>
                    ),
                    'action':
                    ()=> (
                        <td>
                            <Link to="/view/order">
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
}

export default Tables

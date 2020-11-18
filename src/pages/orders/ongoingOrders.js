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

import usersData from '../api/orders/ongoingOrder'

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
        case 'Active': return 'On Way'
        case 'Inactive': return 'Preparing'
        case 'Pending': return 'Approval Pending'
        case 'Banned': return 'Rejected'
        default: return 'Unusual Data'
    }
}

const fields = ['name','amount', 'address', 'status', 'action']

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
              itemsPerPage={10}
              pagination
              scopedSlots = {{
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

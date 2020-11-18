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

const PendingData = usersData.filter(user => user.status === 'Pending')

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

// const TrimAddress = address => {
//     if(address.length > 25) return address.substring(0,25)
//     return address
// }

const fields = ['name','amount', 'address', 'status', 'action']

const Tables = () => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
                Orders which need attention are listed here.
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={PendingData}
              fields={fields}
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                // 'address':
                //     item => (
                //         <td>
                //             {TrimAddress(item.address)}...
                //         </td>
                //     )
                // ,
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

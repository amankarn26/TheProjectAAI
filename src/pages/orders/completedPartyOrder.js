import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'

import usersData from '../api/orders/partyOrder'

const PendingData = usersData.filter(user => user.status === 'Active')


//normal start

const TrimAddress = address => {
    if(address.length > 25) return address.substring(0,25)
    return address
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
    {
        key: 'party',
        label: 'Party Date'
    },
    'address', 
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
                items={PendingData}
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
                    'address':
                        item => (
                            <td>
                                {TrimAddress(item.address)}...
                            </td>
                        )
                    ,
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

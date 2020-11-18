import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'

import PaymentData from '../api/payment/payment'

const fields = [
    'name', 
    'amount', 
    'date'
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
                All Payment Received are listed here.
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={PaymentData}
                fields={fields}
                tableFilter={FilterProps}
                footer
                itemsPerPage={10}
                itemsPerPageSelect={patinationProps}
                hover
                sorter
                pagination
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables

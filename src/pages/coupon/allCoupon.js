import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CSwitch
} from '@coreui/react'

import usersData from '../api/coupon/coupon'

const getBadge = status => {
  switch (status) {
    case 'Active': return (<CSwitch className={'mx-1 floatRight'} variant={'3d'} id='PActive' color={'success'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>)
    case 'Inactive': return (<CSwitch className={'mx-1 floatRight'} variant={'3d'} id='PActive' color={'success'} labelOn={'\u2713'} labelOff={'\u2715'}/>)
    default: return 'warning'
  }
}

const fields = [
  'name', 
  'code', 
  'expiry', 
  'discount', 
  'audience', 
  'status'
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
                All Coupon are listed here.
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
                'status':
                  (item)=>(
                    <td>
                      {getBadge(item.status)}
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

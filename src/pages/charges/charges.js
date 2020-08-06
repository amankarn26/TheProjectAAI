import React, {useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse,
  CInput
} from '@coreui/react'

import usersData from '../api/charges/charges'

const fields = [
  'name', 
  'price', 
  {
    key: 'show_details',
    label: '',
    _style: { width: '10%' },
    sorter: false,
    filter: false
  }
]

const FilterProps = {
  label: 'Search Here'
}

const Tables = () => {

    const [details, setDetails] = useState([])

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
          newDetails.splice(position, 1)
        } else {
          newDetails = [...details, index]
        }
        setDetails(newDetails)
    }


  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
                Delivery charges are listed here.
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              tableFilter={FilterProps}
              footer
              hover
              sorter
              scopedSlots = {{
                'show_details':
                    (item, index)=>{
                        return (
                        <td className="py-2">
                            <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={()=>{toggleDetails(index)}}
                            >
                            {details.includes(index) ? 'Hide' : 'Update'}
                            </CButton>
                        </td>
                        )
                    },
                    'details':
                        (item, index)=>{
                        return (
                        <CCollapse show={details.includes(index)}>
                            <CCardBody>
                            <h4>
                                {item.name}
                            </h4>
                            <p className="text-muted">Current Price: {item.price}</p>
                            <CRow>
                                <CCol xs="12" lg="6">
                                    <CInput
                                        type="number"
                                        id="price"
                                        size="sm"
                                        name="price"
                                        placeholder="Enter New Price.."
                                        autoComplete="false"
                                    />
                                </CCol>
                                <CCol xs="12" lg="6">
                                    <CButton size="sm" color="danger" className="ml-1">
                                        Update
                                    </CButton>
                                </CCol>
                            </CRow>
                            </CCardBody>
                        </CCollapse>
                        )
                    }
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

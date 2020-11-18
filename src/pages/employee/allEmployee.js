import React, {useState} from 'react'
import { Link } from 'react-router-dom'
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
  CSwitch
} from '@coreui/react'

import employeeData from '../api/employee/allEmployee'

import mobileIcon from '../../includes/imgs/svg/mobile.svg'



//normal start

const fields = [
    'name', 
    'Salary', 
    {
        key: 'Join',
        label: 'Joining Date'
    }, 
    'Contact',
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

const Employee = () => {

  
  const [large, setLarge] = useState(false)


  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
                All Employee are listed here.
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={employeeData}
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
                    'action':
                        ()=> (
                            <td>
                              <CButton block shape="pill" onClick={() => setLarge(!large)} size="sm" color="primary" className="">View</CButton>
                            </td>
                    )
                }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal 
        show={large} 
        onClose={() => setLarge(!large)}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Employee Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs="12" lg="5">
                <CImg 
                    src={mobileIcon}
                    fluidGrow
                    className="leftImageOrderView"
                />
            </CCol>
            <CCol xs="12" lg="7">
                <h1>Chetan Mohamed</h1>
                <div className="empty-md"></div>
                <CRow>
                    <CCol xs="12" lg="6">
                        <b>Date of Birth:</b> 1998/01/01
                    </CCol>
                    <CCol xs="12" lg="6"></CCol>
                </CRow>
                <CRow>
                    <CCol xs="12" lg="6">
                        <b>Joining Date:</b> 2018/01/01
                    </CCol>
                    <CCol xs="12" lg="6"></CCol>
                </CRow>
                <div className="empty-sm"></div>
                <CRow>
                    <CCol xs="12" lg="6">
                        <b>Salary:</b> 2450 Rs / Month
                    </CCol>
                    <CCol xs="12" lg="6"></CCol>
                </CRow>
                <div className="empty-sm"></div>
                <hr/>
                <div className="emptysm"></div>
                <CRow>
                    <CCol xs="12" lg="3">
                        Contact :
                    </CCol>
                    <CCol xs="12" lg="9">
                        +91 8600 240 516
                    </CCol>
                </CRow>
                <div className="empty-sm"></div>
                <CRow>
                    <CCol xs="12" lg="3">
                        Address :
                    </CCol>
                    <CCol xs="12" lg="9">
                        123 Layout, near something, somewhere
                    </CCol>
                </CRow>
                <div className="empty-sm"></div>
                <CRow>
                    <CCol>
                      <CSwitch className={'mx-1 floatRight'} variant={'3d'} id='PActive' color={'success'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
                    </CCol>
                </CRow>
                <div className="empty-sm"></div>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <Link to="/view/Employee">
            <CButton color="primary" onClick={() => setLarge(!large)}>View / Update Details</CButton>
          </Link>
          {' '}
          <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Employee

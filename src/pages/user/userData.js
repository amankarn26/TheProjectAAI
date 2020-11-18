import React, {useState} from 'react'
// import { Link } from 'react-router-dom'
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

import employeeData from '../api/user/user'

import mobileIcon from '../../includes/imgs/svg/mobile.svg'



//normal start

const fields = [
    'name', 
    {
        key: 'Join',
        label: 'Acc Created'
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
                Application User are listed here.
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
          <CModalTitle>User Detail</CModalTitle>
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
                        <b>Account Creation Date:</b> 1998/01/01
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
                        Email :
                    </CCol>
                    <CCol xs="12" lg="9">
                        Chetan@gmail.com
                    </CCol>
                </CRow>
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
          <CButton color="secondary" onClick={() => setLarge(!large)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Employee

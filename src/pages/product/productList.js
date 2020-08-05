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

import productData from '../api/product/allProduct'

import mobileIcon from '../../includes/imgs/svg/mobile.svg'



//normal start

const TrimDescription = description => {
    if(description.length > 25) return description.substring(0,25)
    return description
}

const fields = [
    'name', 
    'amount', 
    'description', 
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

const Product = () => {

  
  const [large, setLarge] = useState(false)


  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
                All Product are listed here.
            </CCardHeader>
            <CCardBody>
            <CDataTable
                items={productData}
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
                    'description':
                        item => (
                            <td>
                                {TrimDescription(item.description)}...
                            </td>
                        )
                    ,
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
          <CModalTitle>Product Detail</CModalTitle>
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
                <h1>Quintin Roti</h1>
                <div className="empty-md"></div>
                <CRow>
                    <CCol xs="12" lg="6">
                        <b>240</b> Rs / Payli
                    </CCol>
                    <CCol xs="12" lg="6"></CCol>
                </CRow>
                <div className="empty-md"></div>
                <hr/>
                <div className="empty-md"></div>
                <CRow>
                    <CCol xs="12" lg="3">
                        Description :
                    </CCol>
                    <CCol xs="12" lg="9">
                        This Food is fibulas for 2 person per payali. We encourage you prefer this.
                    </CCol>
                </CRow>
                <div className="empty-md"></div>
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
          <Link to="/view/product">
            <CButton color="primary" onClick={() => setLarge(!large)}>Edit</CButton>
          </Link>
          {' '}
          <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Product

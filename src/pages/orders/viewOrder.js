import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CImg,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody
} from '@coreui/react'

import getData from '../api/orders/retrieveOrder'

import mobileIcon from '../../includes/imgs/svg/mobile.svg'



const cartData = getData.map(data => {
    
    let newData = data

    let total = parseInt(data.amount) * parseInt(data.quantity)
    newData.total = total

    newData.amount = data.amount + " Rs"
    newData.total = newData.total + " Rs"

    
    return newData
})

const fields = ['name','amount', 'quantity', 'total']

const Tables = () => {

    

    // For Toast

    const [toasts, setToasts] = useState([])
    const [heading, setHeading] = useState('Information')
    const [details, setDetails] = useState('Information')

    const toastRequest = () => {
        setHeading('Received Request')
        setDetails('Request Approved on 2020/06/12.')
        addToast()
    }

    const toastPayment = () => {
        setHeading('Payment Request')
        setDetails('Payment was not done by the user.')
        addToast()
    }
    
    
    const addToast = () => {
        let closeButton = true, fade =true
        setToasts([
        ...toasts, 
        { position: "top-left", autohide: 6000 , closeButton, fade }
        ])
    }

    let toasters = (()=>{
        return toasts.reduce((toasters, toast) => {
        toasters[toast.position] = toasters[toast.position] || []
        toasters[toast.position].push(toast)
        return toasters
        }, {})
    })();


    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Overview of the order
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs="12" lg="5">
                                    <CImg 
                                        src={mobileIcon}
                                        fluidGrow
                                        className="leftImageOrderView"
                                    />
                                </CCol>
                                <CCol xs="12" lg="7">
                                    <h1>Amankumar Karn</h1>
                                    <CRow>
                                        <CCol xs="12" lg="6">
                                            aman@softwiders.com
                                        </CCol>
                                        <CCol xs="12" lg="6">
                                            +91 8600 240 516
                                        </CCol>
                                    </CRow>
                                    <hr/>
                                    <CRow>
                                        <CCol xs="12" lg="3">
                                            Delivery Type :
                                        </CCol>
                                        <CCol xs="12" lg="9">
                                            Self Pickup
                                        </CCol>
                                    </CRow>
                                    <div className="empty-sm"></div>
                                    <CRow>
                                        <CCol xs="12" lg="3">
                                            Location :
                                        </CCol>
                                        <CCol xs="12" lg="9">
                                            Hiragana
                                        </CCol>
                                    </CRow>
                                    <div className="empty-sm"></div>
                                    <CRow>
                                        <CCol xs="12" lg="3">
                                            Address :
                                        </CCol>
                                        <CCol xs="12" lg="9">
                                            Near Ycc College, hiragana, Nagpur
                                        </CCol>
                                    </CRow>
                                    <div className="empty-sm"></div>
                                    <CRow>
                                        <CCol xs="12" lg="3">
                                            Order Date :
                                        </CCol>
                                        <CCol xs="12" lg="9">
                                            2018/06/05 13:45:00
                                        </CCol>
                                    </CRow>
                                    <div className="empty-xl"></div>
                                    <CRow>
                                        <CCol xs="12" lg="3"></CCol>
                                        <CCol xs="12" lg="3">
                                            <CButton block shape="pill" size="sm" onClick={toastRequest} color="success" className="">Request Approved</CButton>
                                        </CCol>
                                        <CCol xs="12" lg="3">
                                            <CButton block shape="pill" size="sm" onClick={toastPayment} color="primary" className="">Payment Pending</CButton>
                                        </CCol>
                                        <CCol xs="12" lg="3">
                                            <CButton block shape="pill" size="sm" onClick={toastPayment} color="primary" className="">Cart InProcess</CButton>
                                        </CCol>
                                    </CRow>
                                    <div className="empty-md"></div>
                                    <hr/>
                                    <CRow>
                                        <CCol className="textCenter">
                                            <h2>Order Amount <b>6500</b> Rs.</h2>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                <CCard>
                    <CCardHeader>
                        Product Present in the cart
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                        items={cartData}
                        fields={fields}
                        />
                        <div className="empty-md"></div>
                        <CButton block shape="pill" color="success" className="">Remind for Payment</CButton>
                    </CCardBody>
                </CCard>
                </CCol>
            </CRow>

            {Object.keys(toasters).map((toasterKey) => (
                <CToaster
                position={toasterKey}
                key={'toaster' + toasterKey}
                >
                {
                toasters[toasterKey].map((toast, key)=>{
                    return(
                    <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={toast.autohide}
                        fade={toast.fade}
                    >
                        <CToastHeader closeButton={toast.closeButton}>
                            {heading}
                        </CToastHeader>
                        <CToastBody>
                            {details}
                        </CToastBody>
                    </CToast>
                    )
                })
                }
                </CToaster>
            ))}
        </>
    )
}

export default Tables

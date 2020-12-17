import React, { useState , useEffect} from 'react'
import { Redirect } from 'react-router-dom'
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
  CToastBody,
  CSpinner
} from '@coreui/react'

import mobileIcon from '../../includes/imgs/svg/mobile.svg'
import Axios from 'axios'



const fields = ['name','price', 'quantity', 'total']

const Tables = (props) => {

    

    // For Toast

    const [toasts, setToasts] = useState([])
    const [heading, setHeading] = useState('Information')
    const [details, setDetails] = useState('Information')

    // For Products

    const [CName, setCName] = useState("Aman Karn")
    const [CEmail, setCEmail] = useState("aman@softwiders.com")
    const [CPhone, setCPhone] = useState("+91 8600240516")
    const [DType, setDType] = useState("Self Pickup")
    const [CAddress, setCAddress] = useState("Near Ycc College, hiragana, Nagpur")
    const [ODate, setODate] = useState("2018/06/05 13:45:00")
    const [OAmount, setOAmount] = useState("2018")
    const [OStatus, setOStatus] = useState("Hold")
    const [OPayment, setOPayment] = useState("Incomplete")

    // For Cart

    const [ReceivedCart, setReceivedCart] = useState([])


    // For Flag

    const [isStay, setisStay] = useState(true)
    const [isLoaded, setisLoaded] = useState(false)

    const toastRequest = () => {
        setHeading('Received Request')
        setDetails('Please go to the bottom for any actions')
        addToast()
    }


    useEffect(() => {
        let getId = props.location.YeID

        if (getId > 0)
            fatchData(getId)    
        else 
            setisStay(false)

        // eslint-disable-next-line
    }, []) 


    const fatchData = getId => {
        let query = "https://coreapi.aaitheantiquebake.com/order/getAllData/" + getId
        Axios.get(query)
          .then(response => {
            console.log(response.data);
            setData(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    }

    const setData = data => {
        let products = data.products
        let cart = data.cart_data
        console.log(cart);

        // set product Data
        setCName(products[0].name)
        setCEmail(products[0].email)
        setCPhone(products[0].number)
        setDType(products[0].Delivery_Type)
        setCAddress(products[0].address)
        setODate(products[0].created)
        setOAmount(products[0].Amount)
        setOStatus(products[0].Status)
        setOPayment(products[0].Payment_Status)

        setReceivedCart(cart)

        setisLoaded(true)
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


    const getButtonOne = status => {
        if (status === "Hold") {
            return <CButton block shape="pill" size="sm" onClick={toastRequest} color="primary" className="">Request Pending</CButton>
        } else {
            return <CButton block shape="pill" size="sm" onClick={toastRequest} color="success" className="">Request Approved</CButton>
        }
    }

    const getButtonTwo = status => {
        if (status === "incomplete") {
            return <CButton block shape="pill" size="sm" onClick={toastRequest} color="primary" className="">Payment Pending</CButton>
        } else {
            return <CButton block shape="pill" size="sm" onClick={toastRequest} color="success" className="">Payment Down</CButton>
        }
    }

    const getButtonThree = status => {
        if (status === "Delivered") {
            return <CButton block shape="pill" size="sm" onClick={toastRequest} color="success" className="">Cart Completed</CButton>
        } 
        else if (status === "Inactive") {
            return <CButton block shape="pill" size="sm" onClick={toastRequest} color="success" className="">Cart Rejected</CButton>
        }
        else {
            return <CButton block shape="pill" size="sm" onClick={toastRequest} color="primary" className="">Cart InProcess</CButton>
        }
    }

    const actionButton = (status, payment) => {
        if (DType === "Self Pickup") {
            if (status === "Hold") {
                return <CButton block shape="pill" onClick={handleHoldAccept} color="primary" className="">Accept this request</CButton>
            } else {
                if (status === "Preparing") {
                    return <CButton block shape="pill" color="success" className="">Tell User To Come...</CButton>
                } else {
                    if (status === "Delivered" || status === "Inactive") {
                        return <CButton block shape="pill" color="success" className="">All Done</CButton>
                    } else {
                        return <CButton block shape="pill" color="primary" className="">Remind user Again</CButton>
                    }
                }
            }
        } else {
            if (status === "Hold") {
                return <CButton block shape="pill" onClick={handleHoldAccept} color="primary" className="">Accept this request</CButton>
            } else {
                if (payment === "incomplete") {
                    return <CButton block shape="pill" color="success" className="">Remind for Payment</CButton>
                } else {
                    if (status === "Delivered" || status === "Inactive") {
                        return <CButton block shape="pill" color="success" className="">All Done</CButton>
                    } else {
                        return <CButton block shape="pill" color="primary" className="">Assign Delivery Boy</CButton>
                    }
                }
            }
        }
        
    }

    const handleHoldAccept = () => {
        setisLoaded(false)

        let getId = props.location.YeID        
        let query = "https://coreapi.aaitheantiquebake.com/order/" + getId

        if (DType === "Self Pickup") {
            Axios.patch(query, {
                Payment_Status : "complete",
                Status : "preparing"
            })
              .then(response => {
                console.log(response);
                if (getId > 0)
                    fatchData(getId)    
                else 
                    setisStay(false)
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
        } else {
            Axios.patch(query, {
                Status : "pending"
            })
              .then(response => {
                console.log(response);
                if (getId > 0)
                    fatchData(getId)    
                else 
                    setisStay(false)
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
        }

    }

    if (isStay) {
        if (isLoaded) {
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
                                            <h1>{CName}</h1>
                                            <CRow>
                                                <CCol xs="12" lg="6">
                                                    {CEmail}
                                                </CCol>
                                                <CCol xs="12" lg="6">
                                                    {CPhone}
                                                </CCol>
                                            </CRow>
                                            <hr/>
                                            <CRow>
                                                <CCol xs="12" lg="3">
                                                    Delivery Type :
                                                </CCol>
                                                <CCol xs="12" lg="9">
                                                    {DType}
                                                </CCol>
                                            </CRow>
                                            <div className="empty-sm"></div>
                                            <CRow>
                                                <CCol xs="12" lg="3">
                                                    Delivery person :
                                                </CCol>
                                                <CCol xs="12" lg="9">
                                                    Krishna Boy
                                                </CCol>
                                            </CRow>
                                            <div className="empty-sm"></div>
                                            <CRow>
                                                <CCol xs="12" lg="3">
                                                    Address :
                                                </CCol>
                                                <CCol xs="12" lg="9">
                                                    {CAddress}
                                                </CCol>
                                            </CRow>
                                            <div className="empty-sm"></div>
                                            <CRow>
                                                <CCol xs="12" lg="3">
                                                    Order Date :
                                                </CCol>
                                                <CCol xs="12" lg="9">
                                                    {ODate}
                                                </CCol>
                                            </CRow>
                                            <div className="empty-xl"></div>
                                            <CRow>
                                                <CCol xs="12" lg="3"></CCol>
                                                <CCol xs="12" lg="3">
                                                    {getButtonOne(OStatus)}
                                                </CCol>
                                                <CCol xs="12" lg="3">
                                                    {getButtonTwo(OPayment)}
                                                </CCol>
                                                <CCol xs="12" lg="3">
                                                    {getButtonThree(OStatus)}
                                                </CCol>
                                            </CRow>
                                            <div className="empty-md"></div>
                                            <hr/>
                                            <CRow>
                                                <CCol className="textCenter">
                                                    <h2>Order Amount <b>{OAmount}</b> Rs.</h2>
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
                                items={ReceivedCart}
                                fields={fields}
                                scopedSlots = {{
                                    'price':
                                        item => (
                                            <td>
                                                {item.price} Rs
                                            </td>
                                        )
                                    ,
                                    'quantity':
                                        item => (
                                            <td>
                                                {item.qty}
                                            </td>
                                        )
                                    ,
                                    'total':
                                        item => (
                                            <td>
                                                {item.price * item.qty} Rs
                                            </td>
                                        )
                                }}
                                />
                                <div className="empty-md"></div>
                                {actionButton(OStatus, OPayment)}
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
        } else {
            return (
                <>
                  <CRow>
                    <CCol>
                      <CCard>
                        <CCardHeader>
                            Overview of the order
                        </CCardHeader>
                        <CCardBody>
                          <center>
                            <CSpinner
                              color="primary"
                              style={{width:'4rem', height:'4rem'}}
                            />
                          </center>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </>
            )
        }
    } else {
        return (<Redirect to="/regular" />)
    }

    
}

export default Tables

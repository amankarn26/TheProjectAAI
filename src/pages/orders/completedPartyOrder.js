import React, { useState , useEffect} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CBadge,
  CSpinner,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CImg,
  CSwitch
} from '@coreui/react'

import Axios from 'axios'


import mobileIcon from '../../includes/imgs/svg/mobile.svg'



//normal start


const getSwitch = (status, handleChange) => {
    if (status === 'active') return <CSwitch className={'mx-1 floatRight'} name="selectStatus" onChange={handleChange} variant={'3d'} id='PActive' color={'success'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'}/>
    else return <CSwitch className={'mx-1 floatRight'} variant={'3d'} id='PActive' name="selectStatus" onChange={handleChange} color={'success'} labelOn={'\u2713'} labelOff={'\u2715'}/>
}


const getBadge = status => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'primary'
      default: return 'warning'
    }
  }
  
  const getApproval = status => {
      switch (status) {
        case 'active': return 'Open'
        case 'inactive': return 'Closed'
          default: return 'Unusual Data'
      }
  }

const TrimAddress = address => {
    if(address.length > 25) return address.substring(0,25) + "......."
    return address
}

const TrimDate = data => {
    return data.substring(0,10)
}

const TrimTime = data => {
    return data.substring(11,19)
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
    'address', 
    'number', 
    {
        key: 'created',
        label: 'Req. Date'
    },
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

const Tables = () => {
    

    const [isLoaded, setisLoaded] = useState(false)
    const [large, setLarge] = useState(false)
    const [CData, setCData] = useState([])

    // for model
    const [MId, setMId] = useState("1")
    const [Mname, setMName] = useState("Chetan Mohamed")
    const [Mphone, setMPhone] = useState("8600240516")
    const [MAddress, setMAddress] = useState("Somewhare")
    const [MCreated, setMCreated] = useState("2020-12-11")
    const [MStatus, setMStatus] = useState("active")




    useEffect(() => {

        fatchdata()
          
        // eslint-disable-next-line
    }, []) 

    const fatchdata = () => {
        let query = "https://coreapi.aaitheantiquebake.com/order/party"
        Axios.get(query)
          .then(response => {
            console.log(response.data.cart)
            setCData(response.data.cart)
            setisLoaded(true)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    }

    const openModel = (id, openFlag, name, phone, address, created, status) => {

        setMId(id)
        setMName(name)
        setMPhone(phone)
        setMAddress(address)
        setMStatus(status)

        let dateCreation = TrimDate(created) + "  (  " + TrimTime(created) + "  )"
        setMCreated(dateCreation)

        setLarge(openFlag)
    }

    const handleChange = event => {
        // alert("aman" + MId)
        let currState = "active"

        if (MStatus === "active") {
            setMStatus("inactive")
            currState = "inactive"
        } else {
            setMStatus("active")
            currState = "active"
        }

        let url = "https://coreapi.aaitheantiquebake.com/order/party/" + MId

        Axios.patch(url, {
            status: currState
          })
          .then(response => {
            fatchdata()
          })
          .catch(function (error) {
            alert(error);
          });
    }

      

    if (isLoaded) {
        return (
            <>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                        Party Order list
                    </CCardHeader>
                    <CCardBody>
                    <CDataTable
                        items={CData}
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
                                        {TrimAddress(item.address)}
                                    </td>
                                )
                            ,
                            'created':
                                item => (
                                    <td>
                                        {TrimDate(item.created)}
                                    </td>
                                )
                            ,
                            'status':
                                item => (
                                    <td>
                                        <CBadge color={getBadge(item.status)}>
                                            {getApproval(item.status)}
                                        </CBadge>
                                    </td>
                                )
                            ,
                            'action':
                                item=> (
                                    <td>
                                        <CButton block shape="pill" onClick={() => openModel(item.id,!large, item.name, item.number, item.address, item.created, item.status)} size="sm" color="primary" className="">View</CButton>
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
                            <h1>{Mname}</h1>
                            <div className="empty-md"></div>
                            <CRow>
                                <CCol xs="12" lg="6">
                                    <b>Account Creation Date:</b><br/> {MCreated}
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
                                    +91 {Mphone}
                                </CCol>
                            </CRow>
                            <div className="empty-sm"></div>
                            <CRow>
                                <CCol xs="12" lg="3">
                                    Address :
                                </CCol>
                                <CCol xs="12" lg="9">
                                    {MAddress}
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    {getSwitch(MStatus, handleChange)}
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
    } else {
        return (
            <>
            <CRow>
                <CCol>
                <CCard>
                    <CCardHeader>
                        Downloading Data
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

}

export default Tables

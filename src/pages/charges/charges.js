import React, {useState, useEffect} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse,
  CInput,
  CSpinner
} from '@coreui/react'

import Axios from 'axios'


const fields = [
  'name', 
  'Price', 
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

const limitRs = price => {
  if (price === 500) {
    return "Less"
  } else {
    return "More"
  }
}

const Tables = () => {

  const [details, setDetails] = useState([])
  const [CData, setCData] = useState([])
  const [isLoaded, setisLoaded] = useState(false)
  const [getPrice, newPrice] = useState()

  
  useEffect(() => {

      fatchdata()
        
      // eslint-disable-next-line
  }, []) 

  const handleChange = event => {
    const target = event.target;
    const value = target.value;

    newPrice(value)
  }

  const handleSubmit = event => {

    if (getPrice === undefined || getPrice === "") {
      alert("Please Enter new Price to update")
    } else {
      setisLoaded(false)

      const getId = event.target.name

      let url = "https://coreapi.aaitheantiquebake.com/delivery/charges/" + getId

      Axios.patch(url, {
        price: getPrice
      })
      .then(response => {
        fatchdata()
      })
      .catch(function (error) {
        alert(error);
      });
    }

  }

  const fatchdata = () => {
      let query = "https://coreapi.aaitheantiquebake.com/delivery/all"
      Axios.get(query)
        .then(response => {
          console.log(response.data.data)
          setCData(response.data.data)
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


  if (isLoaded) {
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
                items={CData}
                fields={fields}
                tableFilter={FilterProps}
                footer
                hover
                sorter
                scopedSlots = {{
                  'name':
                      (item)=>(
                          <td>
                            Upto {item.Limit_distance} Km / {limitRs(item.Limit_RS)} then 500Rs
                          </td>
                  ),
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
                                Upto {item.Limit_distance} Km / {limitRs(item.Limit_RS)} then 500Rs
                              </h4>
                              <p className="text-muted">Current Price: {item.Price}</p>
                              <CRow>
                                  <CCol xs="12" lg="6">
                                      <CInput
                                          type="number"
                                          id="newPrice"
                                          size="sm"
                                          name="newPrice"
                                          placeholder="Enter New Price.."
                                          onChange={handleChange}
                                          autoComplete="false"
                                      />
                                  </CCol>
                                  <CCol xs="12" lg="6">
                                      <CButton size="sm" color="danger" name={item.id} onClick={handleSubmit} className="ml-1">
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

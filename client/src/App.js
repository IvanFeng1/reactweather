import React, { Fragment, useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'


export default function App() {
  const [city, setCity] = useState("Ottawa")
  const [weatherData, setWeaData] = useState()
  function getCity(city) {
    /* (string) -> None
    function that will be binded to this state and will change the state's city depending on the input */
    setCity(city)
  }
  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await fetch(`/api/`)
        var data = await result.json()
        console.log(data)
        if (data.cod === '404') {
          alert("city not found")
        }
        else if (data.cod === '429') {
          alert('too many requests')
        }
        else {
          setWeaData(data)
        }
      } catch (err) {
        alert(err)

      }
      trackPromise(
        fetchData()
      )
    }
  }, [city])

  function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker()
    return (
      promiseInProgress &&
      <Fragment>
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loader type="ThreeDots" color="#5a5a5a" height="100" width="100" />
        </div></Fragment>
    )
  }
  return (
    <Fragment>
      {LoadingIndicator()}
    </Fragment>
  );
}


import React, { useState, useEffect, Fragment } from "react";
import 'antd/dist/antd.css';
import Forcast from "./components/Forcast.js"
import Homescreen from "./components/Homescreen.js"
import Header from './components/Header.js'
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { Row, Col } from 'antd'
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
        const response = await fetch(`/api/${city}`)
        // for some reason, fetching from heroku is weird so I add this to make sure it fetchs the weather data and then parse it into json
        var data = await response.text()
        data = data.replace(/\\/g, '');
        if (data[0] == "\"" && data[data.length - 1] == "\"") {
          data = data.substring(1, data.length - 1)
        }
        data = await JSON.parse(data)
        //////

        setWeaData(data)
      } catch (err) {
        alert(err)
      }
    }
    trackPromise(
      fetchData()
    )
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
    <div className="mainContainer">
      <Header />
      <Row >
        {LoadingIndicator()}
      </Row>
      <Row>
        <Col>
          <Homescreen enterCity={getCity} />
        </Col>
      </Row>
      <Row type="flex" justify="end">
        <Col>
          <Forcast targetCity={weatherData} />
        </Col>
      </Row>
    </div>
  );
}


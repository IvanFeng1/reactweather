import React, { Fragment } from 'react'
import { defaultData } from './default.js'
import 'antd/dist/antd.css';
import arr from './imageIndex.js'
import { Row, Col } from 'antd';
import './Forcast.css'
function Forcast({ targetCity }) {

    //////////////////////////////// this is to make sure app doesnt crash when it intially renders
    var rawData
    var cityName
    if (targetCity !== undefined) {
        rawData = targetCity.list
        cityName = targetCity.city.name
    } else {
        rawData = defaultData.list
        cityName = defaultData.city.name
    }

    ////////////////////////////////

    function returnRawDate(obj) {
        /* (object) -> object
        made specificially for the json output for the openweather api. Takes in a object with weather information from the api and outputs its date in type Date */
        let unix_timestamp = obj["dt"]
        let date = new Date()
        date.setTime(unix_timestamp * 1000)
        return date
    }

    function returnDate(date) {
        /*
        (string) -> Object
        takes in a string and outputs it as a object with attributes weekday,date,month and year
        */

        const d = returnRawDate(date)
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var date_object = {
            weekday: weekDays[d.getDay()],
            date: d.getDate(),
            month: months[d.getMonth()],
            year: d.getFullYear()
        };
        return date_object
    }

    function displayCurrentDay() {
        /* (None) -> None
        displays weather condition image, full date, and temperature for the weather forcast for current day */
        let date_object = returnDate(rawData[0])
        console.log(date_object)
        let condition = rawData[0]['weather'][0]['description']
        condition = condition[0].toUpperCase() + condition.slice(1)
        let imageSrc = rawData[0]['weather'][0]['icon']
        let temp = rawData[0].main.temp - 273.15
        temp = Math.round(temp * 100) / 100
        temp = temp.toString() + '°C'
        return (
            <div>
                <Row  >
                    <Col span={3} >
                        <div className="cityname">{cityName}</div>
                    </Col>
                </Row>

                <Row  >
                    <Col span={5} >
                        <img src={arr[imageSrc]} />
                    </Col>
                </Row>

                <Row  >
                    <Col span={3} >
                        <div className="current">{date_object.weekday}, {date_object.date} {date_object.month}</div>
                    </Col>
                </Row>

                <Row  >
                    <Col span={3} >
                        <div className="current">{condition}</div>
                    </Col>
                </Row>

                <Row>
                    <Col span={3} >
                        <div className="current">{temp}</div>
                    </Col>
                </Row>

            </div>
        )
    }

    function returnFuture5() {
        /* None -> Array of two Arrays of objects
        goes through the raw json from api and adds the date object and the rawData object of of the next five days. (each unique day is added to the array once) */
        var weekdayArr = []
        var obj_arr = [[], []] //first array is for dates, second array is for rawData objects
        for (var i = 0; i < rawData.length; i++) {
            let dateObj = returnDate(rawData[i])
            if (weekdayArr.includes(dateObj.weekday) === false) {
                // weekdayArr.push(rawData[i])
                weekdayArr.push(dateObj.weekday) // this is to make sure I am adding weather objects of each weekday once
                obj_arr[1].push(rawData[i])
                obj_arr[0].push(dateObj)
            }
        }
        obj_arr[0] = obj_arr[0].slice(1)
        obj_arr[1] = obj_arr[1].slice(1)
        return obj_arr
    }

    function displayFuture5() {
        var fiveDayForcast = returnFuture5()
        var weekdays = []
        var icons = []
        var temperature = []
        for (var i = 0; i < fiveDayForcast[0].length; i++) {
            // output.push(<Col span={3}><div>{fiveDayForcast[0].weekday}</div></Col>)
            let imageSrc = fiveDayForcast[1][i]['weather'][0]['icon']
            let temp = fiveDayForcast[1][i].main.temp - 273.15
            temp = Math.round(temp * 100) / 100
            temp = temp.toString() + '°C'
            weekdays.push(<Col span={3}><div>{fiveDayForcast[0][i].weekday}</div></Col>)
            icons.push(<Col span={3}><img src={arr[imageSrc]} /></Col>)
            temperature.push(<Col span={3}><div>{temp}</div></Col>)
        }
        return (
            <div className="fiveDayForcast">
                <Row gutter={19}>
                    {weekdays}
                </Row>
                <Row gutter={19}>
                    {icons}
                </Row>
                <Row gutter={19}>
                    {temperature}
                </Row>
            </div>
        )
    }


    return (
        <div className="main" style={{ align: 'right' }}>
            {displayCurrentDay()}
            {displayFuture5()}

        </div>
    );

}

export default Forcast
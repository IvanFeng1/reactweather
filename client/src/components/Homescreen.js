import React, { useState, Fragment } from "react";
import 'antd/dist/antd.css';
import useForm from 'react-hook-form'
import { leafCities } from './leafCities.js'
import { AutoComplete, Input } from 'antd'

const { Search } = Input

function Homescreen(props) {

    const [city, setCity] = useState()
    function getCity(city) {
        /* (string) -> None
        takes in city input from user and calls getCity in App.js to pass city data to App.js */
        props.enterCity(city)
    }

    function handleSearch(inputValue, option) {
        /* (string,event) => None
        matches option in leafCities array to input by checking if the option starts with the input string
        */
        var x = new RegExp(`^${inputValue}`, 'i')
        /*results =leafCities.map(c => x.test(c)) */
        return x.test(option.props.children)


    }
    // storing value from user input is done 
    // still need to do autocomplete feature
    return (
        <Fragment>
            <br />
            <AutoComplete dataSource={leafCities} size="large" placeholder="Enter city" filterOption={handleSearch} style={{ width: '30%' }}>
                <Search enterButton="Search" size="large" onSearch={value => getCity(value)} onPressEnter={(e) => e} />
            </AutoComplete>
        </Fragment>

    );

}

export default Homescreen
















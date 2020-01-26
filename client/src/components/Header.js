import React, { Fragment } from "react";
import 'antd/dist/antd.css';
import { PageHeader } from 'antd'
function Header(props) {
    return (
        <Fragment >

            <PageHeader style={{
                border: '1px solid rgb(235, 237, 240)',

            }}
                title="Weather" subtitle="subtitle" />
        </Fragment>
    );
}

export default Header
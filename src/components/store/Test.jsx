/* store
배다원 
2024 10 30
*/

import React, { useEffect, useState, useRef, Outlet } from 'react';
import { Link } from "react-router-dom";
// nodejs library that concatenates classes

//nav 테스트
import Banner from "./Banner";
import Banner_mini from "./Banner_mini";
import img from "../../assets/img/theme/img-1-1200x1000.jpg";

import {
    Button,
    Card,
    CardImg,
    ButtonGroup,
    CardBody,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Badge,

} from "reactstrap";




function Page() {

    return (
        <>
            <Banner />
            <Banner_mini />
            
        </>
    );

}

export default Page;



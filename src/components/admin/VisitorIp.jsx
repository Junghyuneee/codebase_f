/*
김은지
2024 11 11
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VisitorIp() {
    const [ip, setIp] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/dashboard/visitor/get-ip')
            .then(response => {
                setIp(response.data.ip);
                console.log(ip)
            })
            .catch(error => {
                console.error('IP 주소 저장 에러:', error);
            });
    }, []);
}

export default VisitorIp;

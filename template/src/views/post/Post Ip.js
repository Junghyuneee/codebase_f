// src/views/post/PostIP.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostIp() {
    const [ip, setIp] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-ip')
            .then(response => {
                setIp(response.data.ip);
            })
            .catch(error => {
                console.error('IP 주소 저장 에러:', error);
            });
    }, []);

    // IP 주소가 업데이트될 때마다 로그 출력
    useEffect(() => {
        if (ip) {
            console.log('가져온 IP 주소:', ip);
        }
    }, [ip]);

    return (
        <div>
            <h1>IP 주소</h1>
            <p>{ip ? ip : 'IP 주소를 가져오는 중...'}</p>
        </div>
    );
}

export default PostIp;

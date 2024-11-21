// src/views/post/PostIp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/get-ip'; // API URL 상수화

function PostIp() {
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchIp = async () => {
            try {
                const response = await axios.get(API_URL);
                setIp(response.data.ip);
            } catch (error) {
                console.error('IP 주소 저장 에러:', error);
                setError('IP 주소를 가져오는 데 실패했습니다.'); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchIp();
    }, []);

    // IP 주소가 업데이트될 때마다 로그 출력
    useEffect(() => {
        if (ip) {
            console.log('가져온 IP 주소:', ip);
        }
    }, [ip]);

    if (loading) {
        return <p>IP 주소를 가져오는 중...</p>; // 로딩 중 메시지
    }

    return (
        <div>
            <h1>IP 주소</h1>
            {error ? <p>{error}</p> : <p>{ip}</p>} {/* 에러 메시지 표시 */}
        </div>
    );
}

export default PostIp;

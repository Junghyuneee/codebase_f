/* store
배다원 
2024 10 30
*/


import React, { useEffect, useState, useRef, Outlet } from 'react';


import apiClient from '@/api/apiClient';



function GetProject() {
    //토큰 사용 테스트
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        apiClient.get('http://localhost:8080/api/store')
            .then((response) => {
                setProjects(response.data); // 응답 데이터 설정
            })
            .catch((error) => {
                console.error('API 호출 에러:', error);
            });
    }, []);


    return projects;
}




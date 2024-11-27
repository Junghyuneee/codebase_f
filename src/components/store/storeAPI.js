import React, { useEffect, useState } from 'react';
import apiClient from "@/api/apiClient.js";

export function getData(url){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get(url); // API 호출
                //console.log('Response Headers: ', response.config.headers); // 요청한 헤더 출력
                //console.log('Response data: ', response.data); //응답의 데이터 출력
                setData(response.data); // 데이터 상태 업데이트
            } catch (err) {
                setError(err); // 에러 상태 업데이트
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchProjects(); // 함수 호출
    }, [url]);

    return data; // 상태 반환
}
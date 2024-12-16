
import { useState, useEffect } from 'react';
import axios from 'axios';

import apiClient from "@/api/apiClient.js";

// 커스텀 훅 만들기
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(url);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

//export default useFetch;

export function getData(url) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get(url); // API 호출
                //console.log('Response Headers: ', response.config.headers); // 요청한 헤더 출력
                console.log('Response data: ', response.data); //응답의 데이터 출력
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

// export function postData(url, data){

//     const sendToBackend = async () => {
//         //console.log(data);
//         try {
//           const response = await apiClient.post(
//             url,
//             data
//           );
//           console.log("Response:", response.data);
          
//         } catch (error) {
//           console.error("Error posting data:", error);
//         }
//     };
    
//     sendToBackend();

//} 

export async function postData(url, data){

    try {
        const response = await apiClient.post(url, data);
        console.log("Response:", response.data);
        return response.data; // 서버의 응답 데이터 반환
    } catch (error) {
        console.error("Error posting data:", error);
        throw error; // 에러를 호출하는 쪽으로 전달
    }

} 
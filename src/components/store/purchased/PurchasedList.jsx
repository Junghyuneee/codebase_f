import React, { useEffect, useState, useRef, Outlet } from "react";

import { useFetch } from "@/components/store/storeAPI";
import { getMemberId } from "@/api/auth/getset.js";
import apiClient from "@/api/apiClient";

function Page() {
  //const [data, setData] = useState([]);

  // const { data, loading, error } = useFetch(
  //   `/api/store/projectorder/myproject/${getMemberId()}`
  // );
  const { data, loading, error } = useFetch(
    `/api/store/projectorder/myproject`
  );

  //   // 데이터를 가져오는 함수 정의
  //   const fetchData = async () => {
  //     try {
  //       const response = await apiClient.get(`/api/store/projectorder/myproject`);
  //       setData(response.data); // 데이터를 상태에 저장
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       alert("데이터를 가져오는데 실패했습니다.");
  //     }
  //   };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  //   useEffect(() => {
  //     fetchData();
  //   }, []); // 빈 배열로 두면 최초 1회 실행

  // data가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);



  return (
    <>
      <section className="section section-lg section-shaped my-0">
        {/* Circles background */}
        <div className="shape shape-style-1 shape-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* SVG separator */}
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>

      <h1>My Projects</h1>
      {data ? (
        <div>{JSON.stringify(data)}</div> // 데이터를 화면에 표시 (예시)
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Page;

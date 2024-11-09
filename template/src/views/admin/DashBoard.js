/*
김은지
2024 11 08
*/
import React, {useEffect, useRef} from "react";
import { Row, Col } from "reactstrap";
import Chart from "chart.js";

function DashBoardContent() {
    return (
        <Row>
            <Col>
                <h3 className="h4 text-success text-center font-weight-bold mb-4" to="/admin"></h3>
                <div className="ml-3 mr-3">
                    <Row>
                        <Col className="col mb-4 col-6">
                            <VisitorChart />
                        </Col>
                        <Col className="col mb-4 col-6">
                            <PopularPostsChart />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-4 col-6">
                            <PopularPostsChart />
                        </Col>
                        <Col className="mb-4 col-6">
                            <VisitorChart />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

const VisitorChart = () => {
    const chartRef = useRef(null); // Canvas DOM을 참조하기 위한 ref

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');  // Canvas 컨텍스트 가져오기

        // 차트 데이터
        const data = {
            labels: ['일', '월', '화', '수', '목', '금', '토'],
            datasets: [{
                label: '방문자 수',
                data: [120, 200, 150, 180, 250, 300, 280],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            }]
        };

        // 차트 옵션
        const options = {
            responsive: true,
            scales: {
                x: { title: { display: true, text: '월' }},
                y: { title: { display: true, text: '방문자 수' }}
            }
        };

        // Chart.js 차트 생성
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });

        // 컴포넌트가 언마운트될 때 차트 리소스를 정리
        return () => {
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // 차트 초기화
            }
        };
    }, []);

    return (
        <div className="container mb-3">
            <h2>방문자 수 차트</h2>
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
}

const PopularPostsChart = () => {
    const chartRef = useRef(null);  // Canvas 요소를 참조할 ref

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');  // Canvas 컨텍스트 가져오기

        // 차트 데이터 (예시: 게시글 제목과 해당 게시글의 조회 수)
        const data = {
            labels: ['게시글 1', '게시글 2', '게시글 3', '게시글 4', '게시글 5'],  // 게시글 제목
            datasets: [{
                label: '조회 수',  // 차트에 표시될 데이터의 제목
                data: [250, 420, 320, 530, 640],  // 각 게시글의 조회 수 (데이터)
                backgroundColor: 'rgba(75, 192, 192, 0.6)',  // 막대 색상
                borderColor: 'rgba(75, 192, 192, 1)',  // 막대 테두리 색상
                borderWidth: 1  // 테두리 두께
            }]
        };

        // 차트 옵션
        const options = {
            responsive: true,  // 화면 크기에 맞춰 차트 크기 자동 조정
            scales: {
                x: {
                    beginAtZero: true,  // X축에서 0부터 시작
                    title: {
                        display: true,
                        text: '조회 수'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '게시글'
                    }
                }
            }
        };

        // Chart.js 차트 생성
        new Chart(ctx, {
            type: 'bar',  // 'bar' 차트로 설정 (가로 막대형 차트로 그려짐)
            data: data,
            options: options
        });

        // 컴포넌트가 언마운트될 때 차트 리소스를 정리
        return () => {
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // 차트 초기화
            }
        };
    }, []);

    return (
        <div className="container mb-3">
            <h2>인기 게시글 차트</h2>
            <canvas ref={chartRef} width="400" height="250"></canvas>
        </div>
    );
};

export default DashBoardContent;
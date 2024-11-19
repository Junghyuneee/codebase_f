/*
김은지
2024 11 08
*/
import React, {useEffect, useRef, useState} from "react";
import { Row, Col } from "reactstrap";
import Chart from "chart.js/auto";
import axios from "axios"

function DashBoardContent() {
    return (
        <Row>
            <Col className="p-0 m-4">
                <h3 className="h4 text-success text-center font-weight-bold mb-4" to="/admin"></h3>
                <div className="ml-3 mr-3">
                    <Row>
                        <Col className="mb-4 col-6">
                            <VisitorChart />
                        </Col>
                        <Col className="mb-4 col-6">
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
    const chartRef = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/weekly-visitors')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('방문자수 에러', error);
            });
    }, []);

    useEffect(() => {
        if (data.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            // 기존 차트 정리
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            // 차트 생성
            chartRef.current.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(item => item.visit_date),
                    datasets: [{
                        label: '방문자 수',
                        data: data.map(item => item.visitor_count),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // 필요할 경우 비율을 유지하지 않도록 설정
                    scales: {
                        x: {
                            beginAtZero: true,  // X축에서 0부터 시작
                            title: { display: true, text: '날짜' }
                        },
                        y: {
                            title: { display: true, text: '방문자 수' }
                        }
                    }
                }
            });
        }

        // 컴포넌트 언마운트 시 차트 정리
        return () => {
            if (chartRef.current && chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }
        };
    }, [data]);

    return (
        <div className="container mb-3">
            <h2>방문자 수 차트</h2>
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
};

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
            maintainAspectRatio: true, // 필요할 경우 비율을 유지하지 않도록 설정
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
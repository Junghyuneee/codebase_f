/*
김은지
2024 11 08
*/
import {useEffect, useRef, useState} from "react";
import { Row, Col } from "reactstrap";
import Chart from "chart.js/auto";
import apiClient from "@/api/apiClient.js";

function DashBoardContent() {

    return (
        <Row>
            <Col className="p-0 m-4">
                <h3 className="h4 text-success text-center font-weight-bold mb-4" to="/admin"></h3>
                <div>
                    <Row>
                        <Col className="mb-4 col-6">
                            <VisitorChart />
                        </Col>
                        <Col className="mb-4 col-6">
                            <NewMemberChart />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mb-4 col-6">
                            <PopularProjectsChart />
                        </Col>
                        <Col className="mb-4 col-6">
                            <PopularPostsChart />
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
        apiClient.get('/dashboard/visitor/weekly')
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

const PopularProjectsChart = () => {
    const chartRef = useRef(null);  // Canvas 요소를 참조할 ref
    const [data, setData] = useState([]);

    useEffect(() => {
        apiClient.get('/dashboard/popular/project')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('인기 프로젝트 데이터 에러', error);
            });
    }, []);

    useEffect(() => {
        if (data.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');  // Canvas 컨텍스트 가져오기

            // 기존 차트 정리
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            // 차트 생성
            chartRef.current.chartInstance = new Chart(ctx, {
                type: 'bar',  // 가로 막대형 차트
                data: {
                    labels: data.map(item => item.title),
                    datasets: [{
                        label: '인기 프로젝트',
                        data: data.map(item => item.hits),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',  // 막대 색상
                        borderColor: 'rgba(75, 192, 192, 1)',  // 막대 테두리 색상
                        borderWidth: 1,  // 테두리 두께
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { // 차트 옵션
                    responsive: true,  // 화면 크기에 맞춰 차트 크기 자동 조정
                    maintainAspectRatio: true, // 필요할 경우 비율을 유지하지 않도록 설정
                    scales: {
                        x: {
                            beginAtZero: true,  // X축에서 0부터 시작
                            title: {
                                display: true,
                                text: '제목'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '조회수'
                            }
                        }
                    }
                }
            });

            // 컴포넌트 언마운트 시 차트 정리
            return () => {
                if (chartRef.current && chartRef.current.chartInstance) {
                    chartRef.current.chartInstance.destroy();
                }
            };
        }
    }, [data]);

    return (
        <div className="container mb-3">
            <h2>인기 게시글 차트</h2>
            <canvas ref={chartRef} width="400" height="250"></canvas>
        </div>
    );
};

const NewMemberChart = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        apiClient.get('/dashboard/newMember/weekly')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('신규 회원 수 차트 에러', error);
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
                    labels: data.map(item => item.joinDate),
                    datasets: [{
                        label: '신규 회원 수',
                        data: data.map(item => item.memberCount),
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
                            title: { display: true, text: '신규 회원 수' }
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
            <h2>신규 회원 수 차트</h2>
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
};

const PopularPostsChart = () => {
    const chartRef = useRef(null);  // Canvas 요소를 참조할 ref
    const [data, setData] = useState([]);

    useEffect(() => {
        apiClient.get('/dashboard/popular/post')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('인기 자유게시글 데이터 에러', error);
            });
    }, []);

    useEffect(() => {
        if (data.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');  // Canvas 컨텍스트 가져오기

            // 기존 차트 정리
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            // 차트 생성
            chartRef.current.chartInstance = new Chart(ctx, {
                type: 'bar',  // 가로 막대형 차트
                data: {
                    labels: data.map(item => item.title),
                    datasets: [{
                        label: '인기 자유게시글',
                        data: data.map(item => item.hits),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',  // 막대 색상
                        borderColor: 'rgba(75, 192, 192, 1)',  // 막대 테두리 색상
                        borderWidth: 1,  // 테두리 두께
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { // 차트 옵션
                    responsive: true,  // 화면 크기에 맞춰 차트 크기 자동 조정
                    maintainAspectRatio: true, // 필요할 경우 비율을 유지하지 않도록 설정
                    scales: {
                        x: {
                            beginAtZero: true,  // X축에서 0부터 시작
                            title: {
                                display: true,
                                text: '제목'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '조회수'
                            }
                        }
                    }
                }
            });

            // 컴포넌트 언마운트 시 차트 정리
            return () => {
                if (chartRef.current && chartRef.current.chartInstance) {
                    chartRef.current.chartInstance.destroy();
                }
            };
        }
    }, [data]);

    return (
        <div className="container mb-3">
            <h2>인기 자유게시글 차트</h2>
            <canvas ref={chartRef} width="400" height="250"></canvas>
        </div>
    );
};

export default DashBoardContent;
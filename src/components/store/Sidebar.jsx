import React from 'react';
import { ImUsers } from "react-icons/im";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardImg,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    UncontrolledCarousel
} from "reactstrap";
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };
    return (
        <>
            <div className="fixed-sidebar">
                <div className="circle-container">
                    <div className="circle" onClick={() => handleClick('/store')}>
                        <i className="ni ni-bag-17" />
                        <span className="text">상점 홈</span>
                    </div>
                    <div className="circle" onClick={() => handleClick('/store/cart')}>
                    <i className="ni ni-cart" />
                        <span className="text">장바구니</span>
                    </div>
                    <div className="circle" onClick={() => handleClick('/team')}>
                       
                        <ImUsers />
                        <span className="text">팀 찾기기</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* 오른쪽 고정 영역 스타일 */
                .fixed-sidebar {
                    position: fixed;
                    top: 70px;  /* 상단에서 70px로 변경 (기존 20px + 50px 내려줌) */
                    right: 20px;
                    width: 60px;
                    background-color: transparent;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                /* 원형 컨테이너 */
                .circle-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                /* 원형 스타일 */
                .circle {
                    width: 50px;
                    height: 50px;
                    background-color: #32325d;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    transition: width 0.3s ease, height 0.3s ease; /* 마우스를 올렸을 때 크기 변화 */
                    font-size: 20px;
                    color: white;
                }

                /* 원형에 마우스를 올렸을 때 */
                .circle:hover {
                    width: 80px;  /* 크기 증가 */
                    height: 80px; /* 크기 증가 */
                    font-size: 0px; /* 텍스트 숨기기 */
                }

                /* 텍스트 숨기기 */
                .text {
                    position: absolute;
                    opacity: 0;
                    color: white;
                    font-size: 15px;
                    font-weight: bold;
                    transition: opacity 0.3s ease;
                }

                /* 원형에 마우스를 올렸을 때 텍스트 보이기 */
                .circle:hover .text {
                    opacity: 1;
                }
                

                
            `}</style>
        </>
    );
}

export default SideBar;
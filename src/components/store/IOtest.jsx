import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import {

    Container,

} from "reactstrap";



import Banner from "./Banner_mini";


function ProjectForm() {
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        const formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
        };
        console.log(formData);
        sendToBackend(formData);
    };

    const sendToBackend = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('http://localhost:8080/api/store', data);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const clearForm = () => {
        document.getElementById('contactForm').reset(); // 폼 초기화
    };

    return (
        <>
            <form id="contactForm" onSubmit={handleSubmit}>
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="age">나이:</label>
                <input type="number" id="age" name="age" required />

                <button type="submit">제출</button>
            </form>
        </>
    );
}

function GetProject() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        fetch('http://localhost:8080/api/store')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('데이터를 가져오는데 실패했습니다.');
                }

                return response.json();
            })
            .then((data) => {
                setProjects(data);

            })
            .catch((error) => {
                console.error('API 호출 에러:', error);
            });
    }, []);

    return projects;
}

function getProject(id) {


    const [project, setProject] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        fetch(`http://localhost:8080/api/store/project/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('데이터를 가져오는데 실패했습니다.');
                }

                return response.json();
            })
            .then((data) => {

                setProject(data);

            })
            .catch((error) => {
                console.error('API 호출 에러:', error);
            });
    }, []);

    return project;
}

function ToString(data) {
    return (
        <>
            {JSON.stringify(data, null, 2)}

        </>
    );
}


function Page() {

    const projectList = GetProject();
    const [inputValue, setInputValue] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // 입력값을 상태로 저장
    };
    return (
        <>

            <Banner />
            <main >
                <Container>
                    <input
                        type='number'
                        id='input'
                        value={inputValue}
                        onChange={handleInputChange} // 입력값 변경 시 상태 업데이트
                    />


                    {/*` 현재 값: ${inputValue}`*/}

                    <br /><span>프로젝트 생성시 데이터 전송(/store/add)</span> <br />
                    {ProjectForm()}

                    <br /><span>프로젝트 리스트(/store)</span> <br />
                    {ToString(projectList)}

                    <br /><span>프로젝트 디테일 id(/store/:id) id 1</span> <br />
                    {ToString(getProject(1))}

                </Container>
            </main>

        </>
    );

}

export default Page;
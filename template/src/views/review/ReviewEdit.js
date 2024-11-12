/*
한정현
2024-11-06
*/

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewEdit() {
	const { id } = useParams();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await axios.get(`/api/reviews/${id}`);
				setTitle(response.data.title);
				setContent(response.data.content);
			} catch (error) {
				console.error('리뷰 불러오기 오류:', error);
			}
		};
		fetchReview();
	}, [id]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`/api/reviews/${id}`, { title, content });
			alert('리뷰가 성공적으로 수정되었습니다.');
			navigate.push(`/reviews/${id}`); // 수정 후 상세 페이지로 이동
		} catch (error) {
			console.error('리뷰 수정 오류:', error);
			alert('리뷰 수정 중 오류가 발생했습니다.');
		}
	};

	return (
		<div>
			<h2>리뷰 수정</h2>
			<form onSubmit={handleUpdate}>
				<input
					type="text"
					placeholder="제목을 입력하세요"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder="내용을 입력하세요"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button type="submit">수정하기</button>
			</form>
		</div>
	);
}

export default ReviewEdit;

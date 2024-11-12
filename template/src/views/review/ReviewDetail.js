/*
한정현
2024-11-06
*/

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewDetail() {
	const { id } = useParams();
	const [review, setReview] = useState(null);

	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await axios.get(`/api/reviews/${id}`);
				setReview(response.data);
			} catch (error) {
				console.error('리뷰 조회 오류:', error);
			}
		};
		fetchReview();
	}, [id]);

	if (!review) return <div>로딩 중...</div>;

	return (
		<div>
			<h2>{review.title}</h2>
			<p>{review.content}</p>
			<Link to={`/reviews/${id}/edit`}>수정하기</Link>
			<Link to="/reviews">목록으로 돌아가기</Link>
		</div>
	);
}

export default ReviewDetail;

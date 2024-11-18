/*
한정현
2024-11-06
*/

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewDetail() {
	const { id } = useParams(); //url의 id를 가져옴
	const [review, setReview] = useState(null); //리뷰 데이터 상태
	const [loading, setLoading] = useState(true); //로딩 상태
	const [error, setError] = useState(null); //오류상태

	//API를 호출하여 리뷰 데이터를 가져오는 함수
	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await axios.get(
					`/api/reviews/selectReview/${review.id}`
				);
				setReview(response.data);
			} catch (error) {
				console.error('리뷰 조회 오류:', error);
				setError('리뷰를 불러오는 데 실패했습니다.');
			}
		};
		fetchReview();
	}, [id]);

	//로딩 중일 때 표시
	if (!review) return <div>로딩 중...</div>;

	//오류 발생 시 표시
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h2>{review.title}</h2>
			<p>{review.content}</p>
			<Link to={`/api/reviews/updateReview/${review.id}`}>수정하기</Link>
			<Link to="/api/reviews">목록으로 돌아가기</Link>
		</div>
	);
}

export default ReviewDetail;

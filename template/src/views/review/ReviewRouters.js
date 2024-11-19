/*
한정현
2024-11-06
*/

import { Routes, Route } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';
import ReviewDetail from './ReviewDetail';
import ReviewUpdate from './ReviewUpdate';

// /review - 리뷰목록
// /review/create - 리뷰작성
// /review/detail/:id - 리뷰상세
// /review/update/:id - 리뷰수정
function Review() {
	return (
		<Routes>
			<Route path="/" exact element={<ReviewList />} />
			<Route path="/create" element={<ReviewCreate />} />
			<Route path="/detail/:id" element={<ReviewDetail />} />
			<Route path="/update/:id" element={<ReviewUpdate />} />
		</Routes>
	);
}

export default Review;

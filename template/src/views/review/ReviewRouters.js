/*
한정현
2024-11-06
*/

import { Routes, Route } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';
import ReviewDetail from './ReviewDetail';
import ReviewEdit from './ReviewEdit';

// api/reviews/...
function Review() {
	return (
		<Routes>
			<Route path="/" exact element={<ReviewList />} />
			<Route path="/createReview" element={<ReviewCreate />} />
			<Route path="/selectReview/:id" element={<ReviewDetail />} />
		</Routes>
	);
}

export default Review;

/*
한정현
2024-11-06
*/

import { Routes, Route } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';
import ReviewDetail from './ReviewDetail';
import ReviewEdit from './ReviewEdit';

function Review() {
	return (
		<Routes>
			<Route path="/" exact element={<ReviewList />} />
			<Route path="/create" element={<ReviewCreate />} />
			<Route path="/reviews/:id" element={<ReviewDetail />} />
			<Route path="/reviews/:id/edit" element={<ReviewEdit />} />
		</Routes>
	);
}

export default Review;

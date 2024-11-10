/* 전현식
2024 11 03
*/

import { Routes, Route } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';

function Review() {
	return (
		<Routes>
			<Route path="/" exact element={<ReviewList />} />
			<Route path="/create" element={<ReviewCreate />} />
		</Routes>
	);
}

export default Review;

/*전현식
2024 11 03
*/
// src/views/post/PostList.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const posts = [
    { id: 1, title: '첫 번째 게시물' },
    { id: 2, title: '두 번째 게시물' },
    { id: 3, title: '세 번째 게시물' },
  ];

  return (
    <div>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/post/new">새 게시물 작성</Link>
    </div>
  );
};

export default PostList;


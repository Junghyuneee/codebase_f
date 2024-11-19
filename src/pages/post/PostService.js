// src/pages/post/PostService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/posts'; // 백엔드 API URL

const PostService = {
  createPost: async (postData) => {
    try {
      const response = await axios.post(API_URL, postData);
      return response.data; // 성공적으로 등록된 게시물 반환
    } catch (error) {
      console.error('게시물 등록 오류:', error);
      throw error; // 에러를 상위로 전파
    }
  },

  getPosts: async () => {
    const response = await axios.get(API_URL);
    return response.data; // 게시물 목록 반환
  },
};

export default PostService;

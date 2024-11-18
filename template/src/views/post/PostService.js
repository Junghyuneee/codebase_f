// src/views/post/PostService.js
import axios from 'axios';

const API_URL = '/api/posts';

class PostService {
    // 모든 게시물 가져오기
    getAllPosts() {
        return axios.get(API_URL);
    }

    // 특정 게시물 가져오기
    getPostById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    // 게시물 생성하기
    createPost(post) {
        return axios.post(API_URL, post);
    }

    // 게시물 업데이트하기
    updatePost(id, post) {
        return axios.put(`${API_URL}/${id}`, post);
    }

    // 게시물 삭제하기
    deletePost(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new PostService();

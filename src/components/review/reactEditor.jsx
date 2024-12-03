import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 기본 스타일

const Editor = () => {
	const [editorContent, setEditorContent] = useState('');

	const handleChange = (value) => {
		setEditorContent(value); // 에디터 내용 업데이트
	};

	return (
		<div>
			<ReactQuill
				value={editorContent}
				onChange={handleChange} // 값 변경 처리
				modules={{
					toolbar: [
						[{ header: '1' }, { header: '2' }, { font: [] }],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['bold', 'italic', 'underline'],
						[{ align: [] }],
						['link', 'image'],
						['clean'], // 서식 지우기
					],
				}}
				formats={[
					'header',
					'font',
					'list',
					'bold',
					'italic',
					'underline',
					'align',
					'link',
					'image',
					'clean',
				]}
			/>
		</div>
	);
};

export default Editor;

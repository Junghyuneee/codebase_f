import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import './team.css';

function TeamCreationModal({ 
  isOpen, 
  toggle, 
  formData, 
  handleChange, 
  handleFileChange, 
  handleSubmit 
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>새 프로젝트 생성</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="pjtname">프로젝트 이름</Label>
            <Input
              type="text"
              name="pjtname"
              id="pjtname"
              value={formData.pjtname}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="pjtimg">이미지</Label>
            <Input
              type="file"
              name="pjtimg"
              id="pjtimg"
              accept="image/*"
              onChange={handleFileChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pjtdescription">설명</Label>
            <Input
              type="textarea"
              name="pjtdescription"
              id="pjtdescription"
              value={formData.pjtdescription}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label className="h5 mb-3">카테고리 선택</Label>
            <div className="d-flex flex-wrap">
              {['Java', 'Python', 'JavaScript', 'React', 'Spring', 'Node.js'].map((category) => (
                <div key={category} className="custom-category-checkbox mb-3 mr-3">
                  <Input
                    type="checkbox"
                    id={category}
                    name="pjcategory"
                    value={category}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange({
                        target: {
                          name: 'pjcategory',
                          value: e.target.checked 
                            ? formData.pjcategory 
                              ? `${formData.pjcategory},${value}`
                              : value
                            : formData.pjcategory.split(',').filter(cat => cat !== value).join(',')
                        }
                      });
                    }}
                  />
                  <Label 
                    className="btn btn-outline-primary rounded-pill px-3 py-2" 
                    check 
                    for={category}
                  >
                    <i className="ni ni-check-bold mr-2 opacity-0"></i>
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </FormGroup>
          <Button color="primary" type="submit">
            프로젝트 생성
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            취소
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default TeamCreationModal; 
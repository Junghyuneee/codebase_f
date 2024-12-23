import PropTypes from 'prop-types';
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
            <Label for="deadline">마감일</Label>
            <Input
              type="date"
              name="deadline"
              id="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label className="h5 mb-3">카테고리 선택</Label>
            <div className="d-flex flex-wrap">
              {['Java', 'Python', 'JavaScript', 'React', 'Spring', 'Node.js', 'Vue.js', 'Angular', 'TypeScript', 'PHP'].map((category) => (
                <div key={category} className="custom-category-checkbox mb-1 mr-1">
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
                    className="btn btn-outline-primary rounded-pill px-1 py-0"
                    check 
                    for={category}
                  >
                    <i className="ni ni-check-bold mr-0 opacity-0"></i>
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

TeamCreationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    pjtname: PropTypes.string,
    pjtdescription: PropTypes.string,
    pjcategory: PropTypes.string,
    deadline: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default TeamCreationModal; 
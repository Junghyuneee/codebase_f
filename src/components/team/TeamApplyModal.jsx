// TeamApplyModal.jsx
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function TeamApplyModal({ 
  isOpen, 
  toggle, 
  formData, 
  handleChange,
  handleSubmit
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>팀원 등록</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="tech_stack">기술 스택</Label>
            <Input
              type="select"
              name="tech_stack"
              id="tech_stack"
              value={formData.tech_stack}
              onChange={handleChange}
              required
            >
              <option value="">기술 스택을 선택하세요</option>
              <option value="FRONTEND">Frontend</option>
              <option value="BACKEND">Backend</option>
              <option value="FULLSTACK">Fullstack</option>
              <option value="DESIGN">Designer</option>
              <option value="PM">PM</option>
              <option value="ETC">ETC</option>
            </Input>
          </FormGroup>
          <div className="mt-3">
            <Button color="primary" type="submit">
              등록
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              취소
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}

TeamApplyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    tech_stack: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default TeamApplyModal;

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
import axios from "axios";
import { getMemberId } from "../../api/auth/getset.js";

function TeamApplyModal({ 
  isOpen, 
  toggle, 
  formData, 
  handleChange,
  projectId
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      member_id: getMemberId(),
      pjt_id: projectId,
      tech_stack: formData.tech_stack,
      status: "PENDING"
    };

    const response = await axios.post("/api/team-applications", data);
    
    if (response.status === 200) {
      alert("팀원 등록이 완료되었습니다!");
      toggle();
    }
  };

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
              <option value="DESIGNER">Designer</option>
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
    member_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  projectId: PropTypes.number
};

export default TeamApplyModal;

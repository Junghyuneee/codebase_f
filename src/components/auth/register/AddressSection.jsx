import { Form, InputGroup } from "react-bootstrap";
import Postcode from '@/components/auth/DaumAddress.jsx';
import PropTypes from "prop-types";
import { useCallback } from "react";

const AddressSection = ({ register, setValue }) => {

  const handleSetAddress = useCallback((address) => {
    setValue('address', address);
  }, [setValue]);

  const handleSetPostCode = useCallback((postcode) => {
    setValue('postcode', postcode);
  }, [setValue]);


  return (
    <>
      {/* 주소 입력 */}
      <div className="d-flex" style={{ gap: '1rem' }}>
        <InputGroup className="input-group-alternative">
          <InputGroup.Text style={{ backgroundColor: '#fff', border: 'none' }}>
            <i className="ni ni-pin-3" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            disabled
            {...register("postcode")}
            placeholder="Postcode"
            style={{ backgroundColor: '#fff', border: 'none' }}
          />
        </InputGroup>
        <Postcode
          setAddress={handleSetAddress}
          setPostCode={handleSetPostCode}
        />
      </div>

      <InputGroup className="input-group-alternative">
        <InputGroup.Text style={{ backgroundColor: '#fff', border: 'none' }}>
          <i className="ni ni-building" />
        </InputGroup.Text>
        <Form.Control
          placeholder="주소"
          type="text"
          disabled
          {...register("address")}
          style={{ backgroundColor: '#fff', border: 'none' }}
        />
      </InputGroup>

      <InputGroup className="input-group-alternative">
        <InputGroup.Text>
          <i className="ni ni-building" />
        </InputGroup.Text>
        <Form.Control
          placeholder="상세 주소"
          type="text"
          autoComplete="off"
          {...register("addressDetail")}
        />
      </InputGroup>
    </>
  );
}

AddressSection.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};
export default AddressSection;
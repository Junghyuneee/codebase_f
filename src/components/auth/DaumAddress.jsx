import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Postcode({ setAddress, setPostCode }) {
    const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        setAddress(fullAddress);
        if (setPostCode) setPostCode(data.zonecode);

    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <Button className="bg-mainTheme text-nowrap" type='button' onClick={handleClick}>
            주소 찾기
        </Button>
    );
};

Postcode.propTypes = {
    setAddress: PropTypes.func.isRequired,
    setPostCode: PropTypes.func.isRequired,
}
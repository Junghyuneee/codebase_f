import React, { Dispatch, SetStateAction } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Address } from "react-daum-postcode/lib/loadPostcode";
import { Button } from "reactstrap";

export default function Postcode({ setAddress, setPostCode }: {
    setAddress: Dispatch<SetStateAction<string>>,
    setPostCode?: Dispatch<SetStateAction<string>>
}) {
    const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const handleComplete = (data: Address) => {
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
        <Button className="bg-mainTheme" style={{ whiteSpace: 'nowrap' }} type='button' onClick={handleClick}>
            주소 찾기
        </Button>
    );
};
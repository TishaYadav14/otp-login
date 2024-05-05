/* eslint-disable react/prop-types */

import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  console.log(inputRefs.current);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOtp = [...otp];

    //allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // move focus to next input if current field is filled
    if(value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
    }
  };

  const handleOnClick = (index) => {
    // keep input cursor on the right side of the number
    inputRefs.current[index].setSelectionRange(1,1);

    //move focus to first empty field
    if(index > 0 && !otp[index-1]) {
        inputRefs.current[otp.indexOf("")].focus();
    } 
    // if(index < length-1 && !otp[index+1]) {
    //     inputRefs.current[otp.indexOf("")].focus();
    // } 
  };

  const handleKeyDown = (index, e) => {
        // move focus to previous input on backspace and empty
    if(e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleOnClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;

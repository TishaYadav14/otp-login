import React, { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    //phone validation
    const regex = /[^0-9]/g;
    if (
      phoneNumber.length < 10 ||
      phoneNumber.length > 10 ||
      regex.test(phoneNumber)
    ) {
      setError(true);
    }
      //can call backend API
      //then show OTP Field
      setShowOtpInput(true);

  };

  const onOtpSubmit = (otp) => {
    console.log("Successful Login: ", otp);
    setSuccess(true);
  };

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit} className="phoneInput-form">
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          {error && <p style={{ color: "red" }}>Invalid Phone Number</p>}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
          {success && <h2 style={{color:"green"}}>Login Successful!</h2>}
        </div>
      )}
    </div>
  );
};

export default PhoneOtpLogin;

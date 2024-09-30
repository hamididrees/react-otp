import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return false;
    setOtp([
      ...otp.map((data, ind) => (ind === index ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
    if (!e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handlePaste = (e) => {
    const value = e.clipboardData.getData("text");

    const regex = /[^0-9]/g;
    if (isNaN(value) || regex.test(value)) return false;
    const updatedValue = value.toString().split("").slice(0, otp.length);
    setOtp(updatedValue);

    inputRefs.current[0].blur();
    inputRefs.current[otp.length - 1].focus();
  };

  return (
    <>
      <h1>OTP</h1>
      <div className="flex gap-4 justify-center items-center mt-4">
        {otp.map((item, index) => {
          return (
            <input
              className="w-20 p-2 outline-none text-center font-bold text-xl border-gray-400 caret-red-800 focus:border-red-800 border-2"
              key={index}
              ref={(input) => (inputRefs.current[index] = input)}
              type="text"
              value={item}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;

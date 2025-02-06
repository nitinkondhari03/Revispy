import { useState } from "react";
import axios from "axios";
const EmailVerification = () => {
  const [code, setCode] = useState(Array(8).fill(""));

  const handleChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    document.getElementById(`code-${index + 1}`)?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };
const handlesubmit=async(e: React.FormEvent)=>{
  e.preventDefault();
  let verifycode=(code.join("").toString())
  const x=localStorage.getItem("token")
  let obj={
    verifycode
  }
  try {
    
    const res = await axios.post("http://localhost:8080/api/verifyemail",obj,{
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    console.log(res)
  } catch (error) {
      alert("Something went wrong!");
}
}
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-lg font-semibold">Verify your email</h2>
        <p className="text-gray-600 text-sm mt-2">
          Enter the 8-digit code you have received on <span className="font-medium">dev***@revispy.com</span>
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              
              maxLength={1}
              className="w-10 h-12 text-lg text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="off"
            />
          ))}
        </div>
        <button
        onClick={handlesubmit}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          VERIFY
        </button>
      </div>
    </div>
  );
};

export default EmailVerification

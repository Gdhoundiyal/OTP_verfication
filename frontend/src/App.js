import React, { useState } from 'react';
import './App.css'; // Import your CSS for styling
import axios from 'axios';


const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpData, setOtpData] = useState([]);


  const sendOTP = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:3100/sendotp/${phoneNumber}`);
      console.log('Response:', response.data);
      setOtpData(response.data)
      setPhoneNumber('')

    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  
  // Example usage
  
  
  

  return (
    <div className="otp-form-container">
      <h2>Phone OTP Sender</h2>
      <form onSubmit={sendOTP}>
        <div className="input-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      <table className="otp-table">
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>OTP</th>
          </tr>
        </thead>
        <tbody>
          {otpData.map((item, index) => (
            <tr key={index}>
              <td>{item.phonenum}</td>
              <td>{item.otp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

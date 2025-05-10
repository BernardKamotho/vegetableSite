import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const Makepayment = () => {
  const { totalCost } = useLocation().state || {};

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");


  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait as we process your payment...");

    const data = new FormData();
    data.append("phone", phone);
    data.append("amount", totalCost);

    const response = await axios.post("https://frankizah.pythonanywhere.com/api/mpesa_payment", data);
    setMessage(response.data.message);
  };

  return (
    <div className='row justify-content-center mt-3'>
      
      <div className="col-md-6 card shadow p-3">
      <h1 className='text-success text-center'>Lipa na Mpesa</h1>
        <b className='text-success'>{message}</b>
       

        <h4>Total Amount to Pay: <span className='text-primary'>{totalCost} KES</span></h4>
        <form onSubmit={submit}>
          <input
            type="number"
            placeholder='Enter your Mpesa number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='form-control'
          />
          <br />
          <button className='btn btn-success'>Make Payment</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Makepayment;

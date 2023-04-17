import React, { useEffect, useState } from "react";
import { URL } from "../../URL";
import axios from "axios";
const Payment = () => {
  const [paymentId, setPaymentId] = useState("");
  const [data, setData] = useState({});
  let id = document.URL.split("/")[4];
  const fetchData = async () => {
    const url = `${URL}test/${id}`;
    const result = await axios.get(url, {
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePayment = async () => {
    const url = `http://localhost:8000/payment/pay/${id}`;
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    console.log(response);
    setPaymentId(response.data);
  };
  return (
    <>
      <section className="payment-section p-4">
        <h2>{data?.courseName}</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
          debitis, similique aliquam iure cupiditate hic tempora optio
          voluptatibus eum sequi.
        </p>
        <p>${data.price}</p>
        <button className="bg-black text-white" onClick={handlePayment}>
          Buy Now
        </button>
        {paymentId && <p>PAYMENT ID : {paymentId}</p>}
      </section>
    </>
  );
};

export default Payment;

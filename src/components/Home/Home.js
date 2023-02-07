import React, { useEffect } from 'react'
import Slider from './Slider/Slider'
import {useNavigate} from 'react-router-dom'
import './home.css'

const Home = () => {
  const navigate = useNavigate();
  function getCookie(name) {
    const cookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith(`${name}=`));
    if (!cookie) {
      return null;
    }
  
    return cookie.split('=')[1];
  }
  const accessToken = getCookie('access_token');
  console.log(accessToken);
  
  useEffect(() => {
    if (accessToken == null) {
      navigate('/login')
    }
  }, [])
  return (
    <section className='home-section'>
      <Slider />
    </section>
  )
}

export default Home
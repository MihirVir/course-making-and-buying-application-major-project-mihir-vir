import React, {useState} from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import './slider.css'
const Slider = () => {
    const [current, setCurrent] = useState(0);
    setTimeout(() => {
        setCurrent(current === data.length - 1 ? 0 : current + 1);
    }, 4100)
    const prevSlide = () => {
        setCurrent(current === 0 ? data.length - 1 : (prev) => prev - 1);
    }
    const nextSlide = () => {
        setCurrent(current === data.length - 1? 0 : (prev) => prev + 1);
    }
    const data = [
        'https://images.pexels.com/photos/14930425/pexels-photo-14930425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/15122403/pexels-photo-15122403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  return (
    <div className="slider">
        <div className="container" style = {{transform: `translateX(-${current * 100}vw)`}}>
            <img src={data[0]} alt="" />
            <img src={data[1]} alt="" />
            <img src={data[2]} alt="" />
        </div>
        <div className="icons">
            <div className="icon left" onClick={prevSlide}>
                <ArrowBackIosNewOutlinedIcon />
            </div>
            <div className="icon right" onClick={nextSlide}>
                
                <ArrowForwardIosIcon />
            </div>
        </div>
    </div>
  )
}

export default Slider
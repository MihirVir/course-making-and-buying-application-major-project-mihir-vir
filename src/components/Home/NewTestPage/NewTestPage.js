import React from 'react'
import {easeInOut, motion} from 'framer-motion';
import './newtestpage.css'
const NewTestPage = () => {
  return (
    <>
        <section className="home-enter-img-svg">
            <div className="home-enter-container">
                <motion.img
                    initial ={{opacity: 0}}
                    animate ={{opacity: 1}}
                    transition={{delay: 1,duration: 1, easeInOut}}
                    className = "new-test-page-img" src="https://emantav.in/wp-content/uploads/2021/04/Pte-course-img.png" alt="" />
                <div className="home-enter-details">
                    <motion.h2 
                        initial ={{opacity: 0}}
                        animate ={{opacity: 1}}
                        className='home-enter-motivation'
                        transition={{delay: 2,duration: 1, easeInOut}}
                    >
                        Ready To Upskill?
                    </motion.h2>
                    <motion.span 
                        initial = {{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 3, duration: 1, easeInOut}}
                        className='home-enter-para'
                    >
                        Learn at the comfort of your own home
                    </motion.span>
                </div>
            </div>
        </section>
    </>
  )
}

export default NewTestPage
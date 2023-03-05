import React from 'react'
import './footer.css'
const Footer = () => {
    return (
        <>
            <section className="footer-section">
                <div className="footer-section-container">
                    <ul className='footer-list-item-wrappers'>
                        <h4>Help</h4>
                        <li>
                            Docs
                        </li>
                        <li>
                            FAQs
                        </li>
                        <li>
                            About Us
                        </li>
                        <li>
                            Careers
                        </li>
                        <li>Privacy Policy</li>
                        <li>Terms</li>
                    </ul>
                    <ul className = "footer-list-item-wrappers">
                        <h4>Developed By</h4>
                        <li>Mihir Vir</li>
                        <li>Amity University Noida, Uttar Pradesh</li>
                        <li>Tech: ReactJS, ExpressJS</li>
                        <li>github</li>
                        <li>LinkedIn</li>
                        <li>instagram</li>
                    </ul>
                    <ul className="footer-list-item-wrappers">
                        <li>
                            <img className = "footer-savage-img" src="https://media.pitchfork.com/photos/5f7b3ba12dd72c64377cf95b/1:1/w_600/savage%20mode%202_21%20savage%20metro%20boomin.jpg" alt="error loading the image" />
                        </li>
                    </ul>
                </div>
                
            </section> 
        </>
    )
}

export default Footer
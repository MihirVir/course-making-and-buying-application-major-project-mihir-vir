import React, {useRef} from 'react'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import "./contactpage.css"
const ContactPage = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm("service_sxvxb51","template_9kym7ep", form.current, "Aiwsq8HrNzNTrW9qh")
                .then((response) => {
                    toast.success("successfully sent the email")
                })
                .catch((error) => {
                    toast.error("error sending the mail", error)
                })
    }
  return (
    <>
        <section className="contact-page-section">
            <ToastContainer />
            <div className="contact-page-section-container">
                <h2>
                    Need help? contact us
                </h2>
                
                <form ref = {form} onSubmit = {sendEmail} className = "contact-us-input-wrapper">
                    <input className='contact-section-input' type="text" name = "name" placeholder='enter name'/>
                    <input className='contact-section-input' type="email" name = "email" placeholder='enter email'/>
                    <textarea name = "message"  className="contact-section-message" placeholder='enter your message'></textarea>
                    <button  type = "submit" className = "contact-section-submit-btn">
                        Submit
                    </button>
                </form>
            </div>
            <img className = "section-duck" loading = "lazy" src="/duck.gif" alt="unable to load" />
        </section>
    </>
  )
}

export default ContactPage
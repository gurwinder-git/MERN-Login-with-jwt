import React from 'react';
import '../css/contact.css'

function Contact() {
    return (
        <div id="contactDiv">
           <h2>Get in Touch</h2>
           <form action="" method = "POST">
               <div>
                   <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name"/>
                   </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email"/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name="phone"/>
                    </div>
               </div>

                <textarea name="message" cols="30" rows="10"></textarea>

                <button type="submit"> Send Message </button>
            </form>
        </div>
    )
}

export default Contact

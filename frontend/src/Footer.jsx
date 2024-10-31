import React from 'react'
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
    <div class="f-info">
        <div class="f-info-socials">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
        </div>
       
        <div> &copy; YourStore Private Limited</div>
    <div class="f-info-links">
        <a href="/">Privacy</a>
        <a href="/">Terms</a>
    </div>
    </div>
    
</footer>
  )
}

export default Footer
import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div class="f-info">
      <div className="about">
        Welcome to YourStore! We know how frustrating it can be to go
        to a store only to find out that the item you need isn't available. Our
        goal is to save you time and effort by helping you locate stores near
        you that have the items you’re looking for in stock. Simply search for
        the product, and we’ll show you a list of nearby stores where it’s
        available. With our service, you can shop smarter, avoid unnecessary
        trips, and get what you need without the guesswork. Happy shopping!
      </div>
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
  );
};

export default Footer;

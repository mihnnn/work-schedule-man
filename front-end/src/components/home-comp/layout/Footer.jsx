import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Footer.css'

function Footer() {
  return (
    <div className="bg-[#242424] flex flex-col justify-center items-center pt-16 pb-8 px-0">
      <section className="flex flex-col justify-center items-center text-center text-white mb-6 p-6">
        <h2 className="text-2xl mb-6">WSM©</h2>
        <p className="text-xl mb-6">
          WSM is registerd trademark by WSM, Inc. All rights reserved.
        </p>
      </section>

      <div className="w-full max-w-[1000px] flex justify-center">
        <div className="flex">
          <div className="flex flex-col items-start text-left w-40 box-border m-4">
            <h2 class>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div className="flex flex-col items-start text-left w-40 box-border m-4">
            <h2 class>Contact Us</h2>
            <a href="/">Contact</a>
            <a href="/">Support</a>
            <a href="/">Destinations</a>
            <a href="/">Sponsorships</a>
          </div>
        </div>
        <div className="flex">
          <div class='flex flex-col items-start text-left w-40 box-border m-4'>
            <h2 class>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div class='flex flex-col items-start text-left w-40 box-border m-4'>
            <h2 class>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>

      <section class='max-w-[1000px] w-full'>
        <div class='flex justify-between items-center w-[90%] max-w-[1000px] mt-10 mb-0 mx-auto'>
          <div class='text-[white] text-2xl'>
            <Link to='/' className='social-logo'>
              WSM
              <i class='fas fa-user-clock pl-2' />
            </Link>
          </div>
          <small class='text-white mb-4 text-base'>WSM © 2024</small>
          <div class='flex justify-between items-center w-60'>
            <Link
              class='text-white text-2xl facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='text-white text-2xl instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='text-white text-2xl youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='text-white text-2xl twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='text-white text-2xl twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;

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
            <h2 >About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div className="flex flex-col items-start text-left w-40 box-border m-4">
            <h2 >Contact Us</h2>
            <a href="/">Contact</a>
            <a href="/">Support</a>
            <a href="/">Destinations</a>
            <a href="/">Sponsorships</a>
          </div>
        </div>
        <div className="flex">
          <div className='flex flex-col items-start text-left w-40 box-border m-4'>
            <h2 >Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div className='flex flex-col items-start text-left w-40 box-border m-4'>
            <h2 >Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>

      <section className='max-w-[1000px] w-full'>
        <div className='flex justify-between items-center w-[90%] max-w-[1000px] mt-10 mb-0 mx-auto'>
          <div className='text-[white] text-2xl'>
            <Link to='/' className='social-logo'>
              WSM
              <i className='fas fa-user-clock pl-2' />
            </Link>
          </div>
          <small className='text-white mb-4 text-base'>WSM © 2024</small>
          <div className='flex justify-between items-center w-60'>
            <Link
              className='text-white text-2xl facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='text-white text-2xl instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='text-white text-2xl youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='text-white text-2xl twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='text-white text-2xl twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;

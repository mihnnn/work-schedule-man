import React from 'react'
import { Link } from 'react-router-dom'

function CardItem(props) {
  return (
    <>
      <li className='bg-white flex flex-1 mx-4 my-0 rounded-[10px] mb-8'> 
        <Link className='cards__item__link flex w-full shadow-[0_6px_20px_rgba(56,125,255,0.17)] overflow-hidden no-underline rounded-[10px]' to={props.path}>
          <figure className='relative w-full overflow-hidden pt-[67%] after:content-[attr(dataCatagory)] after:absolute after:max-w-[calc((100%)_-_60px)] after:text-xs after:font-bold after:text-white after:bg-[#1f98f4] after:box-border after:ml-2.5 after:px-2 after:py-1.5 after:bottom-0' datacatagory = {props.label}>
            <img 
              className='absolute block w-full max-w-full h-full max-h-full object-cover transition-all duration-[0.2s] ease-linear inset-0 hover:scale-110'
              alt='Traveling'
              src={props.src}
            />
          </figure> 
          <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  )
}

export default CardItem

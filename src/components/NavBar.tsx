import React from 'react'

const NavBar = () => {
  return (
    <nav>
        <div className='flex flex-col md:flex-row w-full justify-center items-center navigation mb-10'>
            <div className='faqs'>
                FAQs
            </div>
            <div className='logo'>ATS-resume-evaluator</div>
            <ul className='flex flex-row gap-2'>
                <li><a href="/">Resume-Tester</a></li>
                <li><a href="#Templates">Templates</a></li>
                <li><a href="#Links">Links of interest</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar
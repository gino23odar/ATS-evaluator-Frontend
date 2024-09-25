'use client'
import React, { useState } from 'react'
import ResumeUpload from './ResumeUpload'
import AdUpload from './AdUpload'

const ResumeHandler = () => {

  const [resumeInfo, setResumeInfo] = useState('');

  return (
    <section className='resume-handler flex flex-col gap-8'>
        <ResumeUpload setResumeInfo={setResumeInfo} />
        <AdUpload resumeInfo={resumeInfo} />
    </section>
  )
}

export default ResumeHandler
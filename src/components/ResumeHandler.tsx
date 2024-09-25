'use client'
import React, { useState } from 'react'
import ResumeUpload from './ResumeUpload'
import AdUpload from './AdUpload'

const ResumeHandler = () => {

  const [resumeInfo, setResumeInfo] = useState('');

  return (
    <div className='resume-handler flex flex-col gap-8'>
        <ResumeUpload setResumeInfo={setResumeInfo} />
        <AdUpload resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumeHandler
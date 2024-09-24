import React from 'react'
import ResumeUpload from './ResumeUpload'
import AdUpload from './AdUpload'

const ResumeHandler = () => {
  return (
    <div className='resume-handler flex flex-col gap-8'>
        <ResumeUpload />
        <AdUpload />
    </div>
  )
}

export default ResumeHandler
import React from 'react'

const AdUpload = () => {
  return (
    <section className='ad-upload flex flex-col md:flex-row p-6'>
        <div className="final-result-section w-full md:w-1/2 p-6" id="finalResultSection">
            <h2 className="text-xl font-semibold mb-4">Suggested Changes</h2>
            <textarea id="finalResult" className="result-textarea w-full h-64 border border-gray-300 rounded-lg p-4 resize-none" readOnly></textarea>
            <div id="errorMessage2" className="error-message text-red-500 mt-2"></div>
        </div>
        <div className="ad-section w-full md:w-[72vw] p-2">
            <p className="loading-text hidden" id="loadingText">Loading...</p>
            <div className="upload-box bg-gray-100 border border-gray-300 rounded-lg p-6">
                <form id="AdUploadForm" encType="multipart/form-data" className="space-y-4">
                    <label htmlFor="AdFileInput" className="upload-label text-2xl flex flex-col items-center rounded-lg p-6 hover:bg-gray-200">
                        <div className="upload-text text-gray-600">Share the Job Post</div>
                    </label>
                    <p className="text-sm text-gray-500">Copy the description of the position you are applying for</p>
                    <textarea id="ad-description" className="ad-textarea w-full h-48 border border-gray-300 rounded-lg p-4 resize-none" placeholder="Paste job description here..."></textarea>
                    <div className="file-name text-sm text-gray-700" id="AdFileName"></div>
                    <button className="parse-button w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors" type="submit" id="AdSubmitButton">
                        Parse Your Job Post
                    </button>
                </form>
            </div>
        </div>

    </section>
  )
}

export default AdUpload
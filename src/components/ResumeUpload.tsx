import React from 'react'

const ResumeUpload = () => {
  return (
    <section className="resume-upload flex flex-col md:flex-row p-6">
        <div className="upload-section w-full md:w-[74vw] p-4">
            <p className="loading-text hidden" id="loadingText">Loading...</p>
            <div className="upload-box bg-gray-100 border border-gray-300 rounded-lg p-6">
            <form id="uploadForm" encType="multipart/form-data" className="space-y-4">
                <label htmlFor="fileInput" className="upload-label cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-400 rounded-lg p-6 hover:bg-gray-200">
                <div className="upload-icon text-3xl">📄</div>
                <div className="upload-text mt-2 text-gray-600">Upload Your Resume</div>
                </label>
                <input type="file" name="file" id="fileInput" className="hidden" autoComplete="off" required />
                <p className="text-sm text-gray-500">DOC, DOCX, or PDF files up to 2MB</p>
                <div className="file-name text-sm text-gray-700" id="fileName"></div>
                <button className="parse-button w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors" type="submit" id="submitButton">
                Parse Your Resume
                </button>
            </form>
            </div>
        </div>

        <div className="result-section w-full md:w-1/2 p-4" id="resultSection">
            <h2 className="text-xl font-semibold mb-4">Parsed Resume Result</h2>
            <textarea id="result" className="result-textarea w-full h-64 border border-gray-300 rounded-lg p-4 resize-none" readOnly></textarea>
            <div id="errorMessage" className="error-message text-red-500 mt-2"></div>
        </div>
    </section>

  )
}

export default ResumeUpload
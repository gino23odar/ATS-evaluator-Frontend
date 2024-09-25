'use client'
import { useState, FormEvent, useEffect } from 'react';

const baseURL = process.env.NEXT_PUBLIC_API_URL; // API base URL from environment variables

type AdUploadProps = {
    resumeInfo: string;
}

const AdUpload: React.FC<AdUploadProps> = ({ resumeInfo }) => {
  const [adDescription, setAdDescription] = useState<string>(''); // State for job post description
  const [resumeData, setResumeData] = useState<string>(''); // State for resume data (string format)
  const [parsedResult, setParsedResult] = useState<string>(''); // State for parsed result
  const [errorMessage, setErrorMessage] = useState<string>(''); // State for error messages
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  
  useEffect(() => {
    setResumeData(resumeInfo);
  }, [resumeInfo]);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setParsedResult('');

    if (!adDescription) {
      setErrorMessage('Please provide a job description.');
      return;
    }

    if (!resumeData) {
      setErrorMessage('Please provide resume data.');
      return;
    }

    // Prepare form data to be sent
    const formData = new FormData();
    formData.append('ad-description', adDescription);
    formData.append('resume-data', resumeData);

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}api/upload-ad/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await response.json();
      setParsedResult(JSON.stringify(data, null, 2)); // Format JSON result
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  console.log('loading: ', loading);
  console.log('resume ', resumeData);
  console.log('ad: ',adDescription);

  return (
    <div className="ad-upload flex flex-col md:flex-row p-6">

      <div className="ad-section w-full md:w-[72vw] p-2">
        {loading ? (
            <p className="loading-text">Loading...</p>
            ) : (
            <div>Your components here...</div>
        )}
        <div className="upload-box2 bg-gray-100 border border-gray-300 rounded-lg p-6">
          <form id="AdUploadForm" encType="multipart/form-data" className="space-y-4" onSubmit={handleSubmit}>
            <label
                htmlFor="ad-description"
              className="upload-label text-2xl flex flex-col items-center rounded-lg p-6 hover:bg-gray-200"
            >
              <div className="upload-text text-gray-600">Share the Job Post</div>
            </label>
            <p className="text-sm text-gray-500">Copy the description of the position you are applying for</p>
            <textarea
              id="ad-description"
              className="ad-textarea w-full h-48 border border-gray-300 rounded-lg p-4 resize-none"
              placeholder="Paste job description here..."
              value={adDescription}
              onChange={(e) => setAdDescription(e.target.value)} // Update state on change
            ></textarea>
            <div className="resume-data-display w-full h-48 border border-gray-300 rounded-lg p-4 overflow-y-scroll">
                {resumeData}
            </div>
            <input
            type="hidden"
            name="resume-data"
            value={resumeData} // Hidden input will hold the resumeData for form submission
            />
            <div className="file-name2 text-sm text-gray-700" id="AdFileName"></div>
            <button
              className="parse-button2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              type="submit"
              id="AdSubmitButton"
              disabled={loading}
            >
              {loading ? 'Parsing...' : 'Parse Your Job Post'}
            </button>
          </form>
        </div>
      </div>
      <div className="final-result-section w-full md:w-1/2 p-6" id="finalResultSection">
        <h2 className="text-xl font-semibold mb-4">Suggested Changes</h2>
        <textarea
          id="finalResult"
          className="result-textarea w-full h-64 border border-gray-300 rounded-lg p-4 resize-none"
          readOnly
          value={parsedResult}
        ></textarea>
        {errorMessage && (
          <div id="errorMessage2" className="error-message text-red-500 mt-2">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdUpload;


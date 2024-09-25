'use client'
import { useState, FormEvent, ChangeEvent } from 'react';

type ResumeUploadProps = {
    setResumeInfo: React.Dispatch<React.SetStateAction<string>>;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ setResumeInfo }) => {
  const [fileName, setFileName] = useState<string>(''); // Display selected file name
  const [parsedResult, setParsedResult] = useState<string>(''); // Show parsed resume result
  const [errorMessage, setErrorMessage] = useState<string>(''); // Show error messages
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Function to handle file upload and submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setParsedResult('');

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput?.files?.[0]; // Get the selected file

    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/upload-resume/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred while parsing the file');
      }

      const data = await response.json();
      const formattedData = JSON.stringify(data, null, 2); // Format the JSON result
      setParsedResult(formattedData);
      setResumeInfo(formattedData); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <div className="resume-upload flex flex-col md:flex-row p-6">
      <div className="upload-section w-full md:w-[74vw] p-4">
        <p className={`loading-text ${loading ? '' : 'hidden'}`} id="loadingText">
          Loading...
        </p>
        <div className="upload-box bg-gray-100 border border-gray-300 rounded-lg p-6">
          <form
            id="uploadForm"
            encType="multipart/form-data"
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="fileInput"
              className="upload-label cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-400 rounded-lg p-6 hover:bg-gray-200"
            >
              <div className="upload-icon text-3xl">📄</div>
              <div className="upload-text mt-2 text-gray-600">Upload Your Resume</div>
            </label>
            <input
              type="file"
              name="file"
              id="fileInput"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
            <p className="text-sm text-gray-500">DOC, DOCX, or PDF files up to 2MB</p>
            <div className="file-name text-sm text-gray-700" id="fileName">
              {fileName}
            </div>
            <button
              className="parse-button w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              type="submit"
              id="submitButton"
              disabled={loading}
            >
              {loading ? 'Parsing...' : 'Parse Your Resume'}
            </button>
          </form>
        </div>
      </div>

      <div className="result-section w-full md:w-1/2 p-4" id="resultSection">
        <h2 className="text-xl font-semibold mb-4">Parsed Resume Result</h2>
        <textarea
          id="result"
          className="result-textarea w-full h-64 border border-gray-300 rounded-lg p-4 resize-none"
          readOnly
          value={parsedResult}
        ></textarea>
        {errorMessage && (
          <div id="errorMessage" className="error-message text-red-500 mt-2">
            {errorMessage}
          </div>
        )}
        <p className='text-bold'>Due to Amazon Bedrock discontinuing the foundation Llama 2 Chat models, I had to use the Llama 3 Intruct models, which make the output somewhat more unpredictable, please try a couple times to get the parsing to work.</p>
      </div>
    </div>
  );
};

export default ResumeUpload;



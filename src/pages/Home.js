import React , {useState} from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { config } from '../constants';
import Results from '../components/Results';
import { BsFilePdf } from 'react-icons/bs'

const Loader = () => (
  <div className="z-99 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#5E5ADB]"></div>
  </div>
);

function Home() {
  
  const [jobRole, setJobRole] = useState('') 
  const [jobDescription, setJobDescription] = useState('') 
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading,setLoading] = useState(false);
  const [recievedResults, setRecievedResults] = useState(false);
  const [results, setResults] = useState([]);

  function handleFileChange(event) {
    setFiles([...files,...event.target.files]);
    console.log(files);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = config.BASEURL;
    const formData = new FormData();
    formData.append('jobRole', jobRole);
    formData.append('jobDescription', jobDescription);
    files.forEach((file) => {
      formData.append(`files`, file);
    });
   
    const configHeaders = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    setLoading(true)
    axios.post(url, formData, configHeaders)
      .then((response) => {
        console.log(response.data);
        setResults(response.data);
        setRecievedResults(true);
        setUploadedFiles(response.data.files);
        setLoading(false);setFiles([]);
        
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
        setLoading(false)
      });
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    );
    setFiles([...files, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };


  return (
    <>
    {loading && <Loader/>}
    {recievedResults ? (<Results results={results} files={uploadedFiles}/>)  : (
      <div className="flex justify-center items-center mb-[3rem] mt-[3rem]">
      <div className="max-w-screen-xl w-full px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          
          <TextField 
            id="outlined-basic" 
            label="Job Role" variant="outlined" 
            required
            sx={{ marginX : 'auto' , marginY : '2rem', width:'85%' }} 
            onChange={(e)=>setJobRole(e.target.value)}/>
            <TextField
              id="outlined-textarea"
              label="Job Description"
              placeholder="A detailed description of the job role"
              multiline
              rows = {4}
              sx = {{width : '85%'}}
              onChange={(e)=>setJobDescription(e.target.value)}
              required
            />
      <div
      className={`max-w-md mx-auto p-2 bg-white shadow-md rounded-md border-dashed border-2 border-[#5E5ADB] mt-5 ${!loading ? 'relative cursor-pointer' : ''} h-40 z-10`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label
        htmlFor="fileInput"
        className="cursor-pointer absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-transparent text-gray-600"
      >
        <span className="text-sm">Click or drag & drop to attach PDF files</span>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf"
          multiple
        />
      </label>
      </div>
      <button
        type="submit"
        className="bg-[#5E5ADB] text-white py-2 px-4 rounded-md mb-4 mr-4 mt-4 cursor-pointer hover:bg-[#3933f5] transition duration-200 ease-in-out w-[80%] mx-auto"
        disabled={files.length === 0}
        onClick={handleSubmit}
      >
        Submit
      </button>
        </div>
      </div>
    </div>
    )}

    <div className="flex items-center justify-center overflow-auto-y">
      <div className="bg-gray-200 p-4 rounded-md">
        <ul>
        {files.length > 0 && (
        <ul className="w-[25rem] mb-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between mb-2 p-2">
              <div className="flex items-center">
              <BsFilePdf className="text-red-500 ml-2 mr-2" />
                <span>{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 ml-2"
              >
                &#10006; {/* Cross sign (X) */}
              </button>
            </li>
          ))}
        </ul>
      )}
        </ul>
      </div>
    </div>
    </>
  )
}

export default Home
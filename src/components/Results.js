import React,{useState} from 'react'
import Modal from 'react-modal';

function Results({results}){
    const { recommended_candidates, not_recommended_candidates } = results;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const openModal = (candidate) => {
        setSelectedCandidate(candidate);
        setModalIsOpen(true);
      };
    
    const closeModal = () => {
        setSelectedCandidate(null);
        setModalIsOpen(false);
    };

    return (
    <>
        <h1 className="text-[2rem] text-left pl-[3rem] pt-[2.5rem]">{recommended_candidates.length} Resumes filtered</h1>

        <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal} selectedCandidate={selectedCandidate}/>

        <h3 className="text-[1.5rem] my-[2rem]">Recommended Profiles</h3>

        <TableHead/>
        {recommended_candidates.map((candidate) => (
            <CandidateCard candidate={candidate} onOpenModal={() => openModal(candidate)}/>
        ))}

        <h3 className="text-[1.5rem] my-[2rem]">Not Recommended Profiles</h3>
        <TableHead/>
        {/* {results.map((candidate) => (
            <CandidateCard candidate={candidate} onOpenModal={() => openModal(candidate)}/>
        ))} */}
    </>
  )
}

export default Results

const TableHead = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md w-[85%] mx-auto">
        <div>
            <h3 className='w-[15rem]'>Name</h3>
        </div>
        <div>
            <p className='w-[15rem]'>Relevance Score</p>
        </div>
        <div>
            <p className='w-[15rem]'>Resume Link</p>
        </div>
        <div>
            <p className='w-[15rem]'>Details</p>
        </div>
        </div>
    )
}

const customStyles = {
    content: {
      maxWidth: '800px',
      margin: 'auto',
      padding: '5rem',
    },
  };

const getInitials = (name) => {
    const names = name.split(' ');
    return names.map((n) => n.charAt(0)).join('');
}; 

const CollegeDetails = ({ college }) => {
    return (
      <div className="p-4 rounded-md shadow-md">
        <p><span className='text-black font-medium py-2'>Name : </span> {college.name}</p>
        <p><span className='text-black font-medium py-2'>Branch : </span> {college.branch}</p>
        <p><span className='text-black font-medium py-2'>Degree : </span> {college.degree}</p>
        <p><span className='text-black font-medium py-2'>CGPA : </span> {college.CGPA}</p>
        <p><span className='text-black font-medium py-2'>Start : </span> {college.start}</p>
        <p><span className='text-black font-medium py-2'>End : </span> {college.end}</p>
      </div>
    );
}

const ProjectDetails = ({ projects }) => {
    return (
        <>
        {projects.map((project) => (
            <div className="p-4 rounded-md shadow-md m-2">
                <p><span className='text-black font-medium py-2'>Name : </span> {project.project_title}</p>
                <p><span className='text-black font-medium py-2'>Description : </span> {project.short_description}</p>
                <p><span className='text-black font-medium py-2'>Tech Stack : </span> {project.tech_stack}</p>
                <p><span className='text-black font-medium py-2'>Time Duration : </span> {project.time_duration.duration_months === 0 ? 'Not specified': `${project.time_duration.start} - ${project.time_duration.end} (${project.time_duration.duration_months} months)`}</p>
            </div>
        ))}
        </>
    );
}

const ExperienceDetails = ({ experiences }) => {
    return (
        <>
        {experiences.map((experience) => (
            <div className='p-4 rounded-md shadow-md'>
                 <p><span className='text-black font-medium py-2'>Name : </span> {experience.organisation}</p>
                 <p><span className='text-black font-medium py-2'>Role : </span> {experience.role}</p>
                <p><span className='text-black font-medium py-2'>Description : </span> {experience.short_description}</p>
                <p><span className='text-black font-medium py-2'>Tech Stack : </span> {experience.tech_stack}</p>
                <p><span className='text-black font-medium py-2'>Time Duration : </span> {experience.time_duration.duration_months === 0 ? 'Not specified': `${experience.time_duration.start} - ${experience.time_duration.end} (${experience.time_duration.duration_months} months)`}</p>
            </div>
        ))}
        </>
    );
}



const TabContent = ({ selectedTab,candidate }) => {
    switch (selectedTab) {
      case 'college':
        return <CollegeDetails college={candidate.college} />;
      case 'projects':
        return <ProjectDetails projects={candidate.projects} />;
      case 'experience':
        return <ExperienceDetails experiences={candidate.professional_experience} />;
      default:
        return null;
    }
};
  

const CustomModal = ({modalIsOpen,closeModal,selectedCandidate}) => {

    const [selectedTab, setSelectedTab] = useState('college'); // Default selected tab
    
    const changeTab = (tab) => {
        setSelectedTab(tab);
      };
    
    
    return (
        <Modal isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        style={customStyles}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md w-[800px] h-[500px] overflow-y-auto"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75"
        >
        {selectedCandidate && (
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gray-700 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                {getInitials(selectedCandidate.name)}
              </div>
              <h2 className="text-black font-bold ml-4">{selectedCandidate.name}</h2>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => changeTab('college')}
                className={`${
                  selectedTab === 'college' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
                } py-2 px-4 rounded`}
              >
                College
              </button>
              <button
                onClick={() => changeTab('projects')}
                className={`${
                  selectedTab === 'projects' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
                } py-2 px-4 rounded`}
              >
                Projects
              </button>
              <button
                onClick={() => changeTab('experience')}
                className={`${
                  selectedTab === 'experience' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
                } py-2 px-4 rounded`}
              >
                Experience
              </button>
            </div>
            <TabContent selectedTab={selectedTab} candidate={selectedCandidate} />
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={closeModal}>&#10006;</button>
          </div>
        )}
      </Modal>
    )
  };



const CandidateCard = ({candidate,onOpenModal}) => {

    return (
        <div className="flex justify-between items-center p-4 w-[85%] mx-auto">
        <div>
            <h3 className='w-[15rem]'>{candidate.name}</h3>
        </div>
        <div>
            <p className='w-[15rem]'>{parseFloat(candidate.score*100).toFixed(2)} %</p>
        </div>
        <div>
            <p className='w-[15rem]'>Resume Link</p>
        </div>
        <div>
            <p className='w-[15rem]'><a href="#" onClick={onOpenModal} className="text-purple-500 hover:text-purple-700 cursor-pointer">
                View Details
                </a>
            </p>
        </div>
        </div>
    )
}
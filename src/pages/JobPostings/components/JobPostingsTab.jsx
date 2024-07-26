import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobPostingsTab({ serviceType }) {
  const navigate = useNavigate();

  // const handleTab = (newTab) => {
  //   setServiceType(newTab);
  // };

  return (
    <div className="job-postings__div">
      <div className="job-postings__tab-button-div">
        {/* <button
          className={`job-postings__tab-button ${serviceType === 'jobs' ? 'active' : ''}`}
          onClick={() => handleTab('jobs')}
          type="button"
        >
          Jobs
        </button>
        <button
          className={`job-postings__tab-button ${serviceType === 'services' ? 'active' : ''}`}
          onClick={() => handleTab('services')}
          type="button"
        >
          Services
        </button> */}
        <h3 className="job-postings__tab-button-title">{serviceType === 'jobs' ? 'Job Postings' : 'Service Posting'}</h3>
      </div>
      <button
        className="job-postings__post-button"
        onClick={() => navigate('/add-job-posting')}
        type="button"
      >
        Post Jobs/Services
      </button>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddJobPostingsTab({ serviceType }) {
  const navigate = useNavigate();

  return (
    <div className="job-postings__div job-postings__div--addPost">
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
        <h3 className="job-postings__tab-button-title">{serviceType === 'jobs' ? 'Add Job Posting' : 'Add Service Posting'}</h3>
      </div>
      <button
        className="job-postings__post-button"
        onClick={() => navigate('/job-postings')}
        type="button"
      >
        View Jobs/Services
      </button>
    </div>
  );
}

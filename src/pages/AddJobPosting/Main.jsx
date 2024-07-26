import React, { useState } from 'react';
import AdPanel from '../../components/AdPanel';
import AddJobPostingsTab from './components/AddJobPostingsTab';
import DisplayPostingForms from './components/DisplayPostingForms';
import JobPostingsToggleButton from '../JobPostings/components/JobPostingsToggleButton';

export default function Main() {
  const [serviceType, setServiceType] = useState('jobs');

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <JobPostingsToggleButton setServiceType={setServiceType} />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <div className="main-section__mobile-div">
            <JobPostingsToggleButton setServiceType={setServiceType} />
          </div>
          <AddJobPostingsTab setServiceType={setServiceType} serviceType={serviceType} />
          <DisplayPostingForms serviceType={serviceType} />
        </div>
      </main>
    </div>
  );
}

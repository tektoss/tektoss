import React from 'react';
import AddJobForm from './AddJobForm';
import AddServiceForm from './AddServiceForm';

export default function DisplayPostingForms({ serviceType }) {
  return (
    <div className="row g-2">
      {(serviceType === 'jobs') && <AddJobForm />}
      {(serviceType === 'services') && <AddServiceForm />}
    </div>
  );
}

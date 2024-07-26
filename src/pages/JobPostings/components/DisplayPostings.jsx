import React from 'react';
import JobsContent from './JobsContent';
import ServiceContent from './ServiceContent';

export default function DisplayPostings({ serviceType }) {
  return (
    <div className="row g-2">
      {(serviceType === 'jobs') && <JobsContent />}
      {(serviceType === 'services') && <ServiceContent />}
    </div>
  );
}

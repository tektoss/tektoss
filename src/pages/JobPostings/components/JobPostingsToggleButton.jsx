import React, { useState } from 'react';

export default function JobPostingsToggleButton({ setServiceType }) {
  const [itemType, setType] = useState('Jobs');

  const handleToggle = () => {
    if (itemType === 'Jobs') {
      setType('Services');
      setServiceType('services');
      // dispatch(setItemType('services'));
    }
    if (itemType === 'Services') {
      setType('Jobs');
      setServiceType('jobs');
      // dispatch(setItemType('jobs'));
    }
  };

  const setToJobs = () => {
    setType('Jobs');
    setServiceType('jobs');
    // dispatch(setItemType('services'));
  };

  const setToServices = () => {
    setType('Services');
    setServiceType('services');
    // dispatch(setItemType('jobs'));
  };

  return (
    <div className="item-type-button__outer-div">
      <div className="item-type-button">
        <button type="button" onClick={handleToggle} className={`item-type-button__top-button ${itemType === 'Services' ? 'cars' : ''}`}>{itemType}</button>
        <div className="item-type-button__bottom-button-div">
          <button type="button" onClick={setToJobs} className="item-type-button__bottom-button-left">Jobs</button>
          <button type="button" onClick={setToServices} className="item-type-button__bottom-button-right">Services</button>
        </div>
      </div>
    </div>
  );
}

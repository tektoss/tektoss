import React, { useState } from 'react';
import MultiSelectDropDown from './MultiSelectDropDown';
import fetchLocation from '../../../util/fetchLocation';
import { handleSubmitService } from '../utils/submitJob';
import useGetLoginInfo from '../../../Hooks/useGetLoginInfo';

export default function AddServiceForm() {
  const initialState = {
    Expertise: [],
    PhoneNumber: '',
    consultType: 'PersonnelConsultant',
    consultantEmail: '',
    details: '',
    postedFrom: 'Web',
    serviceType: '',
    status: 'active',
    companyName: '',
    address: '',
    viewCount: [],
  };

  const [skillSet, setSkillSet] = useState([]);
  const [service, setService] = useState(initialState);
  const [locationData, setLocationData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useGetLoginInfo();

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setService({ ...service, [name]: value, Expertise: skillSet });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = fetchLocation(locationData, setLocationData);
    const userData = { ...data, ...userInfo };
    await handleSubmitService(service, userData);
    setSkillSet([]);
    setService(initialState);
    setIsLoading(false);
  };

  return (
    <form
      className="new-item-form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="row g-4">
        {/* <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="service-consult-type" className="new-item-form__label">
              Consult Type
              <span>*</span>
            </label>
            <input
              id="service-consult-type"
              className="new-item-form__input"
              placeholder="eg. Consult Type"
              name="consultType"
              value={service.consultType}
              onChange={handleFormChange}
            />
          </div>
        </div> */}
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="job-company-name" className="new-item-form__label">
              Your Name/Company
              <span>*</span>
            </label>
            <input
              id="job-company-name"
              className="new-item-form__input"
              placeholder="Eva's Nail Painting/Plumbing"
              name="companyName"
              value={service.companyName}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="phone" className="new-item-form__label">
              Phone No.
            </label>
            <input
              id="phone"
              className="new-item-form__input"
              placeholder="Phone Number"
              name="PhoneNumber"
              value={service.PhoneNumber}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="email" className="new-item-form__label">
              Email Address
            </label>
            <input
              id="email"
              className="new-item-form__input"
              placeholder="Email Address"
              name="consultantEmail"
              value={service.consultantEmail}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="address" className="new-item-form__label">
              Location Address
              <span>*</span>
            </label>
            <input
              id="address"
              className="new-item-form__input"
              placeholder="2200 N High Street, Suite 330 New York, NY"
              name="address"
              value={service.address}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__input-div">
            <label htmlFor="education" className="new-item-form__label">Choose Your Expertise</label>
            <MultiSelectDropDown skillSet={skillSet} setSkillSet={setSkillSet} />
          </div>
        </div>
        {/* <GeoGetter location={location} setLocation={setLocation} /> */}
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>
                Skill Blurb
                <span>*</span>
              </h6>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Please describe the job"
              name="details"
              value={service.details}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <button
            type="submit"
            className="job-postings__submit-button"
          >
            {isLoading ? 'Loading' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}

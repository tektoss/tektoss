import React, { useState } from 'react';
import { educationLevels, travelRequired } from '../utils/arraysConstants';
import selectJobTitle from '../utils/selectJobType';
import { handleSubmitJob } from '../utils/submitJob';
import useGetLoginInfo from '../../../Hooks/useGetLoginInfo';
import fetchLocation from '../../../util/fetchLocation';

export default function AddJobForm() {
  const initialState = {
    name: '',
    postedFrom: 'Web',
    phoneNumber: '',
    companyEmail: '',
    consultType: 'JobPosting',
    externalLink: '',
    jComBenefit: '',
    jDescription: '',
    jExpectation: '',
    jMinEducation: 'No education needed',
    jcomBlurb: '',
    jobType: '',
    jtravelReq: 'No travel needed',
    location: '',
    salary: '',
    status: 'active',
    viewCount: [], //
    vendor: {}, //
    address: '',
    Company: '',
  };

  const [job, setJob] = useState(initialState);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [locationData, setLocationData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useGetLoginInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = fetchLocation(locationData, setLocationData);
    const userData = { ...data, ...userInfo };
    await handleSubmitJob(job, selectedOptions, userData);
    setJob(initialState);
    setSelectedOptions([]);
    setIsLoading(false);
  };

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <form
      className="new-item-form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="row g-4">
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="job-title" className="new-item-form__label">
              Job Title
              <span>*</span>
            </label>
            <input
              id="job-title"
              className="new-item-form__input"
              placeholder="eg. Data Scientist"
              name="name"
              value={job.name}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="Company" className="new-item-form__label">
              Company Name
              <span>*</span>
            </label>
            <input
              id="Company"
              className="new-item-form__input"
              placeholder=""
              name="Company"
              value={job.Company}
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
              name="phoneNumber"
              value={job.phoneNumber}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="email" className="new-item-form__label">
              Company Email
            </label>
            <input
              id="email"
              className="new-item-form__input"
              placeholder="Email Address"
              name="companyEmail"
              value={job.companyEmail}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="location" className="new-item-form__label">
              Job Location
              <span>*</span>
            </label>
            <input
              id="location"
              className="new-item-form__input"
              placeholder="Job Location"
              name="address"
              value={job.address}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="salary" className="new-item-form__label">
              Salary $
              <span>*</span>
            </label>
            <input
              id="salary"
              className="new-item-form__input"
              placeholder="Salary eg. 12/hr - 15/hr or 35,000-45,000"
              name="salary"
              value={job.salary}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="link" className="new-item-form__label">
              Application Link
              <span>*</span>
            </label>
            <input
              id="link"
              className="new-item-form__input"
              placeholder="Job external link (required)"
              name="externalLink"
              value={job.externalLink}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="travel" className="new-item-form__label">Choose Job Nature</label>
            <select
              id="travel"
              className="new-item-form__input"
              aria-label="Default select example"
              name="jtravelReq"
              value={job.jtravelReq}
              onChange={handleFormChange}
            >
              {travelRequired().map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="education" className="new-item-form__label">Min. Education Needed</label>
            <select
              id="education"
              className="new-item-form__input"
              aria-label="Default select example"
              name="jMinEducation"
              value={job.jMinEducation}
              onChange={handleFormChange}
            >
              {educationLevels().map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__input-div">
            <label htmlFor="education" className="new-item-form__label">Job Type</label>
            <div className="job-postings__checkbox-outer-div">
              <div className="job-postings__checkbox-div">
                <input
                  name="Contract"
                  type="checkbox"
                  onChange={(e) => selectJobTitle(e, setSelectedOptions)}
                />
                <h6>Contract</h6>
              </div>
              <div className="job-postings__checkbox-div">
                <input
                  name="Onsite"
                  type="checkbox"
                  onChange={(e) => selectJobTitle(e, setSelectedOptions)}
                />
                <h6>Onsite</h6>
              </div>
              <div className="job-postings__checkbox-div">
                <input
                  type="checkbox"
                  name="Freelance"
                  onChange={(e) => selectJobTitle(e, setSelectedOptions)}
                />
                <h6>Freelance</h6>
              </div>
              <div className="job-postings__checkbox-div">
                <input
                  type="checkbox"
                  name="Full-Time"
                  onChange={(e) => selectJobTitle(e, setSelectedOptions)}
                />
                <h6>Full-Time</h6>
              </div>
              <div className="job-postings__checkbox-div">
                <input
                  type="checkbox"
                  name="Part-Time"
                  onChange={(e) => selectJobTitle(e, setSelectedOptions)}
                />
                <h6>Part-Time</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>
                Job Description
                <span>*</span>
              </h6>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Please describe the job"
              name="jDescription"
              value={job.jDescription}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>
                Skills and Technical Requirement
                <span>*</span>
              </h6>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Technical and other expectations from applicants"
              name="jExpectation"
              value={job.jExpectation}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>
                Compensations and Other Benefits
                <span>*</span>
              </h6>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Please give any relevant compensations and Benefits associated with the job"
              name="jComBenefit"
              value={job.jComBenefit}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>
                Company Blurb
                <span>*</span>
              </h6>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Give an Overview of your company"
              name="jcomBlurb"
              value={job.jcomBlurb}
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

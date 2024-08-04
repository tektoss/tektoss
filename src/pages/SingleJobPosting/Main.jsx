import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from '@firebase/firestore';
import ReactTimeAgo from 'react-time-ago';
import { useSelector } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import { db } from '../../config/firebaseConfig';
import Loader from '../../components/Loader';
import EmptyPosting from './components/EmptyPosting';
import { selectAuthState } from '../../redux/slice/authSlice';
import DeleteModal from './components/DeleteModal';

export default function Main() {
  const { id } = useParams();
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;

  const [posting, setPosting] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fetchPosting = async () => {
    setLoading(true);
    const docRef = doc(db, 'Job', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('data snap', data);
      setPosting(data);
      setLoading(false);
    } else {
      setPosting({});
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleNavigate = (link) => {
    const url = link;
    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchPosting();
  }, [id]);

  if (loading) {
    return (
      <div className="main-section-div">
        <main className="main-section d-flex justify-content-between">
          <div className="main-section__left-div">
            <AdPanel />
          </div>
          <div className="main-section__right-div">
            <Loader />
          </div>
        </main>
      </div>
    );
  }

  if (!loading && !posting?.name) {
    return (
      <div className="main-section-div">
        <main className="main-section d-flex justify-content-between">
          <div className="main-section__left-div">
            <AdPanel />
          </div>
          <div className="main-section__right-div">
            <EmptyPosting />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="main-section-div">
        <main className="main-section d-flex justify-content-between">
          <div className="main-section__left-div">
            <AdPanel />
          </div>
          <div className="main-section__right-div">
            <ContentInfoBox>Job Posting</ContentInfoBox>
            <div>
              <div className="job-postings__single-post-title-div">
                <h2 className="job-postings__single-post-title">{posting.name}</h2>
              </div>
              <div className="job-postings__container-div">
                <div>
                  <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Company Name</h5>
                  <p>{posting.vendor.Company}</p>
                </div>
                <div>
                  <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Job Location</h5>
                  <p>{posting.vendor?.address || posting.vendor?.addresss}</p>
                </div>
                <div>
                  <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Salary</h5>
                  <p>{posting.salary}</p>
                </div>
                {posting?.jtravelReq && (
                  <div>
                    <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Travel Requirement</h5>
                    <p>{posting?.jtravelReq}</p>
                  </div>
                )}
                <div>
                  <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Job Type</h5>
                  <div className="job-postings__job-type-div">
                    {
                      posting.jobType.split(', ').map((type) => (
                        <div className="job-postings__job-type">{type}</div>
                      ))
                    }
                  </div>
                </div>
                <div>
                  <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Time Posted</h5>
                  <p><ReactTimeAgo date={posting.datePosted.toDate()} locale="en-US" /></p>
                </div>
              </div>
              {posting?.jMinEducation && (
                <div>
                  <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Minimum Level of Education Required</h5>
                  <p>{posting?.jMinEducation}</p>
                </div>
              )}
              <div className="job-postings__text-div">
                <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Job Description</h5>
                <p>
                  {posting.jDescription}
                </p>
              </div>
              <div className="job-postings__text-div">
                <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Job Expectations and Duties</h5>
                <p>
                  {posting.jExpectation}
                </p>
              </div>
              <div className="job-postings__text-div">
                <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Compensation and Other Benefits</h5>
                <p>
                  {posting.jComBenefit}
                </p>
              </div>
              <div className="job-postings__text-div">
                <h5 style={{ color: '#511989', fontWeight: 'bold' }}>Company Blurb</h5>
                <p>
                  {posting.jcomBlurb}
                </p>
              </div>
              <div>
                <div className="job-postings__contact-detail-title-div">
                  <h4>Contact Details</h4>
                </div>
                <div className="job-postings__contact-detail-div">
                  {posting?.phoneNumber && (
                    <div>
                      <h6>Phone Number</h6>
                      <p>{posting?.phoneNumber}</p>
                    </div>
                  )}
                  {posting?.companyEmail && (
                    <div>
                      <h6>Company Email</h6>
                      <p>{posting.companyEmail}</p>
                    </div>
                  )}
                  <div>
                    {/* <h6>External Link</h6> */}
                    <button
                      className="job-postings__web-link-button"
                      onClick={() => handleNavigate(posting.externalLink)}
                      type="button"
                    >
                      Apply here
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {(uid === posting.vendor.uid) && (
                  <button
                    className="job-postings__delete-button"
                    type="button"
                    onClick={() => handleOpenModal()}
                  >
                    Delete Posting
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <DeleteModal show={show} handleClose={handleCloseModal} />
    </>
  );
}

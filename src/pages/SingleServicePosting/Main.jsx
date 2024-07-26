import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from '@firebase/firestore';
import ReactTimeAgo from 'react-time-ago';
import { useSelector } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import { db } from '../../config/firebaseConfig';
import Loader from '../../components/Loader';
import EmptyPosting from '../SingleJobPosting/components/EmptyPosting';
import { selectAuthState } from '../../redux/slice/authSlice';
import DeleteModal from '../SingleJobPosting/components/DeleteModal';

export default function Main() {
  const { id } = useParams();
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;

  const [posting, setPosting] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fetchPosting = async () => {
    setLoading(true);
    const docRef = doc(db, 'Consultants', id);
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

  if (!loading && !posting?.consultType) {
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
            <ContentInfoBox>Service Posting</ContentInfoBox>
            <div>
              <div className="job-postings__single-post-title-div">
                <h2 className="job-postings__single-post-title">{posting.consultType}</h2>
              </div>
              <div className="job-postings__container-div">
                <div>
                  <h5>Company Name</h5>
                  <p>{posting.vendor.Company}</p>
                </div>
                <div>
                  <h5>Job Location</h5>
                  <p>{posting.vendor?.address || posting.vendor?.addresss}</p>
                </div>
                <div>
                  <h5>Expertise</h5>
                  <div className="job-postings__job-type-div">
                    {
                    posting.Expertise.split(', ').map((type) => {
                      if (!type) {
                        return null;
                      }

                      return (<div className="job-postings__job-type">{type}</div>);
                    })
                  }
                  </div>
                </div>
                <div>
                  <h5>Time Posted</h5>
                  <p><ReactTimeAgo date={posting.datePosted.toDate()} locale="en-US" /></p>
                </div>
              </div>
              <div className="job-postings__text-div">
                <h5>Job Description</h5>
                <p>
                  {posting.details}
                </p>
              </div>
              <div>
                <div className="job-postings__contact-detail-title-div">
                  <h4>Contact Details</h4>
                </div>
                <div className="job-postings__contact-detail-div">
                  {posting?.PhoneNumber && (
                  <div>
                    <h6>Phone Number</h6>
                    <p>{posting?.PhoneNumber}</p>
                  </div>
                  )}
                  {posting?.consultantEmail && (
                  <div>
                    <h6>Company Email</h6>
                    <p>{posting.consultantEmail}</p>
                  </div>
                  )}
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

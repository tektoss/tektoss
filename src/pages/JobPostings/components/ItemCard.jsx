import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import { useNavigate } from 'react-router-dom';
import profilePhoto from '../../../assets/images/dummy-image.jpg';

export default function ItemCard({ cardDetail, isService }) {
  // console.log('cardDetail', cardDetail);
  const navigate = useNavigate();

  if (isService) {
    return (
      <button
        type="button"
        className="job-postings__card-div"
        onClick={() => navigate(`/single-service-posting/${cardDetail.id}`)}
      >
        <div className="job-postings__image-div">
          <img alt="company profile" src={cardDetail.vendor.photoUrl || profilePhoto} className="job-postings__image" />
        </div>
        <div className="job-postings__info-div">
          {/* <h6>{cardDetail.consultType}</h6> */}
          <h5 style={{ color: '#511989', fontWeight: 'bold' }}>{cardDetail.vendor.Company}</h5>
          <p>{`${cardDetail?.location?.town}, ${cardDetail?.location?.state}`}</p>
          <p>
            Posted
            {' '}
            <span><ReactTimeAgo date={cardDetail.datePosted.toDate()} locale="en-US" /></span>
          </p>
          {
            cardDetail?.Expertise && (
              <div className="job-postings__card-inner-div">
                {
                  cardDetail.Expertise.split(', ').map((item) => {
                    if (!item) {
                      return null;
                    }

                    return (
                      <div className="job-postings__job-type">
                        {item}
                      </div>
                    );
                  })
                }
              </div>
            )
          }
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="job-postings__card-div"
      onClick={() => navigate(`/single-job-posting/${cardDetail.id}`)}
    >
      <div className="job-postings__image-div">
        <img alt="company profile" src={cardDetail.vendor.photoUrl || profilePhoto} className="job-postings__image" />
      </div>
      <div className="job-postings__info-div">
        <h6 style={{ color: '#511989', fontWeight: 'bold' }}>{cardDetail.name}</h6>
        <h6 style={{ fontWeight: 'bold' }}>{cardDetail.vendor.Company}</h6>
        <p>{cardDetail.salary}</p>
        <p>{`${cardDetail?.location?.town}, ${cardDetail?.location?.state}`}</p>
        <p>
          Posted
          {' '}
          <span><ReactTimeAgo date={cardDetail.datePosted.toDate()} locale="en-US" /></span>
        </p>
        <div className="job-postings__card-inner-div">
          {
            cardDetail.jobType.split(', ').map((item) => (
              <div className="job-postings__job-type">
                {item}
              </div>
            ))
          }
        </div>
      </div>
    </button>
  );
}

import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../../redux/slice/authSlice';

export default function ChatCard({ mssg }) {
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const isMe = uid === mssg.senderId;
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [mssg.message]);

  return (
    <div
      ref={ref}
      className={isMe ? 'chat-card d-flex chat-card--alt' : 'chat-card d-flex'}
    >
      {/* <div className="chat-card__image-div">
        {
          (!mssg?.image)
          && (
            <Link to={`/user-account/${mssg.senderId}`}>
              <img src={profile} alt="user profile" className="chat-card__image" />
            </Link>
          )
        }
        {
          (mssg?.image)
          && (
            <Link to={`/user-account/${mssg.senderId}`}>
              <img src={mssg.senderImage} alt="user profile" className="chat-card__image" />
            </Link>
          )
        }
      </div> */}
      <div className="chat-card__message-div">
        <p className="chat-card__message">
          {mssg.message}
        </p>
        {(mssg?.itemId)
          && (
          <div className="chat-card__product-link-div">
            <Link to={`/single-item/${mssg?.itemId}`} className="chat-card__product-link">
              {mssg?.itemName.length > 15 ? `link to ${mssg?.itemName.slice(0, 14).trim().concat('...')}` : `link to ${mssg?.itemName}`}
            </Link>
          </div>
          )}
      </div>
    </div>
  );
}

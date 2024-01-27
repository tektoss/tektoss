import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { doc, getDoc } from '@firebase/firestore';
import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../redux/slice/authSlice';
import { db } from '../../../config/firebaseConfig';

export default function ChatCard({ mssg }) {
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const isMe = uid === mssg.senderId;
  const ref = useRef();
  const [mainCatValue, setMainCatValue] = useState(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [mssg.message]);

  const productRef = doc(db, 'products', mssg?.linkid);
  const getProductMainCat = async () => {
    const docSnapshot = await getDoc(productRef);
    if (docSnapshot.exists()) {
      const { mainCat } = docSnapshot.data().mainCat;
      setMainCatValue(mainCat);
    }
  };
  useEffect(() => {
    getProductMainCat();
  }, []);
  return (
    <div
      ref={ref}
      className={isMe ? 'chat-card d-flex chat-card--alt' : 'chat-card d-flex'}
    >
      <div className="chat-card__image-div">
        {
          (mssg?.senderImage === '')
          && (
            <Link to={`/user-account/${mssg.senderId}`}>
              <img src={profile} alt="user profile" className="chat-card__image" />
            </Link>
          )
        }
        {
          !(mssg?.senderImage === '')
          && (
            <Link to={`/user-account/${mssg.senderId}`}>
              <img src={mssg.senderImage} alt="user profile" className="chat-card__image" />
            </Link>
          )
        }
      </div>
      <div className="chat-card__message-div">
        <p className="chat-card__message">
          {mssg.message}
        </p>
        {(mssg?.linkId)
          && (
          <div className="chat-card__product-link-div">
            <Link to={mainCatValue === 'vehicle' ? `/single-vehicle/${mssg?.linkId}` : `/single-electronic/${mssg?.linkId}`} className="chat-card__product-link">
              {mssg?.chatItem.length > 15 ? `link to ${mssg?.chatItem.slice(0, 14).trim().concat('...')}` : `link to ${mssg?.chatItem}`}
            </Link>
          </div>
          )}
      </div>
    </div>
  );
}

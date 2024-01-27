import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import profile from '../../../assets/images/profile.jpg';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function ChatCard({ mssg }) {
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const isMe = uid === mssg.senderId;
  const ref = useRef();
  const [mainCatValue, setMainCatValue] = useState(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [mssg.message]);

  const productRef = mssg?.itemId ? doc(db, 'products', mssg.itemId) : null;

  const getProductMainCat = async () => {
    try {
      const docSnapshot = await getDoc(productRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if ('mainCat' in data) {
          const { mainCat } = data;
          console.log('the category', mainCat);
          setMainCatValue(mainCat);
        } else {
          console.log('mainCat does not exist in the document');
          // Handle the case where mainCat does not exist
          setMainCatValue(null); // or any default value or handling you prefer
        }
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      // Handle the error as needed
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
            <Link to={mainCatValue === 'vehicle' ? `/single-vehicle/${mssg?.itemId}` : `/single-electronic/${mssg?.itemId}`} className="chat-card__product-link">
              {mssg?.itemName.length > 15 ? `link to ${mssg?.itemName.slice(0, 14).trim().concat('...')}` : `link to ${mssg?.itemName}`}
            </Link>
          </div>
          )}
      </div>
    </div>
  );
}

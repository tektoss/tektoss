import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import NotificationsEmpty from './components/NotificationsEmpty';
import { db } from '../../config/firebaseConfig';
import MessagesList from './components/MessagesList';
import Loader from '../../components/Loader';

export default function Main({ uid }) {
  const [notificationsList, setNotificationsList] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const vendorData = docSnap.data();
        setNotificationsList(vendorData?.notifications || []); // Ensure it's always an array
      } else {
        console.log('No such document!');
        setNotificationsList([]); // Set an empty array if no document exists
      }
    } catch (err) {
      console.log(err.message);
      setNotificationsList([]); // Set an empty array in case of error
    } finally {
      setLoading(false); // Ensure loading is set to false in the end
    }
  };

  const resetNewNotifications = async () => {
    try {
      const vendorRef = doc(db, 'vendors', uid);
      await updateDoc(vendorRef, {
        newNotifications: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    resetNewNotifications();

    const notificationsJSON = localStorage.getItem('notificationsCounts');
    const notificationsData = notificationsJSON ? JSON.parse(notificationsJSON) : {};
    const dataJSON = JSON.stringify({
      messageCount: notificationsData?.messageCount || 0,
      notificationCount: 0,
    });
    localStorage.setItem('notificationsCounts', dataJSON);
  }, [uid]); // Add uid as a dependency to rerun effect if uid changes

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Notifications</ContentInfoBox>
          {loading ? (
            <Loader />
          ) : (
            <>
              {notificationsList.length > 0 ? (
                <MessagesList data={notificationsList} />
              ) : (
                <NotificationsEmpty />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

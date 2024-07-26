import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteDoc, doc } from '@firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import { errorToast, successToast } from '../../../utils/Toasts';

export default function DeleteModal({ show, handleClose }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'Consultants', id));

      successToast('Item deleted successfully');

      handleClose();
      navigate('/job-postings');
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>Delete Service Posting</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div">
            <h4>
              Deleting this item is not reversible. Do you still want to proceed?
            </h4>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__discard-button" type="button" onClick={handleDelete}>
          Yes, Delete Post
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

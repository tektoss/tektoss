import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestList from './RequestList';

export default function DisplayRequests() {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  return (
    <>
      <div className="request__search-bar-div">
        <input
          className="request__search-bar"
          placeholder="Filter by key word"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="request__search-bar-button"
          type="button"
          onClick={() => navigate('/add-request-item')}
        >
          Add New Request
        </button>
      </div>
      <RequestList search={search} />
    </>
  );
}

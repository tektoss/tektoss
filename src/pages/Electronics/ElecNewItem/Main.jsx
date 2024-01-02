import React from 'react';
import AdPanel from '../../../components/AdPanel';
import ContentInfoBox from '../../../components/ContentInfoBox';
import FormItems from './components/FormItems';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Enter Your Electronic Item Details Below</ContentInfoBox>
          <FormItems />
        </div>
      </main>
    </div>
  );
}

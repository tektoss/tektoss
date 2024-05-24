import React from 'react';
import { Helmet } from 'react-helmet-async';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import AuthNav from '../../auth/components/AuthNav';
import AuthFooter from '../../auth/components/AuthFooter';

export default function ProcessPayment() {
  return (
    <>
      <Helmet>
        <title>{`Process Payment | ${appName}`}</title>
        <meta
          name="description"
          content={`A Multi-purpose Place.
              Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/new-item" />
      </Helmet>
      <AuthNav />
      <Main />
      <AuthFooter />
    </>
  );
}

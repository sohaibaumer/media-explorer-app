import React from 'react';
import ExploreNavigation from '../components/ExploreNavigation';

const AccountPage = () => {
  return (
    <div className="relative w-screen">
      <div className="fixed bottom-0 left-0 z-[1000] md:top-0 md:left-0 md:z-0">
        <ExploreNavigation />
      </div>
    </div>
  );
};

export default AccountPage;

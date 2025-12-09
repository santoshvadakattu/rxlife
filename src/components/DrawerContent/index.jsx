import React from 'react';
import DrawerContentUI from './DrawerContentUI';
import {useSelector} from 'react-redux';

const DrawerContent = () => {
  const {userData, userProfile} = useSelector((state) => state.user);
  return <DrawerContentUI userData={userData} userProfile={userProfile} />;
};

export default DrawerContent;

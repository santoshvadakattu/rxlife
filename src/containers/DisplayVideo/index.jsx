import React from 'react';
import {VideoPlayer} from '../../components';

const DisplayVideo = (props) => {
  const {route} = props;
  const {params} = route;

  return <VideoPlayer item={params?.item} shouldPlayVideo />;
};

export default DisplayVideo;

import React from 'react';

const Video = ({url, title}) => {
  return (
    <iframe width="560" height="315" src={url} frameborder="0" title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  );
};

export default Video;

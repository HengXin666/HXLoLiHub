import React from 'react';
import { useParams } from 'react-router-dom';
import DrawIoPage from '../components/DrawIoPage';

const DrawIoEmbedPage: React.FC = () => {
  const { src } = useParams<{ src: string }>();

  return <DrawIoPage />;
};

export default DrawIoEmbedPage;
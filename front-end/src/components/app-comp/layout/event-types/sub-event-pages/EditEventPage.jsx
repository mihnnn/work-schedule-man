import React from 'react';
import SetUpEvent from './SetUpEvent';
import SetUpAvailability from './SetUpAvailability';
import { useLocation } from 'react-router-dom';

function EditEventPage({ title, setTitle, description, setDescription, suffix, setSuffix, duration, setDuration }) {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tabName = urlParams.get('tabName');

  return (
    <>
      {tabName === 'setup' && (
        <SetUpEvent 
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          suffix={suffix}
          setSuffix={setSuffix}
          duration={duration}
          setDuration={setDuration}
        />

        )}
      {tabName === 'availability' && <SetUpAvailability />}
    </>
  );
}

export default EditEventPage;

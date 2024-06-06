import React from 'react';
import { useAuthContext } from '../../../../../context/AuthContext';
import SetUpEvent from './SetUpEvent';
import SetUpAvailability from './SetUpAvailability';
import { useLocation } from 'react-router-dom';

function EditEventPage() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tabName = urlParams.get('tabName');

  return (
    <>
      {tabName === 'setup' && <SetUpEvent />}
      {tabName === 'availability' && <SetUpAvailability />}
    </>
  );
}

export default EditEventPage;

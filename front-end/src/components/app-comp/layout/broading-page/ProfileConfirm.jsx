import React, { useState, useEffect } from 'react';
import { updateUserInfo } from '../../../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

function ProfileConfirm({ nextStep, previousStep, currentUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hasChanged, setHasChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);



  const handleNameChange = (e) => {
    setName(e.target.value);
    setHasChanged(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setHasChanged(true);
  };


  const handleNextClick = async () => {
    if (hasChanged) {
      dispatch(updateUserInfo({ displayName: name, email }));
      toast.success('Profile updated successfully');
    }
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div className="form-control mb-4">
        <label className="label text-2xl font-bold">Name</label>
        <input
          type="text"
          className="input input-bordered"
          value={name}
          onChange={handleNameChange}
          placeholder="Your Name"
        />
      </div>
      <div className="form-control mb-6">
        <label className="label text-2xl font-bold">Email</label>
        <input
          type="email"
          className="input input-bordered"
          value={email}
          onChange={handleEmailChange}
          placeholder="Your Email"
        />
      </div>
      <div className="flex justify-between">
        <button className="btn" onClick={previousStep}>Back</button>
        <button
          className="btn bg-gray-200 text-black hover:opacity-70 hover:bg-gray-200"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProfileConfirm;

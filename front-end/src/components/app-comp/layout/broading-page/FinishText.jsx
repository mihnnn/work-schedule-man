import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateOnBoardLoad, updateOnboardingStatus, updateOnboardingStatusFail } from '../../../../store/user/userSlice';
import toast from 'react-hot-toast';


function FinishText({ previousStep, currentUser }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleFinish = async () => {  
        try {
            dispatch(updateOnBoardLoad());
            const res = await fetch(`/api/users/onboarding/${currentUser._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            console.log("backend res: ", data);

            if (!res.ok) {
                dispatch(updateOnboardingStatusFail("Failed to update onboarding status"));
            } else {
                dispatch(updateOnboardingStatus(data.hasCompletedBoarding));
                if (currentUser.role === 'Manager') {
                    navigate('/app/dashboard');  
                } else if (currentUser.role === 'Employee') {
                    navigate('/app/team-overview');  
                }
                toast.success("Onboarding completed successfully");
            }
        } catch (error) {
            dispatch(updateOnboardingStatusFail(error));
        }
    } 


    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">All Set!</h2>
            <p className="mb-6 text-xl">Your profile and availability have been set up successfully.</p>
            <p className="mb-6 text-xl">Join a Team or create one in the "Team Management" Tab if you haven't.</p>
            <div className="flex justify-between">
                <button className="btn" onClick={previousStep}>Back</button>
                <button className="btn bg-gray-200 text-black hover:opacity-70 hover:bg-gray-200" onClick={handleFinish}>Finish</button>
            </div>
        </div>
    )
}

export default FinishText

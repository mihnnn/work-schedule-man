import React, { useState } from "react";
import WelcomeText from "./WelcomeText";
import RoleSelection from "./RoleSelection";
import ProfileConfirm from "./ProfileConfirm";
import SetAvailability from "./SetAvailability";
import FinishText from "./FinishText";
import { useSelector } from "react-redux";

const OnboardingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };
  const previousStep = () => {
    setStep(step - 1);
  };
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center text-gray-200">
      <div className="mb-6 fixed top-5 left-5">
        <a href="/" className="flex items-center text-gray-200 hover:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-lg">Back to Home</span>
        </a>
      </div>
      <div className="card w-full max-w-xl bg-gray-600 shadow-lg p-8 gap-2">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-black h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          <div className="flex justify-between text-xs text-gray-500">
            <span className="py-2 text-gray-100">Step {step} of {totalSteps}</span>
          </div>
        </div>

        {step === 1 && <WelcomeText nextStep={nextStep} />}
        {step === 2 && <ProfileConfirm nextStep={nextStep} previousStep={previousStep} currentUser={currentUser} />}
        {step === 3 && <RoleSelection nextStep={nextStep} previousStep={previousStep} currentUser={currentUser} />}
        {step === 4 && <SetAvailability nextStep={nextStep} previousStep={previousStep} currentUser={currentUser} />}
        {step === 5 && <FinishText previousStep={previousStep} currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default OnboardingPage;

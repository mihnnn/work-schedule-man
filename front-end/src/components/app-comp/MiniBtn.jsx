import React from 'react';

function MiniBtn({ icon: Icon, text }) {
  return (
    <div className="flex items-center bg-gray-800 p-2 rounded-lg">
      <Icon className="text-white h-5 w-5" />
      <span className="text-white ml-2">
        {text}
      </span>
    </div>
  );
}

export default MiniBtn;

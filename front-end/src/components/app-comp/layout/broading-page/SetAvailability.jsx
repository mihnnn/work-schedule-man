import React from 'react'

function SetAvailability({ nextStep, previousStep, currentUser }) {
  return (
    <div>
    <h2 className="text-2xl font-bold mb-4">Set Your Availability</h2>
    <div className="form-control mb-4">
      <label className="label text-2xl font-bold">Available Days</label>
      <select className="select select-bordered" multiple>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>
    </div>
    <div className="form-control mb-4">
      <label className="label text-2xl font-bold">Available Time Range</label>
      <input type="time" className="input input-bordered" placeholder="Start Time" />
      <input type="time" className="input input-bordered mt-2" placeholder="End Time" />
    </div>
    <div className="flex justify-between">
      <button className="btn" onClick={previousStep}>Back</button>
      <button className="btn btn-primary" onClick={nextStep}>Next</button>
    </div>
  </div>
  )
}

export default SetAvailability

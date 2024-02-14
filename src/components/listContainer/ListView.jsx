import React from "react";

const ListCreationView = ({ onCancel, onUpdate }) => {
  return (
    <div className="list-creation">
      <h1>List Creation</h1>
      {/* Logic for new list container */}
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
};

export default ListCreationView;

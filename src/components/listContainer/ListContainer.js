import React from "react";

const ListContainer = ({ list, onArrowClick }) => {
  return (
    <div className="list-container">
      {/* <h2>List {list.id}</h2> */}
      <ul>
        {list?.lists?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div className="arrows">
        <img
          src="right-arrow.png"
          alt="Right Arrow"
          onClick={() => onArrowClick("right", list.id)}
        />
        <img
          src="left-arrow.png"
          alt="Left Arrow"
          onClick={() => onArrowClick("left", list.id)}
        />
      </div>
    </div>
  );
};

export default ListContainer;

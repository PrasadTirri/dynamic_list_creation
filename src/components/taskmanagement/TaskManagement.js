import axios from "axios";
import "./taskmanagement.css";
import React, { useState, useEffect } from "react";
import LoadingView from "../loadingView/LoadingView";
import FailureView from "../failureView/FailureView";
import ListCreationView from "./ListCreationView";

const TaskManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [selectedLists, setSelectedLists] = useState(new Set());
  const [listCreateError, setListCreateError] = useState("");
  const [listsData, setListsData] = useState({});

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://apis.ccbp.in/list-creation/lists"
      );
      const result = await response.data;

      const lists = {};
      result?.lists.forEach((item) => {
        if (!lists[item.list_number]) {
          lists[item.list_number] = [];
        }
        lists[item.list_number].push(item);
      });

      setListsData(lists);
      if (error) {
        setError(null);
      }
    } catch (err) {
      console.log({ err });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckbox = (listNumber) => {
    if (selectedLists.has(listNumber)) {
      setSelectedLists((prevSelectedLists) => {
        const updatedLists = new Set(prevSelectedLists);
        updatedLists.delete(listNumber);
        return updatedLists;
      });
    } else {
      setSelectedLists(
        (prevSelectedLists) => new Set([...prevSelectedLists, listNumber])
      );
    }
    setListCreateError("");
  };

  const handleCreateList = () => {
    if (selectedLists.size !== 2) {
      setListCreateError(
        "*You should select exactly 2 lists to create new list"
      );
      return;
    }

    setIsCreatingList(true);
  };

  return (
    <div className="container">
      {isLoading && <LoadingView />}
      {error && <FailureView onRetry={fetchData} />}

      {!isLoading && !error && !isCreatingList && (
        <div>
          <div className="pageHeader">
            <h1>List Creation</h1>
            <button className="primary" onClick={handleCreateList}>
              Create a new List
            </button>
            <p className="errorMessage">{listCreateError}</p>
          </div>
          <div className="listsContainer">
            {Object.keys(listsData)?.map((listNumber) => (
              <div key={listNumber} className="list">
                <div className="listHeader">
                  <input
                    type="checkbox"
                    checked={selectedLists.has(listNumber)}
                    onChange={() => handleCheckbox(listNumber)}
                  />
                  <p>List {listNumber}</p>
                </div>

                {listsData[listNumber].map((item, index) => {
                  return (
                    <li className="listItem" key={index}>
                      <p className="name">{item.name}</p>
                      <p>{item.description}</p>
                    </li>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {isCreatingList && (
        <ListCreationView
          onCancel={() => setIsCreatingList(false)}
          selectedLists={selectedLists}
          listsData={listsData}
          setListsData={setListsData}
        />
      )}
    </div>
  );
};

export default TaskManagement;

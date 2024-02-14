import { useEffect, useState } from "react";

const ListCreationView = ({
  listsData,
  onCancel,
  selectedLists,
  setListsData,
}) => {
  const [newListNumber, setnewListNumber] = useState(null);
  const [selectedListsData, setSelectedListsData] = useState({});

  const totalLists = Object.keys(listsData)?.length + 1;

  useEffect(() => {
    const temp = {};
    Object.keys(listsData)
      .filter((listNumber) => selectedLists.has(listNumber))
      .forEach((listNumber, index) => {
        temp[listNumber] = listsData[listNumber];
      });
    setSelectedListsData(temp);
  }, [listsData, selectedLists, totalLists]);

  const handleMove = (index, listNumber, targetList = null) => {
    let updatedList = { ...selectedListsData };

    const movedItem = updatedList[listNumber].splice(index, 1)[0];
    const tagetListNumber = targetList
      ? Number(targetList)
      : newListNumber ?? totalLists;

    console.log({ tagetListNumber });

    if (!updatedList[tagetListNumber]) {
      updatedList[tagetListNumber] = [];
      setnewListNumber(totalLists);
    }
    updatedList[tagetListNumber] = [movedItem, ...updatedList[tagetListNumber]];

    setSelectedListsData({ ...updatedList });
  };

  const handleUpdate = () => {
    const mergedListData = { ...listsData };
    Object.keys(selectedListsData).forEach((key) => {
      mergedListData[key] = selectedListsData[key];
    });
    console.log({ mergedListData });
    setListsData(mergedListData);
    onCancel();
  };

  return (
    <>
      <div className="listsContainer">
        {[...selectedLists].map((listNumber, index) => {
          if (index === 1) {
            return (
              <>
                <div key={newListNumber} className="list">
                  <div className="listHeader">
                    <p>
                      List {newListNumber ?? totalLists}{" "}
                      {` (${selectedListsData[newListNumber]?.length ?? 0} )`}
                    </p>
                  </div>

                  {selectedListsData[newListNumber]?.map((item, index) => (
                    <li className="listItem" key={item.id}>
                      <p className="name">{item.name}</p>
                      <p>{item.description}</p>
                      <div className="buttons">
                        <div
                          onClick={() =>
                            handleMove(
                              index,
                              newListNumber,
                              [...selectedLists][0]
                            )
                          }
                          className="moveButton moveLeft"
                        >
                          ←{" "}
                        </div>
                        <div
                          onClick={() =>
                            handleMove(
                              index,
                              newListNumber,
                              [...selectedLists][1]
                            )
                          }
                          className="moveButton moveRight"
                        >
                          →{" "}
                        </div>
                      </div>
                    </li>
                  ))}
                </div>

                <div key={listNumber} className="list">
                  <div className="listHeader">
                    <p>
                      List {listNumber}{" "}
                      {` (${selectedListsData[listNumber]?.length})`}
                    </p>
                  </div>

                  {selectedListsData[listNumber]?.map((item, index) => {
                    return (
                      <li className="listItem" key={item.id}>
                        <p className="name">{item.name}</p>
                        <p>{item.description}</p>

                        <div
                          onClick={() => handleMove(index, listNumber)}
                          className="moveButton moveLeft"
                        >
                          ←{" "}
                        </div>
                      </li>
                    );
                  })}
                </div>
              </>
            );
          }

          return (
            <div key={listNumber} className="list">
              <div className="listHeader">
                <p>
                  List {listNumber}{" "}
                  {` (${selectedListsData[listNumber]?.length})`}
                </p>
              </div>

              {selectedListsData[listNumber]?.map((item, index) => {
                return (
                  <li className="listItem" key={item.id}>
                    <p className="name">{item.name}</p>
                    <p>{item.description}</p>
                    <div
                      onClick={() => handleMove(index, listNumber)}
                      className="moveButton moveRight"
                    >
                      →{" "}
                    </div>
                  </li>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="buttonsWrapper">
        <button onClick={onCancel} className="secondary">
          Cancel
        </button>
        <button onClick={handleUpdate} className="primary">
          Update
        </button>
      </div>
    </>
  );
};

export default ListCreationView;

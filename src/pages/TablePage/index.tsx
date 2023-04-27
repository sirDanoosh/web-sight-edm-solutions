import React from "react";
import useTablePage from "./useTablePage";
import SearchIcon from "src/assets/images/search-64.png";
import ArrowIcon from "src/assets/images/arrow-64.png";
import "./index.scss";
import Input from "src/components/Input";
import Button, { BTN_VARIANT } from "src/components/Button";

const TablePage: React.FC<{}> = () => {
  const {
    columnSort,
    columnsName,
    data,
    isLoading,
    searchModalVisible,
    closeSearchModal,
    showSearchModal,
    sortColumnHandler,
    submitSearch,
    updateSearchKeyWord,
  } = useTablePage();

  return (
    <div className="table-page">
      <table>
        <thead>
          <tr>
            {columnsName.map((column, index) => (
              <th key={index} onClick={() => sortColumnHandler(index)}>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    showSearchModal(index);
                  }}
                >
                  <img
                    src={SearchIcon}
                    className="search-icon"
                    alt="search-icon"
                  />
                </span>
                <span>{column}</span>
                {columnSort.id === index && (
                  <span>
                    <img
                      src={ArrowIcon}
                      className={`direction-icon ${
                        columnSort.dir === "asc"
                          ? "down"
                          : columnSort.dir === "desc"
                          ? "up"
                          : ""
                      }`}
                      alt="sort-icon"
                    />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            data!.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td title={row.name}>{row.name}</td>
                <td title={row.detail}>{row.detail}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {searchModalVisible && (
        <div className="search-modal">
          <Input
            onChange={updateSearchKeyWord}
            placeholder={`search keyword ...`}
          />
          <div className="search-modal__btn-wrapper">
            <Button
              onClick={submitSearch}
              title="Search"
              variant={BTN_VARIANT.PRIMARY}
            />
            <Button
              onClick={closeSearchModal}
              title="Cancel"
              variant={BTN_VARIANT.WARNING}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePage;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { ChangeEvent, useEffect, useState } from "react";

export interface IViewerData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IEditorData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const useTablePage = () => {
  const [data, setData] = useState<
    Array<{
      id: number;
      name: string;
      detail: string;
    }>
  >([]);
  const [columnsName, setColumnsName] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [columnSort, setColumnSort] = useState<{
    id: number;
    dir: "asc" | "desc" | null;
  }>({
    id: 0,
    dir: "asc",
  });
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const [searchColumnName, setSearchColumnName] = useState<string>("");

  const userType = window.location.search.split("?")[1];

  function sortColumnHandler(colId: number) {
    if (columnSort.id === colId) {
      setColumnSort((prev) => ({
        ...prev,
        dir: prev.dir === "asc" ? "desc" : prev.dir === "desc" ? null : "asc",
      }));
    } else {
      setColumnSort({
        id: colId,
        dir: "asc",
      });
    }
  }

  function showSearchModal(columnId: number) {
    setSearchModalVisible(true);
    setSearchColumnName(columnsName[columnId]);
  }

  function closeSearchModal() {
    setSearchModalVisible(false);
    setSearchKeyWord("");
  }

  function submitSearch() {
    fetchData();
    setSearchModalVisible(false);
  }

  function updateSearchKeyWord(e: ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(e.target.value);
  }

  function fetchData() {
    setData([]);
    setIsLoading(true);
    if (userType === "editor") {
      let url = "https://jsonplaceholder.typicode.com/users?";
      if (columnSort.dir) {
        url += `_sort=${columnsName[columnSort.id]}&_order=${columnSort.dir}`;
      }
      if (searchKeyWord) {
        url += `&${searchColumnName}_like=${searchKeyWord}`;
      }

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          json.map((item: IEditorData) => {
            setData((prev) => [
              ...prev,
              {
                id: item.id,
                name: item.name,
                detail: item.email,
              },
            ]);
          });
          setColumnsName(["id", "name", "email"]);
          setIsLoading(false);
        });
    } else {
      let url = "https://jsonplaceholder.typicode.com/todos?_page=1&";
      if (columnSort.dir) {
        url += `_sort=${columnsName[columnSort.id]}&_order=${columnSort.dir}`;
      }
      if (searchKeyWord) {
        url += `&${searchColumnName}_like=${searchKeyWord}`;
      }
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          json.map((item: IViewerData) => {
            setData((prev) => [
              ...prev,
              {
                id: item.id,
                name: item.title,
                detail: item.completed.toString(),
              },
            ]);
          });
          setColumnsName(["id", "title", "completed"]);
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (!userType) {
      return;
    }
    fetchData();
  }, [userType, columnSort]);

  return {
    data,
    isLoading,
    columnsName,
    columnSort,
    searchModalVisible,
    sortColumnHandler,
    showSearchModal,
    closeSearchModal,
    submitSearch,
    updateSearchKeyWord,
  };
};

export default useTablePage;

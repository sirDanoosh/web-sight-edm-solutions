import LoginPage from "src/pages/LoginPage";
import TablePage from "src/pages/TablePage";

interface IUseApp {
  Component: React.FC<{}>;
}

const useApp: () => IUseApp = () => {
  const path = window.location.pathname;

  return {
    Component: path.toLowerCase() === "/table" ? TablePage : LoginPage,
  };
};

export default useApp;

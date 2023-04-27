import useApp from "./useApp";
import "./index.scss";

const App: React.FC<{}> = () => {
  const { Component } = useApp();

  return (
    <div className="container">
      <Component />
    </div>
  );
};

export default App;

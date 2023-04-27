import useApp from "./useApp";

const App: React.FC<{}> = () => {
  const { Component } = useApp();

  return <Component />;
};

export default App;

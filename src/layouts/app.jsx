const LayoutApp = ({ children }) => {
  return (
    <div id="app-container">
      {/* {loading && <ComponentLoading text={loadMessage} theme={theme} />} */}
      {/* <NavBar /> */}
      <main>
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default LayoutApp;

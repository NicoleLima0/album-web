const LayoutPublic = ({ children }) => {
  return (
    <>
      {/* {loading && <ComponentLoading text={loadMessage} theme={theme} />} */}
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default LayoutPublic;

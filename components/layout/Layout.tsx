import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ margin: "0 auto", maxWidth: '960px' }}>{children}</div>
    </>
  );
};

export default Layout;

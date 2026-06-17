import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-area">
        <Header />

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
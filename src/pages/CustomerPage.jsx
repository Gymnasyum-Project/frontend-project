import SidebarComponent from "../components/common/sidebar/SidebarComponent";
import HeaderComponent from "../components/common/header/HeaderComponent";
import CustomerComponent from "../components/customer/CustomerComponent";
import "../styles/layout.css";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

function CustomerPage() {
  const [sidebar, setSidebar] = useState(false);
  const title = "Customer Page";
  const subTitle = "Kelola dan pantau customer";

  return (
    <div className="page-layout">
      <aside className={`sidebar ${sidebar ? "open" : ""}`}>
        <SidebarComponent />
      </aside>
      {sidebar && (
        <div
          className="overlay"
          onClick={() => {
            setSidebar(false);
          }}
        />
      )}

      <main>
        <div className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebar((prev) => !prev)}
            aria-label="Buka menu"
          >
            <IoMenu size={24} />
          </button>
          <HeaderComponent title={title} subTitle={subTitle} />
        </div>

        <CustomerComponent />
      </main>
    </div>
  );
}

export default CustomerPage;

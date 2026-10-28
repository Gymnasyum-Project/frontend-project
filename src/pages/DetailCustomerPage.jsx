import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import SidebarComponent from "../components/common/sidebar/SidebarComponent";
import HeaderComponent from "../components/common/header/HeaderComponent";
import DetailCustomerComponent from "../components/detail_customer/DetailCustomerComponent";

function DetailCustomerPage() {
  const [sidebar, setSidebar] = useState(false);

  const title = "Detail Customer";
  const subTitle = "Profil customer dan analisis resiko";

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
        <DetailCustomerComponent />
      </main>
    </div>
  );
}

export default DetailCustomerPage;

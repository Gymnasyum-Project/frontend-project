import SidebarComponent from "../components/common/sidebar/SidebarComponent";
import HeaderComponent from "../components/common/header/HeaderComponent";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import PackageComponent from "../components/paket/PackageComponent";

function PackagePage() {
  const [sidebar, setSidebar] = useState(false);
  const title = "Paket";
  const subTitle = "List paket yang tersedia";

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
        <PackageComponent />
      </main>
    </div>
  );
}

export default PackagePage;

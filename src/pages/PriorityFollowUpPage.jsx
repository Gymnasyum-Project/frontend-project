import SidebarComponent from "../components/common/sidebar/SidebarComponent";
import HeaderComponent from "../components/common/header/HeaderComponent";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import PriorityFollowUp from "../components/followup_priority/PriorityFollowUp";

function PriorityFollowUpPage() {
  const [sidebar, setSidebar] = useState(false);
  const title = "Prioritas Follow-up";
  const subTitle = "Customer yang memerlukan tindak lanjut segera";

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
        <PriorityFollowUp />
      </main>
    </div>
  );
}

export default PriorityFollowUpPage;

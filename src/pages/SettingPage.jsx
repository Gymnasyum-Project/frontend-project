
import SidebarComponent from "../components/sidebar/SidebarComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

function SettingPage(){
    const [sidebar, setSidebar] = useState(false)
    const title = "Pengaturan"
    const subTitle= "Konfigurasi sistem dan preferensi"

    return(
        <div className="page-layout">
            <aside className={`sidebar ${sidebar ? "open" : ""}`}>
                <SidebarComponent/>
            </aside>
            {sidebar && (
                <div className="overlay"onClick={()=>{setSidebar(false)}}/>                        
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
                {/* <SettingComponent /> */}
            </main>
        </div>
        
    )
}

export default SettingPage;
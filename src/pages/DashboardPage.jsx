
import SidebarComponent from "../components/sidebar/SidebarComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import DasboardComponent from "../components/dashboard/DashboardComponent";
import '../styles/layout.css'
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

function DashboardPage(){
    const [sidebar, setSidebar] = useState(false)

    const title = "Dashboard"
    const subTitle = "Selamat datang kembali, Admin"  

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
                        <HeaderComponent title={title} subTitle={subTitle} className="halo"/>
                   
                     </div>
                    <DasboardComponent />
                </main>
            </div>
        
    )
}

export default DashboardPage;
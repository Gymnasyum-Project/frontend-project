
import SidebarComponent from "../components/sidebar/SidebarComponent";
import HeaderComponent from "../components/header/HeaderComponent";

function DashboardPage(){
    const title = "Dashboard"
    const subTitle = "Selamat datang kembali, Admin"  

    return(
        <>
            <div style={{ display: "grid", gridTemplateColumns:"1fr 4fr" }}>
                <div>
                    <SidebarComponent/>
                </div>
                <div>
                    <HeaderComponent title={title} subTitle={subTitle}/>
                </div>
            </div>
        </>
        
    )
}

export default DashboardPage;
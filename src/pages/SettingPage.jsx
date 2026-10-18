
import SidebarComponent from "../components/sidebar/SidebarComponent";
import HeaderComponent from "../components/header/HeaderComponent";

function SettingPage(){
    const title = "Pengaturan"
    const subTitle= "Konfigurasi sistem dan preferensi"

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

export default SettingPage;
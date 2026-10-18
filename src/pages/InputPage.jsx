
import SidebarComponent from "../components/sidebar/SidebarComponent";
import HeaderComponent from "../components/header/HeaderComponent";

function InputPage(){
    const title = "Input Data"
    const subTitle = "Tambah data cstomer, kehadiran, paket dan reschadule"  
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

export default InputPage;
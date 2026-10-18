
import SidebarComponent from "../components/sidebar/SidebarComponent";
import HeaderComponent from "../components/header/HeaderComponent";

function CustomerPage(){
    const title = "Customer Page"
    const subTitle = "Kelola dan pantau customer"

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

export default CustomerPage;
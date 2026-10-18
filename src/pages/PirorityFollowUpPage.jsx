
import SidebarComponent from "../components/sidebar/SidebarComponent";
import HeaderComponent from "../components/header/HeaderComponent";

function PirorityFollowUpPage(){
    const title = "Prioritas Follow-up"
    const subTitle = "Customer yang memerlukan tindak lanjut segera"

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

export default PirorityFollowUpPage;
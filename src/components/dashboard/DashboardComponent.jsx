import CardFirst from "./CardFirst";
import ChartCard from "./ChartCard";
import useDashboardSummary from "../../hooks/useDashboardSummary";
import CustomerTopPriority from "./CustomerTopPriority";
import './DashboardComponent.css'
import { LABEL_COLORS } from "../../../public/css/color";
import LoadingComponent from "../loading/LoadingComponent";
import ErrorComponent from "../common/Errorcomponent ";
import EmptyComponent from "../common/Emptycomponent";

const card = {
            backgroundColor: "#F9FAFB",
            boxShadow: "0 0 0 2px rgba(203, 213, 225, 0.2)",
            padding: "1rem",
            borderRadius: "10px",
            };


function DasboardComponent(){
    const { data, loading,  error, refetch } = useDashboardSummary();

    if (loading) return <LoadingComponent/>;
    if (error) return <ErrorComponent message={error} onRetry={refetch} />;
    if (!data) return <EmptyComponent/>;

    const {
        total_customers,
        risk_predictions = [],
        top_priority = [],
        anttendance_trend = [],
        } = data;

    
    return(
        <>
            <div>
                <CardFirst  styleCard ={card} totalCustomers={total_customers} riskPredictions={risk_predictions} />
                <ChartCard LABEL_COLORS={LABEL_COLORS} styleCard ={card} risk_predictions={risk_predictions} anttendance_trend = {anttendance_trend}/>
                <CustomerTopPriority LABEL_COLORS={LABEL_COLORS} styleCard={card} top_priority = {top_priority}/>

            
            </div>
        </>
    )
}

export default DasboardComponent;


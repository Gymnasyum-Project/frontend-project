import { Link, useLocation } from 'react-router-dom';
import './style.css';
import { LuDumbbell } from "react-icons/lu";
import { RiDashboard3Fill } from "react-icons/ri";
import { IoPeople, IoSettings } from "react-icons/io5";
import { PiFlagFill } from "react-icons/pi";
import { FaPencil } from "react-icons/fa6";
import { COLORS } from '../../styles/color';

function SidebarComponent(){
    const location = useLocation()
    const currentPath = location.pathname;

    return(
        <>
            <div className="container">
                <div className="top">
                    <div className='icon'>
                        <LuDumbbell size={30} color='#f0fdfa'/>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column",padding:0 }}>
                        <p >Gymnasyum</p>
                        <span style={{ color: COLORS.gray[400], fontSize:"12px"}}>Admin Panel</span>
                    </div>
                    
                </div>
                <div className="content">
                    <p style={{ color: COLORS.gray[400], fontSize: "12px", fontWeight:"bold", paddingBottom: "5px" }}>Menu</p>
                        <Link to={'/'}>
                            <div className={`tab ${currentPath=== '/' ? 'active' : ''}`}>
                                <RiDashboard3Fill/> Dashboard
                            </div>
                        </Link>
                        <Link to={'/customer'}>
                            <div className={`tab ${currentPath=== '/customer' ? 'active' : ''}`}>
                                <IoPeople/> Customer
                            </div>
                        </Link>
                        <Link to={'/priority-followup'}>
                            <div className={`tab ${currentPath=== '/priority-followup' ? 'active' : ''}`}>
                                <PiFlagFill/> Prioritas Follow-up
                            </div>
                        </Link>
                        <Link to={'/input-page'}>
                            <div className={`tab ${currentPath=== '/input-page' ? 'active' : ''}`}>
                                <FaPencil/> Input Data
                            </div>
                        </Link>
                        <Link to={'/setting'}>
                            <div className={`tab ${currentPath=== '/setting' ? 'active' : ''}`}>
                                <IoSettings/> Pengaturan
                            </div>
                        </Link>                    
                </div>
                <div className="buttom">
                    <div className='btm-icon'>
                        <p>AD</p>
                    </div>
                    <div>
                        <p>Admin</p>
                        <p style={{ fontSize:"12px" }}>admin@gymnasyum.id</p>  
                    </div>
                      
                </div>
            </div>
        </>
    )
}

export default SidebarComponent;
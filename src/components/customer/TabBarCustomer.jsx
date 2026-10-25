

function TabBarCustomer({labels=[], activeLabel, setActiveLabel, sortBy, setSortBy}){
    
    return(
        <div>
            <div className="head-tab">
                <div className="tab-bar">                      
                    {labels.map((item)=>(
                        <span className={`tab-risk ${activeLabel === item.label ? 'active':''}`} 
                        key={item.label}
                        onClick={()=>setActiveLabel(item.label)}    
                        >                     
                            {item.label} ({item.total})
                        </span>
                    ))}
                </div>
                <div className="">
                    <select name="" id="" className="filter-resiko" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                        <option value="risk">Resiko Tertinggi</option>
                        <option value="attendance">Kunjungan Tertinggi</option>
                        <option value="package">Sisa Paket Terkecil</option>
                    </select>
                </div>
            </div >
        </div>
    )
}

export default TabBarCustomer;
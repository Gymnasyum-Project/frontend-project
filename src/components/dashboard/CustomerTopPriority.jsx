function CustomerTopPriority({top_priority = [], styleCard, LABEL_COLORS}){
    const btn = {
        padding: "0.3rem", 
        cursor:"pointer", 
        background:"none", 
        borderRadius: "5px", 
        border: "1px solid #9CA3AF"
    }
    const cellBody={
        padding: "1rem",
        textAlign:"center",

    }
    const getInitials = (name) => {
        const words = name.trim().split(/\s+/);
        if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
        };

    const labelStyle = (value) => {
        const color = LABEL_COLORS[value] || "#6b7280";
        return {
            display: "inline-flex",       
            alignItems: "center",
            gap: 6,              
            backgroundColor: color + "1a",
            color: color,
            padding: "2px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
        };
    };
    

    return(
        <div style={{ padding:"1rem" }}>
            <div style={styleCard}>
                <div style={{borderBottom: "1px solid #D1D5DB", display:"grid", gridTemplateColumns:"4fr 1fr", alignItems:"center", padding:"1rem" }}>
                    <div>
                        <p>Prioritas Follow-up</p>
                        <p style={{ fontSize: "12px", color:"#9CA3Af" }}>5 customer dengan resiko tertinggi yang perlu segera di hubungi</p>
                    </div>
                    <div style={{ textAlign:"end" }}>
                        <button style={btn}>Lihat Semua</button>    
                    </div>
                </div>
                <div className="table" style={{ overflowX: "auto" }}>
                    <table width={"100%"} style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Status Resiko</th>
                                <th className="hide-mobile">Skor Resiko</th>
                                <th className="hide-mobile">Terakhir Hadir</th>
                                <th className="hide-mobile">Sisa Paket</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                           {top_priority.map((p) => (
                            <tr key={p.id} style={{ borderBottom: "1px solid #D1D5DB" }}>
                                <td style={{ ...cellBody, textAlign:"start", display:"flex", gap:"0.5rem",alignItems:"center" }}>
                                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", borderRadius:"30px", width: "2rem", height:"2rem", backgroundColor: "#ffc4c4", color:"#ff0000"}}>
                                        {getInitials(p.full_name)}
                                    </div>
                                    <div>
                                        <p>{p.full_name}</p>                                 
                                        <p style={{ fontSize:"12px", color:"#9CA3AF" }}>{p.segment}</p>                                                                     
                                    </div>
                                    
                                </td>
                                <td style={cellBody}>
                                    <div style={labelStyle(p.label)}>
                                        <span 
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            backgroundColor: LABEL_COLORS[p.label] || "#6b7280",
                                        }}
                                        />
                                        <span className="label-atrisk">{p.label}</span>
                                    </div>
                                </td>
                                <td className="hide-mobile" style={cellBody}>
                                    <div style={{ ...labelStyle(p.label), display: "flex", alignItems: "center", gap: 8 }}>
                                        <span 
                                        style={{ 
                                            width: `${Number(p.priority_score)}%`,
                                            height: 8,
                                            borderRadius: "30px",
                                            backgroundColor:LABEL_COLORS[p.label] 
                                         }}/>
                                            
                                        <span>{Number(p.priority_score)}%</span>
                                    </div>
                                </td>
                                <td className="hide-mobile" style={cellBody}>
                                {p.last_visit
                                    ? new Date(p.last_visit).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                                    : "Belum pernah"}
                                </td>
                                <td className="hide-mobile" style={cellBody}>{p.remaining_sessions ? p.remaining_sessions : ''} {p.remaining_sessions === 0 || null? "Habis" : "Sesi"}</td>
                                <td><button style={{ ...btn, border: "1px solid #14b8a6" }}>Lihat Detail</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerTopPriority;
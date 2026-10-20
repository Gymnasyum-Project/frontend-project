import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, Label
} from "recharts";

    const formatDate = (iso, opts) =>
    iso ? new Date(iso).toLocaleDateString("id-ID", opts) : "-";


function ChartCard({risk_predictions = [], anttendance_trend = [], styleCard, LABEL_COLORS}){
        const trend = anttendance_trend.map((w) => ({
        minggu: formatDate(w.week, { day: "numeric", month: "short" }),
        Hadir: w.hadir,
        Total: w.total,
    }));

    const totalRisk = risk_predictions.reduce((sum, r) => sum + r.total, 0);
        return(
            <div className="chart-grid">
            <div style={styleCard}>
            <p style={{ margin: "0 0 12px" }}>Distribusi Risiko</p>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                <Pie
                    data={risk_predictions}
                    dataKey="total"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={2}
                >
                    {risk_predictions.map((r) => (
                    <Cell key={r.label} fill={LABEL_COLORS[r.label] || "#9ca3af"} />
                    ))}
                <Label 
                    content={({viewBox})=>{
                        const {cx, cy} = viewBox
                        return(
                            <text x = {cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan 
                                    c = {cx}
                                    dy = "-0.2em"
                                    style={{ fontSize: 28, fill: "#111827" }}
                                >
                                    {totalRisk}
                                </tspan>
                                <tspan
                                    x={cx}
                                    dy ="1.6em"
                                    style={{ fontSize: 12, fill: "#6b7280" }}
                                >
                                    Total
                                </tspan>
                            </text>
                        )
                    }}
                />              
                </Pie>
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            {risk_predictions.map((r) => {
                const percent = totalRisk ? Math.round((r.total / totalRisk) * 100) : 0;
                return (
                <div
                    key={r.label}
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 14,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                        style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: LABEL_COLORS[r.label] || "#9ca3af",
                        }}
                    />
                    <span>{r.label}</span>
                    </div>
                    <span style={{ color: "#6b7280" }}>
                    <strong style={{ color: "#111827" }}>{r.total}</strong> ({percent}%)
                    </span>
                </div>
                );
            })}
            </div>
            </div>
    
            <div style={styleCard}>
            <p style={{ margin: "0 0 12px" }}>Tren Kehadiran Mingguan</p>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="gradHadir" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0f766e" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#0f766e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                <XAxis 
                    dataKey="minggu" 
                    exisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis 
                    allowDecimals={false}
                    exisLine={false}
                    tickLine={false}
                    tick={{ fontSize:12, fill:"#6b7280" }}
                />
                <Tooltip />
                <Legend/>
                <Area
                    type="monotone"
                    dataKey="Total"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    fill="url(#gradTotal)"
                    dot={false}
                />
                <Area 
                    type="monotone"
                    dataKey="Hadir"
                    stroke="#0f766e"
                    strokeWidth={2.5}
                    fill="url(#gradHadir)"
                    dot={{ r: 3, fill: "#0f766e", strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                />
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>
        )
    }

    export default ChartCard
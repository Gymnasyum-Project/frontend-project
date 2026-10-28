import EmptyComponent from "../common/ErrorComponent/Emptycomponent";

const PACKAGE_STATUS = {
  active: { label: "Aktif", className: "paket-badge paket-badge--active" },
  completed: { label: "Selesai", className: "paket-badge paket-badge--done" },
  expired: { label: "Selesai", className: "paket-badge paket-badge--done" },
};

const toDate = (iso) => (iso ? String(iso).slice(0, 10) : "-");

export default function TabPaket({ data }) {
  if (data.length === 0) {
    return <EmptyComponent />;
  }

  return (
    <div className="paket-list">
      {data.map(
        (p) => {
          const total = Number(p.packages?.total_sessions ?? 0);
          const remaining = Number(p.remaining_sessions ?? 0);
          const used = Math.max(total - remaining, 0);
          const percent = total > 0 ? Math.min((used / total) * 100, 100) : 0;
          const status = PACKAGE_STATUS[p.status] ?? PACKAGE_STATUS.completed;

          return (
            <div className="paket-card" key={p.id}>
              <div className="paket-top">
                <div>
                  <p className="paket-name">
                    {p.packages?.name ?? `Paket #${p.package_id}`}
                  </p>
                  <p className="paket-date">
                    Dibeli {toDate(p.start_date)} · Berlaku hingga{" "}
                    {toDate(p.end_date)}
                  </p>
                </div>
                <span className={status.className}>{status.label}</span>
              </div>

              <div className="paket-progress-row">
                <div className="paket-progress">
                  <div
                    className="paket-progress-bar"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="paket-count">
                  {used}/{total} sesi
                </span>
              </div>
            </div>
          );
        },
        // <div key={p.id} style={{ backgroundColor: "red" }}>
        //   <p>{p.packages.name}</p>
        //   <p>
        //     Dibeli {p.start_date} Berlaku hingga {p.end_date}
        //   </p>
        //   <p></p>
        // </div>
      )}
    </div>
  );
}

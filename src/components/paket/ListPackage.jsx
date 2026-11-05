export default function ListPackage({
  packages,
  error,
  updatingId,
  togglePackageStatus,
}) {
  return (
    <div className="card">
      <div className="card-header">
        <p>List paket</p>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {packages.map((paket) => {
        const aktif = paket.status === "active";
        return (
          <div key={paket.id} className="paket-card">
            <div className="header-paket">
              <p>{paket.name}</p>
              <p>Total Sesi</p>
              <p>Durasi</p>
              <p>Harga</p>
              <p className="btn-paket-container">Status Paket</p>
            </div>
            <div className="body-paket">
              <span>{paket.service_type}</span>
              <p>{paket.total_sessions} sesi</p>
              <p>{paket.duration_days} hari</p>
              <p>Rp {Number(paket.price ?? 0).toLocaleString("id-ID")}</p>
              <div className="btn-paket-container">
                <span
                  className={`paket-status ${aktif ? "is-active" : "is-inactive"}`}
                >
                  {/* {aktif ? "Aktif" : "Tidak aktif"} */}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={aktif}
                  aria-label={`Status ${paket.name}`}
                  className={`paket-status-toggle ${aktif ? "is-active" : ""}`}
                  disabled={updatingId === paket.id}
                  onClick={() => togglePackageStatus(paket)}
                >
                  <span className="paket-status-toggle-thumb" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

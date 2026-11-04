import { useState, useEffect } from "react";
import Select from "react-select";
import { useCustomerSearch } from "../../hooks/useCustomerSearch";
import { useRescheduleSession } from "../../hooks/Reschedule/useRescheduleSession";
import { useGetCustomerSessions } from "../../hooks/Reschedule/useGetCustomerSessions";

export default function TabTambahReschedule() {
  const { options: customerOptions, setSearchText } = useCustomerSearch();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const customerId = selectedCustomer?.value ?? "";

  const [sessionId, setSessionId] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [alasan, setAlasan] = useState("");
  const [success, setSuccess] = useState(false);

  const { sessions, loading, error } = useGetCustomerSessions(customerId);
  const {
    submit,
    loading: saving,
    error: saveError,
    fieldErrors,
  } = useRescheduleSession();

  const sesiAktif = sessions.filter((s) => s.status !== "cancelled");

  useEffect(() => {
    setSessionId("");
  }, [customerId]);

  const bisaKirim = sessionId && tanggal && jam && !saving;

  const handleReset = () => {
    setSelectedCustomer(null);
    setSessionId("");
    setTanggal("");
    setJam("");
    setAlasan("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const ok = await submit(sessionId, {
      new_schedule: new Date(`${tanggal}T${jam}`).toISOString(),
      reason: alasan || undefined,
    });
    if (ok) {
      handleReset(e);
      setSuccess(true);
    }
  };

  const labelSesi = (s) =>
    `${s.customer_packages?.packages?.name ?? "Paket"} · ${new Date(
      s.scheduled_at,
    ).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    })} · ${s.status}`;

  return (
    <div>
      <div className="title-tab">
        <p>Input Reschedule Customer</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="content-input">
          <div>
            <div className="input-item">
              <label htmlFor="customer">
                Nama Customer<span style={{ color: "red" }}>*</span>
              </label>
              <Select
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "10px",
                    fontSize: "0.8rem",
                    minHeight: "1.5rem",
                  }),
                  input: (base) => ({
                    ...base,
                    lineHeight: "1.5",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                  }),
                }}
                inputId="customer"
                options={customerOptions}
                value={selectedCustomer}
                onChange={(opt) => {
                  setSelectedCustomer(opt);
                  setSuccess(false);
                }}
                onInputChange={(text, meta) => {
                  if (meta.action === "input-change") setSearchText(text);
                  if (meta.action === "menu-close") setSearchText("");
                }}
                filterOption={null}
                placeholder="Cari nama customer..."
                noOptionsMessage={() => "Customer tidak ditemukan"}
                isClearable
              />
            </div>

            <div className="input-item">
              <label htmlFor="session">
                Pilih Sesi<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="session"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                disabled={!customerId || loading}
              >
                <option value="">
                  {loading ? "Memuat sesi..." : "-- Pilih Sesi --"}
                </option>
                {sesiAktif.map((s) => (
                  <option key={s.id} value={s.id}>
                    {labelSesi(s)}
                  </option>
                ))}
              </select>
              {error && (
                <p style={{ color: "red" }}>
                  Gagal memuat sesi: {error.message}
                </p>
              )}
              {customerId && !loading && !error && sesiAktif.length === 0 && (
                <p>Customer ini belum punya sesi.</p>
              )}
            </div>
            <div className="input-item">
              <label htmlFor="alasan">
                Alasan<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="alasan"
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
              >
                <option value="">-- Pilih --</option>
                <option value="Sakit">Sakit</option>
                <option value="Ada keperluan">Ada keperluan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>
          <div>
            <div className="input-item">
              <label htmlFor="tanggal">
                Tanggal Baru<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                id="tanggal"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
              />
            </div>
            <div className="input-item">
              <label htmlFor="jam">
                Waktu Baru<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="time"
                id="jam"
                value={jam}
                onChange={(e) => setJam(e.target.value)}
                required
              />
              {fieldErrors.new_schedule && (
                <p style={{ color: "red" }}>{fieldErrors.new_schedule}</p>
              )}
            </div>
            {saveError && <p style={{ color: "red" }}>{saveError}</p>}
            {success && (
              <p style={{ color: "green" }}>Reschedule berhasil disimpan.</p>
            )}
          </div>
          <div className="btn-input-container">
            <button
              type="submit"
              className="btn-input active-btn"
              disabled={!bisaKirim}
            >
              {saving ? "Menyimpan..." : "Simpan Reschedule"}
            </button>{" "}
            <button
              type="button"
              className="btn-input"
              onClick={handleReset}
              disabled={loading || saving}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

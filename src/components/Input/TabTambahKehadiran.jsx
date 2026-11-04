import { useState, useEffect } from "react";
import Select from "react-select";
import { useAddAttendance } from "../../hooks/useAddAttendance";
import { useCustomerSearch } from "../../hooks/useCustomerSearch";
import { useCustomerPackages } from "../../hooks/useCustomerPackages";

const STATUS_OPTIONS = [
  { value: "attended", label: "Hadir" },
  { value: "missed", label: "Tidak Hadir" },
  { value: "rescheduled", label: "Dijadwal Ulang" },
  { value: "cancelled", label: "Dibatalkan" },
];

const initialForm = {
  customer_package_id: "",
  tanggal: "",
  waktu: "",
  status: "",
  coach_name: "",
};

function FieldError({ message }) {
  return message ? <small style={{ color: "red" }}>{message}</small> : null;
}

export default function TabTambahKehadiran() {
  const [form, setForm] = useState(initialForm);
  const [customer, setCustomer] = useState(null); // { value, label }
  const [success, setSuccess] = useState(false);

  const { options: customerOptions, setSearchText } = useCustomerSearch();

  const { packages } = useCustomerPackages(customer?.value);
  const { submit, error, fieldErrors, loading } = useAddAttendance();

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      customer_package_id: packages.length === 1 ? String(packages[0].id) : "",
    }));
  }, [packages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
  };

  const handleReset = () => {
    setForm(initialForm);
    setCustomer(null);
    setSuccess(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    try {
      const payload = {
        customer_id: customer?.value,
        customer_package_id: Number(form.customer_package_id) || undefined,
        scheduled_at: form.tanggal
          ? new Date(form.tanggal).toISOString()
          : undefined,
        status: form.status,
        ...(form.coach_name && { coach_name: form.coach_name }),
        checkin_at: new Date(
          `${form.tanggal}T${form.waktu || "00:00"}`,
        ).toISOString(),
      };

      await submit(payload);
      handleReset();
      setSuccess(true);
    } catch {
      //
    }
  }

  return (
    <div>
      <div className="title-tab">
        {" "}
        <p>Tambah Kehadiran Pelanggan</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="content-input">
          <div>
            <div className="input-item">
              <label htmlFor="customerName">
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
                inputId="customerName"
                options={customerOptions}
                value={customer}
                onChange={(opt) => {
                  setCustomer(opt);
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
              <FieldError message={fieldErrors.customer_id} />
            </div>

            <div className="input-item">
              <label htmlFor="customer_package_id">
                Tipe Sesi<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="customer_package_id"
                name="customer_package_id"
                value={form.customer_package_id}
                onChange={handleChange}
                disabled={!customer}
              >
                <option value="">
                  {customer ? "Pilih Sesi" : "Pilih customer dulu"}
                </option>
                {packages.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    disabled={p.remaining_sessions <= 0}
                  >
                    {p.packages?.name} — sisa {p.remaining_sessions} sesi
                  </option>
                ))}
              </select>
              <FieldError message={fieldErrors.customer_package_id} />
            </div>

            <div className="input-item">
              <label htmlFor="coach_name">Nama Coach</label>
              <input
                id="coach_name"
                type="text"
                name="coach_name"
                value={form.coach_name}
                onChange={handleChange}
                placeholder="Cth. Shin Tae-yong"
              />
            </div>
          </div>

          <div>
            <div className="input-item">
              <label htmlFor="tanggal">
                Tanggal Sesi<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="tanggal"
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
              />
              <FieldError message={fieldErrors.scheduled_at} />
            </div>

            <div className="input-item">
              <label htmlFor="status">
                Status Kehadiran<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Status</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <FieldError message={fieldErrors.status} />
            </div>

            <div className="input-item">
              <label htmlFor="waktu">Waktu Mulai</label>
              <input
                id="waktu"
                type="time"
                name="waktu"
                value={form.waktu}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {error && !Object.keys(fieldErrors).length && (
          <p style={{ color: "red" }}>{error}</p>
        )}
        {success && (
          <p style={{ color: "green" }}>Kehadiran berhasil disimpan.</p>
        )}

        <div className="btn-input-container">
          <button
            type="submit"
            className="btn-input active-btn"
            disabled={loading || !customer || !form.customer_package_id}
          >
            {loading ? "Menyimpan..." : "Simpan Kehadiran"}
          </button>
          <button
            type="button"
            className="btn-input"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

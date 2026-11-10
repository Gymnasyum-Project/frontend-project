import { useState } from "react";
import { useAddPackage } from "../../hooks/package/useAddPackage";

const initialForm = {
  name: "",
  total_sessions: "",
  service_type: "",
  price: "",
  duration_days: "",
};
const SERVICE_TYPES = [
  { value: "gym", label: "Gym" },
  { value: "private_coaching", label: "Private Coaching" },
];
function FieldError({ message }) {
  return message ? (
    <p style={{ color: "red", fontSize: "0.75rem" }}>{message}</p>
  ) : null;
}
export default function AddPackage({ onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const { submit, error, fieldErrors, loading } = useAddPackage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
  };
  const handleReset = () => {
    setForm(initialForm);
    setSuccess(false);
  };

  const bisaKirim =
    form.name.trim() &&
    form.service_type &&
    form.total_sessions &&
    form.duration_days &&
    form.price !== "" &&
    !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    try {
      const payload = {
        name: form.name,
        total_sessions: form.total_sessions,
        price: form.price,
        service_type: form.service_type,
        duration_days: form.duration_days,
      };
      await submit(payload);
      handleReset();
      setSuccess(true);
      onSuccess?.();
    } catch {
      //
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <p>Tambah paket</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="content-input">
            <div className="input-item">
              <label htmlFor="name">
                Nama Paket<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Cth. Nama paket"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              {/* <FieldError message={FieldError.name} /> */}
            </div>

            <div className="input-item">
              <label htmlFor="service_type">
                Tipe Layanan<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="service_type"
                name="service_type"
                value={form.service_type}
                onChange={handleChange}
              >
                <option value="">Pilih tipe layanan</option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <FieldError message={FieldError.service_type} />
            </div>

            <div className="input-item">
              <label htmlFor="total_sessions">
                Total Sesi<span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Cth. 10"
                type="number"
                min="1"
                id="total_sessions"
                name="total_sessions"
                value={form.total_sessions}
                onChange={handleChange}
              />
              <FieldError message={FieldError.total_sessions} />
            </div>

            <div className="input-item">
              <label htmlFor="duration_days">
                Durasi (hari)<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                min="1"
                id="duration_days"
                placeholder="Cth. 30"
                name="duration_days"
                value={form.duration_days}
                onChange={handleChange}
              />
              <FieldError message={FieldError.duration_days} />
            </div>

            <div className="input-item">
              <label htmlFor="price">
                Harga<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="Cth. 5000000"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
              <FieldError message={FieldError.price} />
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <p style={{ color: "green" }}>Paket berhasil disimpan.</p>
          )}

          <div className="btn-input-container">
            <button
              type="submit"
              className="btn-submit active-btn"
              disabled={!bisaKirim}
            >
              {loading ? "Menyimpan..." : "Simpan Package"}
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
    </div>
  );
}

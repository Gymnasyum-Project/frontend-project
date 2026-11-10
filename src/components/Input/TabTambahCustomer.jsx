import { useState } from "react";
import { useAddCustomer } from "../../hooks/customer/useAddCustomer";
import { useGetPackage } from "../../hooks/package/useGetPackage";

const listSegment = [
  { value: "ibu_ibu", label: "Ibu-ibu" },
  { value: "lansia", label: "Lansia" },
  { value: "menengah_atas", label: "Menengah ke Atas" },
  { value: "lainnya", label: "Lainnya" },
];
const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  birth_date: "",
  segment: "",
  join_date: "",
  package_id: "",
  notes: "",
};
function FieldError({ message }) {
  return message ? <small style={{ color: "red" }}>{message}</small> : null;
}

export default function TabTambahCustomer() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const { packages } = useGetPackage();
  const { submit, fieldErrors, loading } = useAddCustomer();

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSuccess(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    try {
      await submit({
        ...form,
        package_id: Number(form.package_id),
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, ""),
      });
      setForm(initialForm);
      setSuccess(true);
    } catch {
      // error sudah disimpan oleh hook dan ditampilkan di bawah
    }
  }

  return (
    <div>
      <div className="title-tab">
        {" "}
        <p>Tambah Pelanggan Baru</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="content-input">
          <div>
            <div className="input-item">
              <label htmlFor="full_name">
                Nama Lengkap<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="full_name"
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Cth. Ibu Indah Sari"
                required
              />
            </div>

            <div className="input-item">
              <label htmlFor="email">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Cth. customer@gmail.com"
                required
              />
            </div>

            <div className="input-item">
              <label htmlFor="phone">
                Nomor HP<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Cth. 081........."
                pattern="[0-9]{9,16}"
                required
              />
            </div>

            <div className="input-item">
              <label htmlFor="birth_date">
                Tanggal Lahir<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="birth_date"
                type="date"
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
                max={today}
                required
              />
            </div>
          </div>

          <div>
            <div className="input-item">
              <label htmlFor="segment">
                Segment<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="segment"
                name="segment"
                value={form.segment}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Segment</option>
                {listSegment.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-item">
              <label htmlFor="join_date">
                Tanggal Bergabung<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="join_date"
                type="date"
                name="join_date"
                value={form.join_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-item">
              <label htmlFor="package_id">
                Program<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="package_id"
                name="package_id"
                value={form.package_id}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Program</option>
                {packages.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="notes">Catatan</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <FieldError message={fieldErrors.phone} />
        <FieldError message={fieldErrors.email} />
        {success && (
          <p style={{ color: "green" }}>Customer berhasil disimpan.</p>
        )}

        <div className="btn-input-container">
          <button
            type="submit"
            className="btn-input active-btn"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Customer"}
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

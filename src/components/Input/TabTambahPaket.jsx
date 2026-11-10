import { useState } from "react";
import { useAddPackagesCustomer } from "../../hooks/package/useAddPackagesCustomer";
import Select from "react-select";
import { useCustomerSearch } from "../../hooks/Customer/useCustomerSearch";
import { useGetPackage } from "../../hooks/package/useGetPackage";

function FieldError({ message }) {
  return message ? <small style={{ color: "red" }}>{message}</small> : null;
}
const initialForm = {
  customer_id: "",
  package_id: "",
  start_date: "",
};

export default function TabTambahPaket() {
  const { submit, loading, fieldErrors } = useAddPackagesCustomer();
  const [form, setForm] = useState(initialForm);
  const [customer, setCustomer] = useState(null);
  const [success, setSuccess] = useState(false);
  const { options: customerOptions, setSearchText } = useCustomerSearch();

  const { packages } = useGetPackage(customer?.value);

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
      const payload = {
        customer_id: customer?.value,
        package_id: Number(form.package_id) || undefined,
        start_date: form.start_date
          ? new Date(form.start_date).toISOString()
          : undefined,
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
        <p>Tambah Paket Pelanggan</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="content-input">
          <div>
            <div className="input-item">
              <label htmlFor="customerName">
                Nama Pelanggan<span style={{ color: "red" }}>*</span>
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
                Tipe Paket<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="customer_package_id"
                name="package_id"
                value={form.package_id}
                onChange={handleChange}
                disabled={!customer}
              >
                <option value="">
                  {customer ? "Pilih Paket" : "Pilih customer dulu"}
                </option>
                {packages
                  .filter((p) => p.status === "active")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
              <FieldError message={fieldErrors.package_id} />
            </div>
          </div>
          <div>
            <div className="input-item">
              <label htmlFor="start_date">
                Tanggal Mulai<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                disabled={!customer}
              />
              <FieldError message={fieldErrors.start_date} />
            </div>
          </div>
        </div>
        <FieldError message={fieldErrors.phone} />
        <FieldError message={fieldErrors.email} />
        {success && <p style={{ color: "green" }}>Paket berhasil disimpan.</p>}

        <div className="btn-input-container">
          <button
            type="submit"
            className="btn-input active-btn"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Paket"}
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

import "./SettingComponent.css";
import { useSetting } from "../../hooks/setting/useSetting";
import { useEffect, useState } from "react";
import LoadingComponent from "../common/loading/LoadingComponent";
import ErrorComponent from "../common/ErrorComponent/ErrorComponent";
import EmptyComponent from "../common/ErrorComponent/EmptyComponent";
import { useGetModelVersion } from "../../hooks/setting/useGetModelVersion";
import { useGetTotalCustomer } from "../../hooks/setting/useGetTotalCustomer";

const initialForm = { name: "", email: "", role: "", no_tlp: "" };

export default function SettingComponent() {
  const { data, error, loading, refetch, updateSetting } = useSetting();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { activeModel, modelLoading, modelError } = useGetModelVersion();
  const { totalCustomer, loadingCustomer, errorCustomer } =
    useGetTotalCustomer();

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name ?? "",
        email: data.email ?? "",
        role: data.role ?? "",
        no_tlp: data.no_tlp ?? "",
      });
    }
  }, [data]);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} onRetry={refetch} />;
  if (!data) return <EmptyComponent />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setSubmitError(null);
    try {
      await updateSetting(form);
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-setting">
      <div className="card">
        <div className="title-tab">
          <p>Profil Admin</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="content-input">
            <div>
              <div className="input-item">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Admin Gymnasyum"
                />
              </div>
              <div className="input-item">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@gmail.com"
                />
              </div>
            </div>
            <div>
              {" "}
              <div className="input-item">
                <label htmlFor="no_tlp">Phone</label>
                <input
                  type="text"
                  name="no_tlp"
                  id="no_tlp"
                  value={form.no_tlp}
                  onChange={handleChange}
                  placeholder="082231154432"
                />
              </div>
              <div className="input-item">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Admin"
                />
              </div>
            </div>
          </div>

          {success && (
            <p className="msg-success">Perubahan berhasil disimpan</p>
          )}
          {submitError && <p className="msg-error">{submitError}</p>}

          <div className="btn-input-container">
            <button
              className="btn-input active-btn"
              type="submit"
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
      <div className="card info-sistem">
        <div className="title-tab">
          <p>Informasi Sistem</p>
        </div>

        <table className="table-informasi">
          <tbody>
            {/* <tr>
              <td>Versi Aplikasi</td>
              <td>1.0.0-beta</td>
            </tr> */}
            <tr>
              <td>Model AI</td>
              <td>
                {modelLoading
                  ? "Memuat..."
                  : modelError
                    ? "-"
                    : activeModel
                      ? `${activeModel.version}`
                      : "Tidak ada model aktif"}
              </td>
            </tr>
            {/* <tr>
              <td>Data Terakhir Diperbaruhi</td>
              <td>21 November 2026</td>
            </tr> */}
            <tr>
              <td>Total Customer</td>
              <td>
                {loadingCustomer
                  ? "Memuat..."
                  : errorCustomer
                    ? "-"
                    : totalCustomer}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

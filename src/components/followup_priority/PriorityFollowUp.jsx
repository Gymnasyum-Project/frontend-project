import { useMemo, useState } from "react";
import "./PriorityFollowUp.css";
import { useNavigate } from "react-router-dom";
import usePriorityFollowUp from "../../hooks/priorityfollowup/usePriorityFollowUp";

// TODO: ganti dengan data dari API backend (mis. GET /api/customers/follow-up)
// const DATA_CUSTOMER = [
//   {
//     id: 1,
//     nama: "Ibu Sari Dewi",
//     kategori: "Ibu-ibu",
//     status: "at-risk",
//     skor: 87,
//     terakhirHadir: "2025-07-28",
//     sisaPaket: 3,
//     noHp: "0812-3456-7890",
//   },
//   {
//     id: 2,
//     nama: "Bapak Hendra Wijaya",
//     kategori: "Menengah ke Atas",
//     status: "at-risk",
//     skor: 81,
//     terakhirHadir: "2025-07-15",
//     sisaPaket: 8,
//     noHp: "0813-9876-5432",
//   },
//   {
//     id: 3,
//     nama: "Ibu Rina Susanti",
//     kategori: "Lansia",
//     status: "at-risk",
//     skor: 79,
//     terakhirHadir: "2025-08-01",
//     sisaPaket: 2,
//     noHp: "0857-1122-3344",
//   },
//   {
//     id: 4,
//     nama: "Bapak Agus Santoso",
//     kategori: "Lansia",
//     status: "at-risk",
//     skor: 74,
//     terakhirHadir: "2025-07-20",
//     sisaPaket: 5,
//     noHp: "0821-5566-7788",
//   },
//   {
//     id: 5,
//     nama: "Ibu Melati Putri",
//     kategori: "Ibu-ibu",
//     status: "at-risk",
//     skor: 71,
//     terakhirHadir: "2025-08-05",
//     sisaPaket: 1,
//     noHp: "0878-9900-1122",
//   },
//   {
//     id: 6,
//     nama: "Ibu Laras Wulandari",
//     kategori: "Ibu-ibu",
//     status: "need-attention",
//     skor: 58,
//     terakhirHadir: "2025-08-12",
//     sisaPaket: 4,
//     noHp: "0812-4433-2211",
//   },
//   {
//     id: 7,
//     nama: "Bapak Doni Prasetyo",
//     kategori: "Menengah ke Atas",
//     status: "need-attention",
//     skor: 52,
//     terakhirHadir: "2025-08-18",
//     sisaPaket: 6,
//     noHp: "0856-7788-9900",
//   },
// ];

const STATUS = {
  "at-risk": { label: "At Risk", judul: "At Risk — Segera Tindak Lanjut" },
  "need-attention": {
    label: "Need Attention",
    judul: "Need Attention — Pantau Lebih Lanjut",
  },
};

const inisial = (nama) =>
  nama
    .replace(/^(Ibu|Bapak)\s+/i, "")
    .split(" ")
    .slice(0, 2)
    .map((k) => k[0])
    .join("")
    .toUpperCase();

// 0812-3456-7890 -> 6281234567890
const keWhatsApp = (noHp) => "62" + noHp.replace(/\D/g, "").replace(/^0/, "");

function BarisCustomer({ c, onDetail, onFollowUp }) {
  return (
    <article className="fu-card">
      <div className={`fu-avatar fu-avatar--${c.status}`}>
        {inisial(c.nama)}
      </div>

      <div className="fu-info">
        <div className="fu-info__head">
          <span className="fu-nama">{c.nama}</span>
          <span className="fu-tag">{c.kategori}</span>
          <span className={`fu-badge fu-badge--${c.status}`}>
            <i className="fu-dot" />
            {STATUS[c.status].label}
          </span>
        </div>
        <div className="fu-meta">
          <span>
            Skor: <b>{c.skor}%</b>
          </span>
          <span>
            Terakhir hadir: <b>{c.terakhirHadir}</b>
          </span>
          <span>
            Sisa paket:{" "}
            <b className={c.sisaPaket <= 3 ? "fu-danger" : ""}>
              {c.sisaPaket} sesi
            </b>
          </span>
          <span>
            No. HP: <b>{c.noHp}</b>
          </span>
        </div>
      </div>

      <div className="fu-actions">
        <button className="fu-btn fu-btn--outline" onClick={() => onDetail(c)}>
          Lihat Detail
        </button>
        <button
          className="fu-btn fu-btn--primary"
          onClick={() => onFollowUp(c)}
        >
          <span aria-hidden>🎓</span> Kirim Follow-up
        </button>
      </div>
    </article>
  );
}

function PriorityFollowUp() {
  const [cari, setCari] = useState("");
  const navigate = useNavigate();
  const { dataFollowUp, loading, error, refetch } = usePriorityFollowUp();
  const customers = useMemo(() => dataFollowUp?.data ?? [], [dataFollowUp]);
  console.log(customers);

  // const terfilter = useMemo(() => {
  //   const q = cari.trim().toLowerCase();
  //   return customers
  //     .filter((c) => !q || c.nama.toLowerCase().includes(q))
  //     .sort((a, b) => b.skor - a.skor);
  // }, [customers, cari]);

  // const grup = Object.keys(STATUS).map((key) => ({
  //   key,
  //   judul: STATUS[key].judul,
  //   items: terfilter.filter((c) => c.status === key),
  // }));

  const jumlahAtRisk = customers.filter((c) => c.status === "at-risk").length;

  const handleDetail = (c) => {
    navigate(`/customer/${c.id}`); // contoh: navigate(`/customer/${c.id}`) jika memakai react-router
    console.log("Lihat detail", c.id);
  };

  const handleFollowUp = (c) => {
    const pesan = `Halo ${c.nama}, kami dari Gymnasyum. Sudah lama tidak melihat Anda di kelas. Sisa paket Anda ${c.sisaPaket} sesi. Yuk jadwalkan sesi berikutnya!`;
    window.open(
      `https://wa.me/${keWhatsApp(c.noHp)}?text=${encodeURIComponent(pesan)}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <div className="fu-page">
      {/* Konten */}
      <main className="fu-main">
        <div className="fu-content">
          {jumlahAtRisk > 0 && (
            <div className="fu-alert" role="alert">
              <div className="fu-alert__icon">!</div>
              <div>
                <strong>
                  Perhatian: {jumlahAtRisk} customer berisiko tinggi
                </strong>
                <p>
                  Customer ini membutuhkan tindak lanjut segera. Hubungi mereka
                  hari ini untuk mencegah churn.
                </p>
              </div>
            </div>
          )}

          {grup.map(
            (g) =>
              g.items.length > 0 && (
                <section key={g.key} className="fu-section">
                  <h2 className="fu-section__title">
                    <i className={`fu-dot fu-dot--${g.key}`} />
                    {g.judul}
                    <span className="fu-count">{g.items.length}</span>
                  </h2>
                  {g.items.map((c) => (
                    <BarisCustomer
                      key={c.id}
                      c={c}
                      onDetail={handleDetail}
                      onFollowUp={handleFollowUp}
                    />
                  ))}
                </section>
              ),
          )}

          {terfilter.length === 0 && (
            <p className="fu-empty">Tidak ada customer dengan nama “{cari}”.</p>
          )}
        </div>
      </main>
    </div>
  );
}
export default PriorityFollowUp;

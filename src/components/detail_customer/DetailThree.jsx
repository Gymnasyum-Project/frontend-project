import { useState, useEffect, useDeferredValue } from "react";
import TabKehadiran from "./TabKehadiran";
import TabPaket from "./TabPaket";
import TabReschedule from "./TabReschedule";
import TabReminder from "./TabReminder";
import DetailAiSummary from "./DetailAiSummary";
import DetailRingkasanAi from "./DetailRingkasanAi";
import DetailDrafWhatsapp from "./DetailDrafWhatsapp";

const TABS = ["Kehadiran", "Paket", "Reschedule", "Reminder"];
const SESSION_STATUS = {
  attended: { label: "Hadir", color: "#16a34a", bg: "#dcfce7" },
  missed: { label: "Tidak Hadir", color: "#dc2626", bg: "#fee2e2" },
  rescheduled: { label: "Dijadwalkan Ulang", color: "#d97706", bg: "#fef3c7" },
};

const formatService = (s = "") =>
  s
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const formatDateTime = (iso) =>
  iso
    ? new Date(iso).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

export default function DetailThree({ data, card, onRefresh }) {
  const [activeTab, setActiveTab] = useState("Kehadiran");
  const [aiSummary, setAiSummary] = useState(data.ai_summary ?? null);

  useEffect(() => {
    setAiSummary(data.ai_summary ?? null);
  }, [data.id, data.ai_summary]);

  const summary = aiSummary?.summary ?? "Belum dianalisis";

  const packageById = Object.fromEntries(
    data.customer_packages.map((p) => [p.id, p]),
  );
  const history = [...data.attendance].sort(
    (a, b) => new Date(b.scheduled_at) - new Date(a.scheduled_at),
  );

  return (
    <div className="container-three-card">
      <div className="col-tabs" style={{ ...card, height: "fit-content" }}>
        <div className="top-three">
          {TABS.map((tab) => (
            <div
              key={tab}
              className={`tab-three ${activeTab === tab ? "active-three" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {activeTab === "Kehadiran" && (
            <TabKehadiran
              SESSION_STATUS={SESSION_STATUS}
              packageById={packageById}
              formatDateTime={formatDateTime}
              formatService={formatService}
              history={history}
            />
          )}
          {activeTab === "Paket" && <TabPaket data={data.customer_packages} />}
          {activeTab === "Reschedule" && (
            <TabReschedule data={data.reschedules} />
          )}
          {activeTab === "Reminder" && (
            <TabReminder data={data.reminders} onSuccessUpdate={onRefresh} />
          )}
        </div>
      </div>
      <div className="col-ai">
        <div style={{ ...card, height: "fit-content" }}>
          <DetailAiSummary data={{ ...data, ai_summary: aiSummary }} />
        </div>
        <div
          style={{
            ...card,
            minWidth: 0,
            maxHeight: "20rem",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "0.75rem",
          }}
        >
          <DetailRingkasanAi data={summary} />
        </div>
        <div style={{ ...card, height: "fit-content" }}>
          <DetailDrafWhatsapp
            key={data.id}
            data={{ ...data, ai_summary: aiSummary }}
            onSummaryUpdated={setAiSummary}
            onSuccessSend={onRefresh}
          />
        </div>
      </div>
    </div>
  );
}

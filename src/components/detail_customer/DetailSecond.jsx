export default function DetailSecond({ card, data }) {
  return (
    <div className="history-customer-container">
      <div style={{ ...card }}>
        <p className="font-gray">Kehadiran (30 hr)</p>
        <p className="font-red">{data.stats.attendance_7d}</p>
        <p className="font-gray">Kunjungan</p>
      </div>
      <div style={{ ...card }}>
        <p className="font-gray">Sesi Terlewat</p>
        <p className="font-red">{data.stats.missed_7d}</p>
        <p className="font-gray">Dari {data.stats.total_sessions_7d} Sesi</p>
      </div>
      <div style={{ ...card }}>
        <p className="font-gray">Reschedule</p>
        <p className="font-red">{data.stats.reschedule_7d}</p>
        <p className="font-gray">Kali Minggu ini</p>
      </div>
      <div style={{ ...card }}>
        <p className="font-gray">Sisa Paket</p>
        <p className="font-red">{data.stats.remaining_sessions}</p>
        <p className="font-gray">Sesi</p>
      </div>
      <div style={{ ...card }}>
        <p className="font-gray">Hari Sejak Kunjungan</p>
        <p className="font-red">{data.stats.days_since_last_visit}</p>
        <p className="font-gray">Hari</p>
      </div>
      <div style={{ ...card }}>
        <p className="font-gray">Reminder Respons</p>
        <p className="font-red">
          {data.stats.reminder_responded_7d}/{data.stats.reminder_total_7d}
        </p>
        <p className="font-gray"> Direspons</p>
      </div>
    </div>
  );
}

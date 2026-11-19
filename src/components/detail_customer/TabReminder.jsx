import { useState, useEffect } from "react";
import EmptyComponent from "../common/ErrorComponent/EmptyComponent";
import formatDateTime from "../common/formatDate";
import { updateReminder } from "../../services/reminderService";

export default function TabReminder({ data, onSuccessUpdate }) {
  const [reminders, setReminders] = useState(data || []);
  const [updatingId, setUpdatingId] = useState(null);
  useEffect(() => {
    setReminders(data || []);
  }, [data]);

  if (reminders.length === 0) {
    return <EmptyComponent />;
  }

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      // Sesuaikan key payload ('response_status') dengan yang diharapkan backend
      const updatedItem = await updateReminder(id, {
        response_status: newStatus,
      });

      // Update state lokal dengan data terbaru
      setReminders((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                response_status: updatedItem?.response_status || newStatus,
              }
            : item,
        ),
      );

      // Opsional: beritahu parent component jika perlu refetch data lain
      if (onSuccessUpdate) {
        onSuccessUpdate();
      }
    } catch (error) {
      console.error("Gagal mengubah status reminder:", error);
      alert("Gagal memperbarui status. Silakan coba lagi.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Channel</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((e) => {
            const isUpdating = updatingId === e.id;
            return (
              <tr key={e.id}>
                <td style={{ padding: "0.5rem" }}>
                  {formatDateTime(e.sent_at)}
                </td>
                <td>{e.channel}</td>
                <td>
                  <select
                    value={e.response_status || "no_response"}
                    disabled={isUpdating}
                    onChange={(event) =>
                      handleStatusChange(e.id, event.target.value)
                    }
                    style={{
                      color:
                        e.response_status === "replied" ? "#134e4a" : "red",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "10px",
                      border: "1px solid #9ca3af",
                      cursor: isUpdating ? "not-allowed" : "pointer",
                      opacity: isUpdating ? 0.6 : 1,
                    }}
                  >
                    <option value="no_response">Tidak direspons </option>
                    <option value="replied">Respons</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

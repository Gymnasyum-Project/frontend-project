import { useState, useRef, useCallback } from "react";
import { updateSummary } from "../../services/customerService";
import { createReminder } from "../../services/reminderService";

// "0812-3456 789" / "+62 812..." / "812..." -> "62812..." (format wa.me)
export const toWaNumber = (phone) => {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
};

// Dipakai di semua tombol "Kirim ke WhatsApp" (detail customer, followup-logs, dst).
//
//   const { send, sending, sendingId, info, clearInfo } = useSendWhatsapp();
//   const ok = await send({ customerId, phone, message, summaryId });
//
// Yang dilakukan send():
//   1. membuka WhatsApp (sebelum await apa pun, supaya tidak diblokir popup blocker)
//   2. mencatat reminder otomatis (POST /reminders, hanya customer_id yang dikirim)
//   3. kalau ada summaryId, menyimpan draf yang dikirim + status "approved"
// Mengembalikan true kalau REMINDER berhasil dicatat, false kalau tidak.
export function useSendWhatsapp() {
  const [sendingId, setSendingId] = useState(null);
  const [info, setInfo] = useState(null); // { type: "ok" | "error", text }
  const busy = useRef(false); // kunci sinkron: cegah klik ganda sebelum state sempat berubah

  const send = useCallback(
    async ({ customerId, phone, message, summaryId }) => {
      if (busy.current) return false;
      if (!customerId || !phone || !message?.trim()) return false;
      busy.current = true;

      // 1. WhatsApp dibuka PALING AWAL.
      const url = `https://wa.me/${toWaNumber(phone)}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");

      // 2. Catat ke sistem. Dua pekerjaan terpisah: satu gagal tidak membatalkan yang lain.
      setSendingId(customerId);
      setInfo(null);

      const tasks = [createReminder({ customer_id: customerId })];
      if (summaryId) {
        tasks.push(
          updateSummary(summaryId, {
            edited_draft: message,
            status: "approved",
          }),
        );
      }
      const [reminder] = await Promise.allSettled(tasks);

      busy.current = false;
      setSendingId(null);

      const ok = reminder.status === "fulfilled";
      setInfo(
        ok
          ? {
              type: "ok",
              text: "Pesan dibuka di WhatsApp dan dicatat sebagai reminder.",
            }
          : {
              type: "error",
              text: "WhatsApp sudah dibuka, tapi reminder gagal dicatat. Catat manual di form reminder.",
            },
      );
      return ok;
    },
    [],
  );

  const clearInfo = useCallback(() => setInfo(null), []);

  return {
    send,
    sending: sendingId !== null,
    sendingId, // id customer yang sedang diproses (berguna untuk tombol di dalam daftar)
    info,
    clearInfo,
  };
}

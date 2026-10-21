import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <input
          type={password ? (visible ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
        {password && (
          <button
            className="show-password"
            type="button"
            aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </label>
  );
}

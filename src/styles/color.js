export const COLORS = {
  green: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    150: "#14b8a6",
    200: "#0d9488",
    250: "#0F766E",
    300: "#115e59",
    350: "#134e4a",
  },
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  yellow: {
    50: "#faf5c8",
    100: "#ffc800",
    150: "#f59e0b",
  },
  red: {
    50: "#ffc4c4",
    100: "#ff0000",
  },
};

export const LABEL_COLORS = {
  Active: "#16a34a",
  "At Risk": "#dc2626",
  "Need Attention": "#f59e0b",
};

export const labelStyle = (value) => {
  const color = LABEL_COLORS[value] || "#6b7280";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: color + "1a",
    color: color,
    padding: "2px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 500,
  };
};

export const card = {
  backgroundColor: "#F9FAFB",
  boxShadow: "0 0 0 2px rgba(203, 213, 225, 0.2)",
  padding: "1rem ",
  borderRadius: "10px",
};

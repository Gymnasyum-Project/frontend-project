import { getModelVersion } from "../../services/SettingService";
import { useState, useEffect } from "react";

export const useGetModelVersion = () => {
  const [activeModel, setActiveModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchModelVersion = async () => {
      setModelLoading(true);
      setModelError(null);
      try {
        const result = await getModelVersion();
        const models = result ?? [];
        const active = models.find((m) => m.is_active);
        if (!ignore) setActiveModel(active ?? null);
      } catch (err) {
        if (!ignore) setModelError(err.message || "Gagal memuat versi model");
      } finally {
        if (!ignore) setModelLoading(false);
      }
    };

    fetchModelVersion();

    return () => {
      ignore = true;
    };
  }, []);
  return { activeModel, modelLoading, modelError };
};

import { useState, useEffect } from "react";
import "./PackageComponent.css";
import { useGetPackage } from "../../hooks/package/useGetPackage";
import { updatePackage } from "../../services/packageService";
import AddPackage from "./AddPackage";
import ListPackage from "./ListPackage";

export default function PackageComponent() {
  const { packages: fetched, refetch } = useGetPackage();
  const [packages, setPackages] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setPackages(fetched);
  }, [fetched]);

  const togglePackageStatus = async (paket) => {
    const next = paket.status === "active" ? "inactive" : "active";
    setUpdatingId(paket.id);
    setError("");
    try {
      await updatePackage(paket.id, { status: next });
      setPackages((cur) =>
        cur.map((p) => (p.id === paket.id ? { ...p, status: next } : p)),
      );
    } catch (err) {
      setError(
        err.response?.data?.error?.message ?? "Gagal mengubah status paket",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container-paket">
      <AddPackage onSuccess={refetch} />
      <ListPackage
        packages={packages}
        error={error}
        updatingId={updatingId}
        togglePackageStatus={togglePackageStatus}
      />
    </div>
  );
}

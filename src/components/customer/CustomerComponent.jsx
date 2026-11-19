import useCustomerHooks from "../../hooks/customer/useCustomerHooks";
import EmptyComponent from "../common/ErrorComponent/EmptyComponent";
import ErrorComponent from "../common/ErrorComponent/ErrorComponent";
import LoadingComponent from "../common/loading/LoadingComponent";
import TabBarCustomer from "./TabBarCustomer";
import TableCustomer from "./TableCustomer";
import { useState, useEffect } from "react";
import "./CustomerComponent.css";

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const formatText = (text) =>
  text
    ? text
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "-";

function CustomerComponent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("risk");
  const [activeLabel, setActiveLabel] = useState("Semua");
  const debouncedSearch = useDebounce(search);

  const { data, loading, loadingMore, error, refetch } = useCustomerHooks(
    page,
    20,
    debouncedSearch,
    activeLabel,
  );

  // Reset kembali ke halaman 1 setiap kali tab atau pencarian berubah
  const handleSelectTab = (label) => {
    setPage(1);
    setActiveLabel(label);
  };

  const handleSearchChange = (val) => {
    setPage(1);
    setSearch(val);
  };

  if (loading && page === 1 && !data?.meta) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} onRetry={refetch} />;

  const { data: customers = [], meta } = data ?? {};

  // Ambil total asli per kategori dari meta.counts backend
  const tabCounts = meta?.counts ?? {
    all: customers.length,
    at_risk: 0,
    need_attention: 0,
    active: 0,
  };

  const tabs = [
    { label: "Semua", total: tabCounts.all },
    { label: "At Risk", total: tabCounts.at_risk },
    { label: "Need Attention", total: tabCounts.need_attention },
    { label: "Active", total: tabCounts.active },
  ];

  // Sorting lokal tambahan (jika user ganti dropdown urutkan Kehadiran / Sisa Paket)
  const sortedData = [...customers].sort((a, b) => {
    switch (sortBy) {
      case "attendance":
        return Number(b.attendance_30d ?? 0) - Number(a.attendance_30d ?? 0);
      case "package":
        return (
          Number(a.remaining_sessions ?? Infinity) -
          Number(b.remaining_sessions ?? Infinity)
        );
      case "risk":
      default:
        return Number(b.priority_score ?? 0) - Number(a.priority_score ?? 0);
    }
  });

  const hasMore = meta ? customers.length < meta.total : false;

  return (
    <div>
      <div>
        <TabBarCustomer
          sortBy={sortBy}
          setSortBy={setSortBy}
          labels={tabs}
          activeLabel={activeLabel}
          setActiveLabel={handleSelectTab}
        />
        <TableCustomer
          search={search}
          setSearch={handleSearchChange}
          customers={customers}
          meta={meta}
          page={page}
          setPage={setPage}
          filterData={sortedData}
          EmptyComponent={EmptyComponent}
          formatText={formatText}
          activeLabel={activeLabel}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onLoadMore={() => setPage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
}

export default CustomerComponent;

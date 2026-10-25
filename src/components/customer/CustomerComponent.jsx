import useCustomerHooks from "../../hooks/useCustomerHooks";
import EmptyComponent from "../common/ErrorComponent/Emptycomponent";
import ErrorComponent from "../common/ErrorComponent/Errorcomponent";
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
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

function CustomerComponent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("risk");
  const [activeLabel, setActiveLabel] = useState("Semua");
  const debouncedSearch = useDebounce(search);
  const { data, loading, error, refetch } = useCustomerHooks(
    page,
    10,
    debouncedSearch,
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeLabel, sortBy]);

  // if(loading) return <LoadingComponent/>
  if (loading && !data) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} onRetry={refetch} />;
  // if(!data) return <EmptyComponent/>

  const { data: customers = [], meta } = data ?? {};

  const counts = customers.reduce((acc, c) => {
    acc[c.risk_label] = (acc[c.risk_label] ?? 0) + 1;
    return acc;
  }, {});
  const tabs = [
    { label: "Semua", total: customers.length },
    ...Object.entries(counts).map(([label, total]) => ({ label, total })),
  ];

  const filtered =
    activeLabel === "Semua"
      ? customers
      : customers.filter((e) => e.risk_label === activeLabel);

  const sortedData = [...filtered].sort((a, b) => {
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

  return (
    <div>
      <div>
        <TabBarCustomer
          sortBy={sortBy}
          setSortBy={setSortBy}
          labels={tabs}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
        />
      </div>
      <div>
        <TableCustomer
          search={search}
          setSearch={setSearch}
          customers={customers}
          meta={meta}
          page={page}
          setPage={setPage}
          filterData={sortedData}
          EmptyComponent={EmptyComponent}
          formatText={formatText}
          activeLabel={activeLabel}
        />
      </div>
    </div>
  );
}

export default CustomerComponent;

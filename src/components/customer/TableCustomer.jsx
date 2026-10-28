import { LABEL_COLORS } from "../../styles/color";
import EmptyComponent from "../common/ErrorComponent/Emptycomponent";
import { IoSearch } from "react-icons/io5";
import DataTable from "../common/DataTable/DataTable";
import { useNavigate } from "react-router-dom";

const card = {
  backgroundColor: "#F9FAFB",
  boxShadow: "0 0 0 2px rgba(203, 213, 225, 0.2)",
  padding: "0 1rem 1rem 1rem ",
  borderRadius: "10px",
};

const labelStyle = (value) => {
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
    fontWeight: 600,
  };
};

function TableCustomer({
  filterData = [],
  page,
  setPage,
  meta,
  customers,
  search,
  setSearch,
}) {
  const totalPages = meta?.totalPages ?? 1;
  const MAX_VISIBLE = 3;
  const navigate = useNavigate();

  let start = Math.max(1, page - Math.floor(MAX_VISIBLE / 2));
  let end = start + MAX_VISIBLE - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_VISIBLE + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div style={{ padding: "0 1rem" }}>
      <div style={card}>
        <div className="head-table">
          <div className="title-tabel">
            <p>List Customer</p>
          </div>
          <div className="header_search">
            <IoSearch
              className="header_search-icon"
              size={16}
              aria-hidden="true"
            />

            <input
              type="search"
              className="header_search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari customer..."
            />
          </div>
        </div>

        {filterData.length === 0 || null ? (
          <EmptyComponent />
        ) : (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <DataTable
              filterData={filterData}
              labelStyle={labelStyle}
              LABEL_COLORS={LABEL_COLORS}
              onDetail={(customer) => navigate(`/customer/${customer.id}`)}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "1rem",
            padding: "1rem 0",
          }}
        >
          <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
            -
          </button>

          {pages.map((n) => (
            <span
              key={n}
              style={{
                padding: "3px",
                border: "1px solid #6b7280",
                borderRadius: "5px",
              }}
              className={` ${n === page ? "active" : ""}`}
            >
              {n}
            </span>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={
              meta?.totalPages
                ? page >= meta.totalPages
                : customers.length < (meta?.limit ?? 10)
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableCustomer;

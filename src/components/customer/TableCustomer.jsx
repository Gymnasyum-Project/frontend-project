import { LABEL_COLORS, labelStyle, card } from "../../styles/color";
import EmptyComponent from "../common/ErrorComponent/EmptyComponent";
import { IoSearch } from "react-icons/io5";
import DataTable from "../common/DataTable/DataTable";
import { useNavigate } from "react-router-dom";

function TableCustomer({
  filterData = [],
  meta,
  search,
  setSearch,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
}) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "0 1rem" }}>
      <div style={card}>
        <div className="head-table">
          <div className="title-tab">
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
              placeholder="Cari nama, no. HP, atau CUST00001..."
            />
          </div>
        </div>

        {filterData.length === 0 ? (
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

        {filterData.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 0 0.25rem",
              marginTop: "0.5rem",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              Menampilkan <strong>{filterData.length}</strong> dari{" "}
              <strong>
                {(meta?.total ?? filterData.length).toLocaleString("id-ID")}
              </strong>{" "}
              customer
            </span>

            {hasMore && (
              <button
                type="button"
                onClick={onLoadMore}
                disabled={loadingMore}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #134E4A",
                  backgroundColor: "#ffffff",
                  color: "#134E4A",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: loadingMore ? "not-allowed" : "pointer",
                  opacity: loadingMore ? 0.6 : 1,
                }}
              >
                {loadingMore ? "Memuat data..." : "Muat 20 Data Lagi"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TableCustomer;

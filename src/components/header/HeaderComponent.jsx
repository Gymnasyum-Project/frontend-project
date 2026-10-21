import React from "react";
import { COLORS } from "../../../public/css/color";
import { IoSearch } from "react-icons/io5";
import "./style.css";

function HeaderComponent({ title, subTitle }) {
  return (
    <>
      <div className="container-header">
        <div>
          <p style={{ fontSize: "20px" }}>{title}</p>
          <p style={{ color: COLORS.gray[400], fontSize: "12px" }}>
            {subTitle}
          </p>
        </div>

        <div className="searchbar">
          <div className="search-container">
            <IoSearch className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Cari customer..."
              className="search-input"
            />
          </div>
        </div>
        <div className="profil">
          <div className="icon-person">
            <p>AD</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;

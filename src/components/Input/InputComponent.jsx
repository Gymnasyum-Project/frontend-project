import { useState } from "react";
import TabTambahCustomer from "./TabTambahCustomer";
import TabTambahKehadiran from "./TabTambahKehadiran";
import TabTambahPaket from "./TabTambahPaket";
import TabTambahReschedule from "./TabTambahReschedule";
import "./InputComponent.css";

const TABS = [
  "Input Customer",
  "Input Kehadiran",
  "Input Paket",
  "Input Reschedule",
];
export default function InputComponent() {
  const [activeTab, setActiveTab] = useState("Input Customer");

  return (
    <div className="container-input">
      <div className="container-tab">
        {TABS.map((tab) => (
          <div
            key={tab}
            className={`tabs ${activeTab === tab ? "active-tabs" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="card-tab">
        {activeTab === "Input Customer" && <TabTambahCustomer />}
        {activeTab === "Input Kehadiran" && <TabTambahKehadiran />}
        {activeTab === "Input Paket" && <TabTambahPaket />}
        {activeTab === "Input Reschedule" && <TabTambahReschedule />}
      </div>
    </div>
  );
}

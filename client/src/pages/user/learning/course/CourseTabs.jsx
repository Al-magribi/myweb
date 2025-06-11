import React from "react";

const CourseTabs = ({ TABS, activeTab, setActiveTab, renderTabContent }) => (
  <>
    <ul
      className='nav nav-tabs px-4 border-bottom'
      style={{ background: "#fff" }}
    >
      {TABS.map((tab) => (
        <li className='nav-item' key={tab.key}>
          <button
            className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
            style={{ cursor: "pointer" }}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
    <div
      style={{ background: "#fff", minHeight: 300, borderBottomLeftRadius: 8 }}
    >
      {renderTabContent()}
    </div>
  </>
);

export default CourseTabs;

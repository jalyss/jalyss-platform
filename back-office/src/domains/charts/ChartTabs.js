import React from "react";
import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import Charts2 from "./Charts2"
import Charts3 from "./Charts3";
// import Charts from "./Charts.js"
import '../../assets/styles/tabs.css'
const Tab = ({ children }) => {
  const { onClick, isActive } = useTabState();
  return (
    <li onClick={onClick} className={`${isActive ? "active" : "inactive"} tab`}>
      {children}
    </li>
  );
};

const Panel = ({ children }) => {
  const isActive = usePanelState();

  return isActive ? <p>{children}</p> : null;
};

const ChartTabs = () => {
  return (
    <Tabs>
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "1px solid gray",
          marginBottom: "60px"
        }}
      >
        <Tab >INSCRIPTIONS</Tab>
        <Tab>TRANSCATION</Tab>
        <Tab className="active">USERS-JOBS</Tab>
      </div>

      <Panel style={{ textAlign: 'center' }}>
        <Charts2/>
        </Panel>
      <Panel>   <Charts3/>
      </Panel>
      <Panel>

      <Charts/>
      </Panel>
    </Tabs>
  );
}

export default ChartTabs
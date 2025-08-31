import type { FilterStatus } from '../../types/todo.ts';
import React from 'react';
import {Tabs} from "antd";
import {isFilterStatus} from "../../helpers/filterGuard.ts";

interface TaskTabsProps {
  activeTab: FilterStatus;
  setActiveTab: (tab: FilterStatus) => void;
  countAll: number;
  countDone: number;
  countInWork: number;
}

export const TaskTabs: React.FC<TaskTabsProps> = React.memo(({
  activeTab,
  setActiveTab,
  countAll,
  countInWork,
  countDone,
}) => {
  const items = [
    {key: "all", label: `All tasks ${countAll}`},
    {key: "inWork", label: `In Work ${countInWork}`},
    {key: "completed", label: `Completed ${countDone}`},
  ];

  const handleChange = (key:string) => {
    if(isFilterStatus(key)) {
      setActiveTab(key)
    }
  }

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleChange}
      items={items}
      centered
      style={{ marginBottom: 25 }}
    />
  );
})

import type { FilterStatus } from '../../types/todo.ts';
import React from 'react';
import {Tabs} from "antd";

interface TaskTabsProps {
  activeTab: FilterStatus;
  setActiveTab: (tab: FilterStatus) => void;
  countAll: number;
  countDone: number;
  countInWork: number;
}

export const TaskTabs: React.FC<TaskTabsProps> = ({
  activeTab,
  setActiveTab,
  countAll,
  countInWork,
  countDone,
}) => {
  const items: {key: FilterStatus; label: string}[] = [
    {key: "all", label: `All tasks ${countAll}`},
    {key: "inWork", label: `In Work ${countInWork}`},
    {key: "completed", label: `Completed ${countDone}`},
  ];

  const handleChange = (key: string) => {
    if(key === "all" || key === "inWork" || key === "completed") {
      setActiveTab(key as FilterStatus)
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
};

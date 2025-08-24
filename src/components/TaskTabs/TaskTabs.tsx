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
  const items = [
    {key: "all", label: `All tasks ${countAll}`},
    {key: "inWork", label: `In Work ${countInWork}`},
    {key: "completed", label: `Completed ${countDone}`},
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key as FilterStatus)}
      items={items}
      centered
      style={{ marginBottom: 25 }}
    />
  );
};

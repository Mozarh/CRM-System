import type {FilterStatus} from "../types/todo.ts";
import * as React from "react";

interface TaskTabsProps {
  activeTab: FilterStatus;
  setActiveTab: (tab: FilterStatus) => void;
  countAll: number;
  countDone: number;
  countInWork: number;
}

export const TaskTabs:React.FC<TaskTabsProps> = ({activeTab, setActiveTab, countAll, countInWork, countDone}) => {
  return (
    <div className="task-tabs">
      <button
        className={`button ${activeTab === "all" ? "active" : ""}`}
        onClick={() => setActiveTab("all")}
      >
        All Task ({countAll})
      </button>

      <button
        className={`button ${activeTab === "inWork" ? "active" : ""}`}
        onClick={() => setActiveTab("inWork")}
      >
        In Work ({countInWork})
      </button>

      <button
        className={`button ${activeTab === "completed" ? "active" : ""}`}
        onClick={() => setActiveTab("completed")}
      >
        Done ({countDone})
      </button>
    </div>
  )
}
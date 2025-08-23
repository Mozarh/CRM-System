import type { FilterStatus } from '../../types/todo.ts';
import React from 'react';
import styles from './TaskTabs.module.css';
import { Button } from '../../ui/Button/Button.tsx';

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
  return (
    <div className={`${styles.taskTabs}`}>
      <Button
        variant="tab"
        active={activeTab === 'all'}
        onClick={() => setActiveTab('all')}
      >
        All Task ({countAll})
      </Button>

      <Button
        variant="tab"
        active={activeTab === 'inWork'}
        onClick={() => setActiveTab('inWork')}
      >
        In Work ({countInWork})
      </Button>

      <Button
        variant="tab"
        active={activeTab === 'completed'}
        onClick={() => setActiveTab('completed')}
      >
        Done ({countDone})
      </Button>
    </div>
  );
};

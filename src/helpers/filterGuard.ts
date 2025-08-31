import type {FilterStatus} from "../types/todo.ts";

export function isFilterStatus(key: string): key is FilterStatus {
  return key === "all" || key === "inWork" || key === "completed";
}

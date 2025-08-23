import Dexie, { Table } from 'dexie';

export type SourceType = 'manual' | 'gmail' | 'calendar' | 'teams';
export type TaskType = 'task' | 'event';

export interface Task {
  id?: number;
  title: string;
  from?: Date | undefined;
  to?: Date | undefined;
  description: string | undefined;
  type: TaskType;
  completed: boolean;
  createdAt: Date;
  allDay: boolean;
  source: SourceType;
  deleted: boolean;
}

export class ToSynqDB extends Dexie {
  public task!: Table<Task, Number>;

  constructor() {
    super('TaskDatabase');

    this.version(1).stores({
      task: '++id',
    });
  }
}

export const db = new ToSynqDB();

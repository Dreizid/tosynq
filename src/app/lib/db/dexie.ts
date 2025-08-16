import Dexie, { Table } from 'dexie';

export type SourceType = 'manual' | 'gmail' | 'calendar' | 'teams';

export interface Task {
  id?: number;
  title: string;
  from?: Date | undefined;
  to?: Date | undefined;
  description: string;
  completed: boolean;
  createdAt: Date;
  source: SourceType;
}

export class ToSynqDB extends Dexie {
  public task!: Table<Task, 'id'>;

  constructor() {
    super('TaskDatabase');

    this.version(1).stores({
      task: '++id',
    });
  }
}

export const db = new ToSynqDB();

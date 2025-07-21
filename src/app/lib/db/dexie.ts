import Dexie from 'dexie';

export interface Task {
	id?: number;
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
}

class ToSynqDB extends Dexie {
	
}

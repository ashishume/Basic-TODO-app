export interface ITask {
  _id: string;
  title?: string;
  taskStatus?: string;
  description?: string;
  createdAt: string;
}

export interface IInitialState {
  tasks: ITask[];
  isLoading: boolean;
}

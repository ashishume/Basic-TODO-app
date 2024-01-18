export interface ITask {
  _id: string;
  title: string;
  taskStatus: string;
  description: string;
}

export interface IInitialState {
  tasks: ITask[];
  isLoading: boolean;
}

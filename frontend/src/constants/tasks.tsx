export enum TASK_STATUS {
  DONE = 'Done',
  TODO = 'To Do',
  INPROGRESS = 'In Progress',
}
export const options = [
  { key: 1, label: TASK_STATUS.TODO },
  { key: 2, label: TASK_STATUS.INPROGRESS },
  { key: 3, label: TASK_STATUS.DONE },
];

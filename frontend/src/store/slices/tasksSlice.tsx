import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Axios } from '../../services/http-service';
import { API_PATHS } from '../../constants/api-path';
import { IInitialState, ITask } from '../../models/task';
import { TASK_STATUS } from '../../constants/tasks';

const productInitial = {
  _id: '',
  title: '',
  taskStatus: '',
  description: '',
  createdAt: '',
};

const initialState: IInitialState = {
  tasks: [productInitial],
  isLoading: false,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  let userId = '';
  const userIdData = localStorage.getItem('userId');
  if (userIdData) {
    userId = userIdData;
  }
  const response = await Axios.get(API_PATHS.TASK + '/' + userId, {
    withCredentials: true,
  });
  return response.data;
});
export const createTasks = createAsyncThunk(
  'tasks/createTasks',
  async (payload: ITask) => {
    let userId = '';
    const userIdData = localStorage.getItem('userId');
    if (userIdData) {
      userId = userIdData;
    }
    const response = await Axios.post(API_PATHS.TASK + '/' + userId, payload);
    return response.data;
  }
);
export const updateTasks = createAsyncThunk(
  'tasks/updateTasks',
  async (payload: { id: string; taskStatus: string }) => {
    const response = await Axios.patch(
      API_PATHS.TASK + '/' + payload.id,
      payload
    );
    return response.data;
  }
);

// export const searchTasks = createAsyncThunk(
//   'task/searchTasks',
//   async (searchValue: string) => {
//     const response = await Axios.get(
//       API_PATHS.SEARCH + '?searchValue=' + searchValue,
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearState: (state) => initialState,
    updateCheckedStatus: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload.id) {
          task.taskStatus = action.payload.taskStatus;
        }
        return task;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.pending,
      (state: IInitialState, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchTasks.fulfilled,
      (state: IInitialState, action: PayloadAction<any>) => {
        state.tasks = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchTasks.rejected,
      (state: IInitialState, action: PayloadAction<any>) => {
        state.tasks = [];
        state.isLoading = false;
      }
    );
    // builder.addCase(
    //   searchTasks.pending,
    //   (state: IInitialState, action: PayloadAction<any>) => {
    //     state.isLoading = true;
    //   }
    // );
    // builder.addCase(
    //   searchTasks.fulfilled,
    //   (state: IInitialState, action: PayloadAction<any>) => {
    //     state.tasks = action.payload;
    //     state.isLoading = false;
    //   }
    // );
    // builder.addCase(
    //   searchTasks.rejected,
    //   (state: IInitialState, action: PayloadAction<any>) => {
    //     state.tasks = [];
    //     state.isLoading = false;
    //   }
    // );
  },
});

export const { clearState, updateCheckedStatus } = tasksSlice.actions;
export const selectProducts = (state: IInitialState) => state.tasks;
export default tasksSlice.reducer;

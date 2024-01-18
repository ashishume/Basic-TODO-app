import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Axios } from '../../services/http-service';
import { API_PATHS } from '../../constants/api-path';
import { IInitialState, ITask } from '../../models/task';

const productInitial = {
  _id: '',
  title: '',
  taskStatus: '',
  description: '',
};

const initialState: IInitialState = {
  tasks: [productInitial],
  isLoading: false,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await Axios.get(API_PATHS.TASK, { withCredentials: true });
  return response.data;
});

export const searchTasks = createAsyncThunk(
  'task/searchTasks',
  async (searchValue: string) => {
    const response = await Axios.get(
      API_PATHS.SEARCH + '?searchValue=' + searchValue,
      { withCredentials: true }
    );
    return response.data;
  }
);
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearState: (state) => initialState,
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
    builder.addCase(
      searchTasks.pending,
      (state: IInitialState, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      searchTasks.fulfilled,
      (state: IInitialState, action: PayloadAction<any>) => {
        state.tasks = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      searchTasks.rejected,
      (state: IInitialState, action: PayloadAction<any>) => {
        state.tasks = [];
        state.isLoading = false;
      }
    );
  },
});

export const { clearState } = tasksSlice.actions;
export const selectProducts = (state: IInitialState) => state.tasks;
export default tasksSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {api} from '../../api';
import {RootState} from '../store';

export interface Article {
  id: string;
  content: string;
  images: string[];
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ArticleState {
  items: Article[];
  status: RequestStatus;
  error: string | undefined;
}

const initialState: ArticleState = {
  items: [],
  status: 'idle',
  error: undefined,
};

export const articleSlice = createSlice<
  ArticleState,
  SliceCaseReducers<ArticleState>
>({
  name: 'articles',
  initialState,
  reducers: {
    articleAdded: {
      prepare(content: string, images: string[]) {
        return {payload: {content, images}};
      },
      reducer(state, action) {
        state.items.push(action.payload);
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllArticles.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.items = state.items.concat(action.payload);
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {articleAdded} = articleSlice.actions;

export const selectAllArticles = (state: RootState) => state.articles.items;
export const selectArticleStatus = (state: RootState) => state.articles.status;

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async () => {
    const data = await api.getArticles();
    return data as Article[];
  },
);

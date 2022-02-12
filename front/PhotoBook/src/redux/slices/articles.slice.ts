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
  reducers: {},
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
    builder.addCase(addNewArticle.fulfilled, (state, action) => {
      console.log('addNewArticle fulfilled. action: ', action);
      // We can directly add the new post object to our posts array
      state.items.push(action.payload);
    });
  },
});

export const selectAllArticles = (state: RootState) => state.articles.items;
export const selectArticleStatus = (state: RootState) => state.articles.status;

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async () => {
    const data = await api.getArticles();
    return data as Article[];
  },
);

export const addNewArticle = createAsyncThunk(
  'articles/new',
  // The payload creator receives the partial `{title, content, user}` object
  async (article: Omit<Article, 'id'>) => {
    console.log('article to be added: ', article);
    // We send the initial data to the fake API server
    const response = await api.addNewArticle(article as Article);
    return response;
  },
);

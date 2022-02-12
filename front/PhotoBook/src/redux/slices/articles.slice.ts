import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface Article {
  id: string;
  content: string;
  images: string[];
}

export type RequestStatus = 'idle' | 'pending' | 'error' | 'succeeded';

export interface ArticleState {
  items: Article[];
  status: RequestStatus;
  error: string | null;
}

const initialState: ArticleState = {
  items: [],
  status: 'idle',
  error: null,
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
});

export const {articleAdded} = articleSlice.actions;

export const selectAllArticles = (state: RootState) => state.articles.items;

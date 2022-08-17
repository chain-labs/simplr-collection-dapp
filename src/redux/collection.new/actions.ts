import { createAction } from '@reduxjs/toolkit';
import { CollectionState } from './types';

export const setCollectionDetails = createAction<CollectionState>('collection/SET_COLLECTION_DETAILS');

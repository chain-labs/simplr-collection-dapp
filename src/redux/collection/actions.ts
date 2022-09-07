import { createAction } from '@reduxjs/toolkit';
import { CollectionState } from './types';

export const setCollectionDetails = createAction<CollectionState>('collection/SET_COLLECTION_DETAILS');

export const setCollectionType = createAction<1 | 2>('collection/SET_COLLECTION_TYPE');

export const setCollectionNetwork = createAction<'Ethereum' | 'Polygon'>('collection/SET_COLLECTION_NETWORK');

import { rootState } from './../store/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useTypeSelector: TypedUseSelectorHook<rootState> = useSelector
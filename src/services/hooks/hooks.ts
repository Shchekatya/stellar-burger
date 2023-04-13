import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux'
import {AppDispatch,RootState,AppThunk, TypedDispatch} from "../../index";



export const useDispatch = () => dispatchHook<TypedDispatch<RootState>>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 

import {hookstate, useHookstate} from '@hookstate/core';
import { localstored } from '@hookstate/localstored';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = hookstate({}, localstored({
    key: 'user-store',
    engine: AsyncStorage
}))

const wrapState = (s) => ({
    get: () => s.value,
    set: (newVal) => s.set(newVal)
})
 
export const accessGlobalUserState = () => wrapState(store)
export const useGlobalUserState = () => wrapState(useHookstate(store))
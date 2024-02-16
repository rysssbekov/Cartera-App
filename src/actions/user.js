import Toast from 'react-native-toast-message';
import { userApi } from "../api"
import { accessGlobalUserState } from "../stores/user"

const signIn = async (login, password) => {
    const data = {}
    try {
        const reqBody = {
            login,
            password
        }
        const response = await userApi.signIn(reqBody)
        if(response.data.token) {
            accessGlobalUserState().set(response.data)
            data.success = true
        }
    } catch(e) {
        console.log(e)
        data.success = false
        data.error = e.response?.data?.message?.length ? e.response.data.message[0] : `${e.code}; ${e.message}; ${e.name}`
        Toast.show({
            type: 'error',
            text1: 'Ошибка!',
            text2: data.error
        })
    }
    return data
}

export {
    signIn
}
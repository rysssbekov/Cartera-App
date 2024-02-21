import Toast from 'react-native-toast-message';
import { articlesApi, userApi } from "../api"
import { accessGlobalUserState } from "../stores/user"

const getAllArticles = async () => {
    const data = {
        success: false
    }
    try {
        const response = await articlesApi.all()
        if(response.data.articles) {
            data.success = true
            data.articles = response.data.articles
        }
    } catch(e) {
        console.log(e)
        data.success = false
        Toast.show({
            type: 'error',
            text1: 'Ошибка!',
            text2: data.error
        })
    }
    return data
}

const getAllEvents = async () => {
    const data = {
        success: false
    }
    try {
        const response = await articlesApi.allEvents()
        if(response.data.events) {
            data.success = true
            data.events = response.data.events
        }
    } catch(e) {
        console.log(e)
        data.success = false
        Toast.show({
            type: 'error',
            text1: 'Ошибка!',
            text2: data.error
        })
    }
    return data
}

export {
    getAllArticles,
    getAllEvents
}
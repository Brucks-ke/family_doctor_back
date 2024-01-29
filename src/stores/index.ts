import {legacy_createStore as createStore , combineReducers} from "redux"

import {persistReducer} from "redux-persist"

// 储存机制
import storage from 'redux-persist/lib/storage';

// 持久化配置
const storageConfig = {
    key : "root",
    storage :storage,

}

const initState = {
    user : {
        token : "" as string,
        userId : "" as string,
    }
}

//用户操作
function changeUserRenduce(state=initState.user,action:{type:string,payload:string}){
    switch (action.type) {
        case "user/addToken" : 
            return {...state,token:action.payload}
            break
        case "user/addUserId" : 
            return {...state,userId:action.payload}
            break
        default :
            return state
    }
}


// 其他操作
function changeOtherRenducer(state=initState.user,action:{type:string,action:{payload:string}}){
    switch (action.type) {
        case "other/addToken" : 
        console.log(action.action);
        
            return {...state,userId:action.action.payload}
            break
        default :
            return state
    }
}



// 合并所有的redux 改变reducer函数
const allReducer = combineReducers({
    user : changeUserRenduce,
    ohter : changeOtherRenducer
})



const store = createStore(persistReducer(storageConfig,allReducer),initState)

export default store

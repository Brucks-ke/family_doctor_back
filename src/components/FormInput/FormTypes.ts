//搜索框的api
export interface ISearchApi {
    url : string,
    method : string,
    data? : any
}

//搜索框的选项
type type = any


export interface IForm {
    label : string,
    name? : string,
    value : string,
    disabled? : boolean,
    optionApi? : ISearchApi,
    type : string,
    mode ? : string,
    optionList? : IForm,
    fieldNames? : string,
    required? : boolean,
}



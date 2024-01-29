import intance from "../../../utils/request";



// 获取所有的团队信息
export function getAllSuoYouTeams(){
    return intance.post("/api/searchTeamByNameNumber")
}
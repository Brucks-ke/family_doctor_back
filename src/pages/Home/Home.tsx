import React from 'react'
import { useImmer } from "use-immer"
import GlobalMessage from '../../utils/GlobalMessage'


export default function HomePage() {
    const [userList,setUserList] = useImmer({
        username : "武大" ,
        age : 20
    })
    


    
    const editSchool = () =>{
        setUserList((draft)=>{
            draft.username = "蜗大"
            console.log(userList);
            
        })
        
        
    }
    




  return (
    <div>
        <div>{userList.username}</div>
        <button onClick={editSchool}>修改学校</button>
    </div>
  )
}

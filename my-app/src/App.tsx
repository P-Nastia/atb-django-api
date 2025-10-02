
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import type {IUserItem} from "./types/users/IUserItem.ts";

function App() {
    const [users,setUsers] = useState<Array<IUserItem>>([]);
    useEffect(()=>{
        loadlist();
    },[])
    const loadlist=async()=>{
        try{
            const result=
                await axios<IUserItem[]>("http://127.0.0.1:8099/api/users/");
            setUsers(result.data);
            console.log("--Load data--",result);
        }
        catch(e){
            console.error("--Problem--",e);
        }
    }
    console.log("--Get Users--",users);
    const contentUsers=users.map((user:IUserItem)=>{
        return(
            <tr key={user.id}>
                <th>{user.id}</th>
                <th>{user.first_name} {user.last_name}</th>
                <th>{user.email}</th>
            </tr>
        )
    });

    return (
        <>
            <h1>Hello bees!</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Full name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {contentUsers}
                </tbody>
            </table>
        </>
    )
}

export default App

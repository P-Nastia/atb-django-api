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
            <tr key={user.id} className="bg-yellow-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.id}
                </th>
                <td className="px-6 py-4">
                    {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4">
                    {user.email}
                </td>
            </tr>
        )
    });

    return (
        <>
            <h1 className={"text-3xl font-bold text-center"}>Hello bees!</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-yellow-200">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3 bg-yellow-200">
                            Full name
                        </th>
                        <th scope="col" className="px-6 py-3 bg-yellow-200">
                            Email
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {contentUsers}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App

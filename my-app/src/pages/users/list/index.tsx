
import type {IUserItem} from "../../../types/users";
import {useGetUsersQuery} from "../../../services/userService.ts";
import LoadingOverlay from "../../../components/loading";
import UserListItem from "./UserListItem.tsx";

const UsersListPage = () => {

    const {data: users, isLoading}=useGetUsersQuery();
    console.log("listUsers",users);

    const contentUsers=users?.map((user:IUserItem)=>{
        return(
            <UserListItem user={user}></UserListItem>
        )
    });
    return (
        <>
            {(isLoading) && <LoadingOverlay />}
            <h1 className={"text-3xl font-bold text-center"}>Hello bees!</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-yellow-200">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3 bg-yellow-200">
                            Image
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

export default UsersListPage;
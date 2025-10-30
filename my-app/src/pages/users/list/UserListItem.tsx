
import type { IUserItemAsp} from "../../../types/users";

interface Props{
    user:IUserItemAsp
}
const UserListItem: React.FC<Props>=({user})=>{
    return (
        <>
            <tr key={user.id} className="bg-yellow-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.id}
                </th>
                <td className="px-6 py-4">
                    <img src={user.image} alt={user.last_name} width={80} />
                </td>
                <td className="px-6 py-4">
                    {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4">
                    {user.email}
                </td>
            </tr>
        </>
    )
}

export default UserListItem;
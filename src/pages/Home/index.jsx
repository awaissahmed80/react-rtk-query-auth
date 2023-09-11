import { useDispatch } from 'react-redux'
import { authActions } from "../../redux/slices"
import { Button, Spinner } from "../../ui-components"
import { useAuth } from '../../hooks'
import { userApi } from '../../redux/apis'


export default function Home(){

    const dispatch = useDispatch()
    const { auth: { user} } = useAuth()
    const { data, isFetching: fetching } = userApi.useGetUsersQuery()

    const handleLogout = () => {
        dispatch(authActions.logout())
    }

    

    return(
        <div className="p-10 format max-w-full block">
            
            <h1>{`Welcome ${user.fname} ${user?.lname}`}</h1>
            <Button onClick={handleLogout}>Logout</Button>

            {
                fetching ?
                <Spinner />
                :
                <>
                <table className="w-full border my-5 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">                    
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data?.users?.map((data, k) =>
                        <tr key={k} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{`${data.first_name} ${data.last_name}`}</td>
                            <td className="px-6 py-4" >{data?.email}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
                </>
            }
        </div>
    )
}
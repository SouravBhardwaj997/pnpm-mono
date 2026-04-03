import { useQuery } from "@tanstack/react-query"
import { trpc } from "../utils/trpc"

export default function Test() {
    const userQuery=useQuery(trpc.tempRoute.queryOptions())
    console.log("userQuery",userQuery)
  return (
    <div>
        <ul>
            {userQuery.data?.map((el)=>(
                <li>{el.id} - {el.name} - {el.age}</li>
            ))}
        </ul>
    </div>
  )
}

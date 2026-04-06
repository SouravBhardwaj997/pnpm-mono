import { useQuery } from "@tanstack/react-query"
import { trpc } from "../utils/trpc"

export const useCheckAuth=()=>{
    return useQuery(trpc.auth.me.queryOptions())
}
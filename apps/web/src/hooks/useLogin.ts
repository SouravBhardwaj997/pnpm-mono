import { useMutation } from "@tanstack/react-query";
import type { User } from "./useSignUp";
import type { LoginInSchemaType } from "../schema/signUpSchema";
import { parseTRPCErrors } from "../utils/parseTRPCErrors";
import { trpc } from "../utils/trpc";


type UseLoginProps = {
    onSuccess?: ({ user, token }: {
        user: User, 
        token: string;
    }) => void,
    onFieldErrors?: (field: keyof LoginInSchemaType, message: string) => void,
    onGlobalError?: (err: string) => void
}
export function useLogin({ onSuccess,onFieldErrors,onGlobalError }: UseLoginProps) {
    return useMutation(trpc.auth.login.mutationOptions({
        onSuccess,
        onError:(err)=>{
            const result=parseTRPCErrors<LoginInSchemaType>(err)
            if(result.fieldErrors){
                Object.entries(result.fieldErrors).map(([field,message])=>{
                    onFieldErrors?.(field as keyof LoginInSchemaType,message)
                })
            }
            if(result.globalError){
                onGlobalError?.(err.message)
            }
        }
    }))
}
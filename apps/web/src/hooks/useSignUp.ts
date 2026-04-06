import { useMutation } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import type { SignUpSchemaType } from "../schema/signUpSchema";
import { parseTRPCErrors } from "../utils/parseTRPCErrors";


export type User = {
  username: string,
  name: string;
  email: string;
  createdAt: string;
  id: number;
}

type UseSignUpProps = {
  onSuccess?: ({ user, token }: {
    user: User,
    token: string;
  }) => void,
  onFieldErrors?: (field: keyof SignUpSchemaType, message: string) => void,
  onGlobalError?: (err: string) => void
}

export function useSignUp({
  onSuccess,
  onFieldErrors,
  onGlobalError
}: UseSignUpProps) {
  const signUpMutation = useMutation(trpc.auth.signUp.mutationOptions({
    onSuccess: onSuccess,
    onError: (err) => {
      const result = parseTRPCErrors<SignUpSchemaType>(err);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).map(([field, message]) => {
          onFieldErrors?.(field as keyof SignUpSchemaType, message)
        })
      }
      if(result.globalError){
        onGlobalError?.(result.globalError)
      }
    },
  }));
  return signUpMutation
}

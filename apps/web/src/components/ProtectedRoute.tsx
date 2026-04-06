import {  useNavigate } from "react-router-dom"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { Loader } from "lucide-react"

export default function ProtectedRoute({children}:{children:React.JSX.Element}) {
    const { isLoading, isError } = useCheckAuth()
    const navigate = useNavigate()
    if(isLoading){
        return <div className="min-h-screen flex justify-center items-center">
            <Loader className="animate-spin"/>
        </div>
    }
    if(isError){
        navigate("/login")
    }
    return (
        <div>{children}</div>
    )
}

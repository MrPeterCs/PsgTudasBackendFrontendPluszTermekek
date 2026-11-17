import { useReducer } from "react"

export default function UserProfile({getUser}){
    const user = getUser()
    return(
        <>
        <div className="container">
            <h1>Profil</h1>
            <p>Név: {user.name}</p>
            <p>Felhasználó azonosító: {user.id}</p>
            <p>Jogi: {user.role === 1 ? "Admin" : "Felhasználó"}</p>
        </div>
        </>
    )
}
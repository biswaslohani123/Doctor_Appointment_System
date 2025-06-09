import { createContext, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {dToken, setDToken} = useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):"")

    const value = {
            backendUrl,
            setDToken,
            dToken
    }

    return (
        <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider
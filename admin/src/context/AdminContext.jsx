import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken, setATokenState] = useState(() => localStorage.getItem('atoken') || "");
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Custom setter that updates both state and localStorage
    const setAToken = (token) => {
        setATokenState(token);
        if (token) {
            localStorage.setItem('atoken', token);
        } else {
            localStorage.removeItem('atoken');
        }
    };

    

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/doctor-list', 
                {}, 
                { headers: { atoken } }
            );
            
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            
            // If token is invalid, clear it
            if (error.response?.status === 401) {
                setAToken("");
            }
        }
    };

    const changeAvaibility = async (docId) => {
            try {
                const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers: {atoken}})
                if (data.success) {
                    toast.success(data.message)
                    getAllDoctors()
                    
                }else{
                    toast.error(data.message);
                }

            } catch (error) {
                 toast.error(error.message);
            }
    }

    const getAllAppointments = async () => {

        try {
            const {data} = await axios.get(backendUrl + '/api/admin/get-appointment', {headers: {atoken}})

            if (data.success) {
                setAppointments(data.appointments)
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message);
        }
    }

    const value = {
        atoken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvaibility,
        getAllAppointments,
        appointments,
        setAppointments
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
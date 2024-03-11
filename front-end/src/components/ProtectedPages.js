import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { GetCurrentUser, getCurrentUser } from "../apicalls/users";
import { getLoggedInUserName } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/userSlice";
import store from "../redux/store";
import { Error } from "mongoose";
import { SetLoading } from "../redux/loaderSlice";


function ProtectedPage({ children }) {
    const { currentUser } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getCurrentUser = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetCurrentUser();
            if (response.success) {
                message.success(response.message);
                dispatch(SetCurrentUser(response.data));
                dispatch(SetLoading(false));
            } else {
                throw new Error(response.message);
            }


        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);

        }
    };



    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        } else {
            navigate("/login");
        }
    }, []);
    

    return (
        currentUser && (

            <div>
                {/* header */}
                <div className="flex justify-between items-center bg-primary text-white px-5 py-2">

                    <div>
                        <h1 className="text-2xl  cursor-pointer mr-2 mb-0" onClick={()=>{
                            navigate("/");
                        }

                        }>SBI BLOODBANK</h1>
                        <span className="text-xs" >
                            {currentUser.userType.toUpperCase()}
                        </span>
                    </div>



                    <div className="flex items-center gap-1">
                        <i class="ri-shield-user-line"> </i>
                        <div className="flex flex-col">
                            <span className="mr-5 text-md cursor-pointer" 
                            onClick={ () =>{
                                navigate("/profile");
                            }}>
                                {getLoggedInUserName(currentUser).toUpperCase()}
                            </span>

                        </div>
                        <i className="ri-logout-circle-line ml-5 cursor-pointer"
                        onClick={() =>{
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                        ></i>
                    </div>
                </div>

                {/* content */}
                <div className="px-5 py-2"> {children}</div>

            </div>
        )
    );


}
export default ProtectedPage;
import { axiosInstance } from ".";

export const LoginUser = async (payload) => {
   const response = await axiosInstance("post", "/api/users/login", payload);
   return response;
}

export const RegisterUser = async (payload) => {
   const response = await axiosInstance("post", "/api/users/register", payload);
   return response;
}

export const GetCurrentUser = async () => {
   const response = await axiosInstance("get", "/api/users/get-current-user");
   return response;
}

export const getAllDonarsOfAnOrganization =()=>{
   return axiosInstance("get", "/api/users/get-all-donars");
}

export const getAllHospitalsOfAnOrganization =()=>{
   return axiosInstance("get", "/api/users/get-all-hospitals");
}

export const getAllOrganizationsOfDonar =()=>{
   return axiosInstance("get", "/api/users/get-all-organization-of-donar");
}

export const getAllOrganizationsOfHospitals =()=>{
   return axiosInstance("get", "/api/users/get-all-organization-of-hospital");
}
 
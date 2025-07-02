import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate, useNavigate } from 'react-router';
import ErrorAlert from '../components/ErrorAlert';

const Register = () => {
    const { registerUser, errMsg } = useAuthContext();
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState("")

    const {register, handleSubmit, watch ,formState: {errors} } = useForm(); 

    const onSubmit = async (data) => {
        delete data.confirm_password
        try{
            const response =  await registerUser(data)
            if(response.success){
              setSuccessMsg(response.message);            
              navigate('/resend-activation');
            }
        }catch(error){
            console.log("Registration Failed.", error);
        }
    }
 


    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            {errMsg && <ErrorAlert errormessage={errMsg} /> }
            {successMsg && (
              <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span> {successMsg} </span>
            </div>
            )}



            <h2 className="card-title text-2xl font-bold">Sign Up</h2>
            <p className="text-base-content/70">
              Create an account to get started
            </p>
  
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label" htmlFor="first_name">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  className="input input-bordered w-full"
                  {...register("first_name" , {required:true})}
                />
               {errors.first_name && (<span className="text-error"> 
                    {errors.first_name.message} </span> 
                )}   
              </div>
  
              <div className="form-control">
                <label className="label" htmlFor="last_name">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered w-full"
                  {...register("last_name" , {required:true})}
                />
                {errors.last_name && (<span className="text-error"> 
                    {errors.last_name.message} </span> 
                )}   
              </div>
  
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full"
                  {...register("email" , {required:true})}
                />         
                {errors.email && (<span className="text-error"> 
                    {errors.email.message} </span> 
                )}        
                {/* <p>{watch("email")}</p> */}
              </div>
  
              <div className="form-control">
                <label className="label" htmlFor="address">
                  <span className="label-text">Address</span>
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="7/A Dhanmondi, Dhaka"
                  className="input input-bordered w-full"
                  {...register("address")}
                />
              </div>
  
              <div className="form-control">
                <label className="label" htmlFor="phone_number">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  id="phone_number"
                  type="text"
                  placeholder="0123456789"
                  className="input input-bordered w-full"
                  {...register("phone_number")}
                />
              </div>
  
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  {...register("password" , {required:true, minLength:{value:8, message: "Password is must be 8 characters"}})}
                />
                {errors.password && (<span className="text-error"> 
                    {errors.password.message} </span> 
                )} 
              </div>
  
              <div className="form-control">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"    
                  {...register("confirm_password" , {required:true, 
                    validate: (value) => value === watch('password') || "Password do not match."},                
                  )}
                />
                {errors.confirm_password && (<span className="text-error"> 
                    {errors.confirm_password.message} </span> 
                )} 

              </div>
  
              <button type="submit" className="btn btn-warning text-black w-full">Register</button>
            </form>
  
            <div className="text-center mt-4">
              <p className="text-base-content/70">
                Already have an account?{" "}
                <a href='/login' className="link link-primary">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;
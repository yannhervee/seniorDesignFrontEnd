// Higher Order Component
// Render prop technique

import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, selectUser } from "../features/userSlice";
import { axiosInstance } from "../utils/auth";


const isServer = typeof window === 'undefined';

const withUser = (WrappedComponent) => {
    const WithUser = (props) => {

        const dispatch = useDispatch()
        const user = useSelector(selectUser)

        console.log('user', user)
      
        const [loading, setLoading] = useState(!user)

        useEffect(() => {
            if (!loading) return 

            axiosInstance().get('http://localhost:3001/users/fetch_current_user')
            .then((res) => {
                console.log(res)
                if(res.data){
                    dispatch(register(res.data))
                }else{
                    if(Router.pathname!= "/register"){
                        Router.push('/login')
                    }
                }
                //res.data ? dispatch(register(res.data)) : Router.push('/login')
                setLoading(false)             
            })
            .catch(() => {
                //
            })

        }, [loading])
      

        if (isServer) {
            return null
        } else if ((['/login', '/register'].includes(Router.pathname) && user) && (Router.pathname!= "/register")) {
            console.log("am i here?")
            Router.push('/dashboard')
            return null
        } else {
            return loading ? 'Loading...' : <WrappedComponent {...props} />;
        }
    };
  
    // WithUser.propTypes = {};
  
    return WithUser
  };
  
  export default withUser;
  
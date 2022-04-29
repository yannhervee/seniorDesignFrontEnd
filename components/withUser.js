// Higher Order Component
// Render prop technique

import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, selectUser } from "../features/userSlice";
import { axiosInstance } from "../utils/auth";

const isServer = typeof window === "undefined";

const withUser = (WrappedComponent) => {
  const WithUser = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    console.log("user", user);

    const [loading, setLoading] = useState(!user);

    useEffect(() => {
      if (!loading) return;

      axiosInstance()
        .get("/users/fetch_current_user")
        .then((res) => {
          console.log(res);

          /*if(res.data){
                    dispatch(register(res.data))
                }else{
                    if(Router.pathname!= "/register"){
                        Router.push('/login')
                    }
                }*/
          dispatch(register(res.data));
          //res.data ? dispatch(register(res.data)) : Router.push('/login')
          setLoading(false);
        })
        .catch(() => {
          //
        });
    }, [loading]);

    console.log("user ", user);

    if (isServer) {
      return null;
    } else if (
      ["/login", "/register", "/resetpassword"].includes(Router.pathname) &&
      user
    ) {
      console.log("am i here?");
      Router.push("/dashboard");
      return null;
    } else {
      if (loading) {
        return "Loading";
      } else if (
        !["/login", "/register", "/resetpassword", "/passwordchange"].includes(
          Router.pathname
        ) &&
        !user
      ) {
        Router.push("/login");
        return null;
      } else {
        return <WrappedComponent {...props} />;
      }
    }
  };

  // WithUser.propTypes = {};

  return WithUser;
};

export default withUser;

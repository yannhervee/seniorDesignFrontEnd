import Image from "next/image";
import logo from "../public/Translogo.png";
import styles from "../styles/Register.module.css";
import Link from "next/link";
import withUser from "../components/withUser";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosInstance, setAuthInfo } from "../utils/auth";
import { useDispatch } from "react-redux";
import { register } from "../features/userSlice";

const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const resetPassword = async (event) => {
    event.preventDefault();

    const payload = { password, password_confirmation: confirmPassword };
    const headers = {
      "access-token": router.query["access-token"],
      client: router.query.client,
      expiry: router.query.expiry,
      uid: router.query.uid,
    };
    console.log("payload", payload, headers);
    axiosInstance()
      .put("/auth/password", payload, { headers })
      .then((res) => {
        console.log("on password update", res);
        setAuthInfo(res.headers);
        dispatch(register(res.data.data));
        router.push("/dashboard");
      });
  };

  return (
    <>
      <div className={`${styles.split} ${styles.right}`}>
        <div className={styles.centered}>
          <div className={styles.resettitle}>
            <h3 className={styles.title}>Reset Password</h3>
          </div>

          <form onSubmit={resetPassword}>
            <div>
              <label for="password" className={styles.label}>
                {" "}
                New Password *
              </label>
              <input
                type="password"
                id="password"
                placeholder="New Password"
                className={styles.input}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label for="password" className={styles.label}>
                {" "}
                Confirm New Password *
              </label>
              <input
                type="password"
                id="cpassword"
                placeholder="Retype Password"
                className={styles.input}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <button type="submit" className={styles.button}>
                Reset Password
              </button>
            </div>
          </form>
          <p className={styles.signuplink}>
            <a className={styles.linkitem}>
              <Link href="/login">Cancel </Link>
            </a>
          </p>
        </div>
      </div>
      <div className={`${styles.split} ${styles.left}`}>
        <div className={styles.imagelogo}>
          <Image src={logo} alt="Logo" />
        </div>
      </div>
    </>
  );
};

export default withUser(PasswordChange);

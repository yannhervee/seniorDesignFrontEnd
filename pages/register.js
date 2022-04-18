import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import logo from "../public/Translogo.png";
import styles from "../styles/Register.module.css";
import { register } from "../features/userSlice";
import { axiosInstance, setAuthInfo } from "../utils/auth";
import withUser from "../components/withUser";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState();
  const [errorpassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [validCPassword, setValidCPassword] = useState(false);

  // redux, reduxjs-toolkit

  // Save user id in cookie
  // Send cookie to backend (security)
  // Validate cookie on backend

  const registerUser = async (e) => {
    e.preventDefault();

    if (validCPassword && validPassword) {
      axiosInstance()
        .post("/auth", {
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          role: role,
          reliability: 0,
        })
        .then((res) => {
          console.log("resdata", res);
          console.log("registerpage", res.data.data.id);
          console.log("registerpage", res.data.data.email);
          console.log("registerpage", res.data.data.name);
          setAuthInfo(res.headers);
          dispatch(register(res.data.data));
          router.push("/departments");
        })
        .catch((e) => {
          // TODO: handle user with accounts
          // TODO: validations
          console.log("error", e);
        });
    }

    /*          const data = {
            name,
            email,
            password,
            role,
          };
          console.log(data); */
  };

  const onChangePassword = (pwd) => {
    console.log("text in password onchange", pwd);
    if (pwd.length < 6) {
      setErrorPassword("password should be at least 6 characters");
      setValidPassword(false);
    } else {
      setPassword(pwd);
      setErrorPassword("");
      setValidPassword(true);
    }
  };

  const onChangeConfirmPassword = (cpwd) => {
    console.log("text in password onchange", cpwd);
    if (cpwd.localeCompare(password) !== 0) {
      setErrorConfirmPassword("passwords should match");
      setValidCPassword(false);
    } else {
      setConfirmPassword(cpwd);
      setErrorConfirmPassword("");
      setValidCPassword(true);
    }
  };

  return (
    <>
      <div className={`${styles.split} ${styles.right}`}>
        <div className={styles.centered}>
          <h1 className={styles.title}>SIGN UP</h1>
          <form onSubmit={registerUser}>
            <div>
              <label for="name" className={styles.label}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="first, last name"
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div>
              <label for="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div>
              <label for="password" className={styles.label}>
                Password *
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={(e) => onChangePassword(e.target.value)}
                // onChange={e => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <p>{errorpassword}</p>
            <div>
              <label for="confirmpassword" className={styles.label}>
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="retype password"
                onChange={(e) => onChangeConfirmPassword(e.target.value)}
                //onChange={e => setConfirmPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <p>{errorConfirmPassword}</p>
            <div>
              <label for="role" className={styles.label}>
                I am a{" "}
              </label>
              <select
                id="role"
                className={styles.input}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="student">student</option>
                <option value="teacher">professor</option>
              </select>
            </div>
            <div>
              <label for="terms">
                <input id="terms" type="checkbox" required />I agree to the
                terms and privacy policy.
              </label>
            </div>
            <div>
              <button type="submit" className={styles.button}>
                Register
              </button>
            </div>
          </form>
          <p className={styles.signuplink}>
            Already have an account?{" "}
            <a className={styles.linkitem}>
              <Link href="/login">Sign in</Link>
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

export default withUser(Register);

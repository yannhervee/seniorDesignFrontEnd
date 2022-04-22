import Image from "next/image";
import logo from "../public/Translogo.png";
import styles from "../styles/Register.module.css";
import Link from "next/link";
import withUser from "../components/withUser";
import { useState } from "react";
import { axiosInstance } from "../utils/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const resetPassword = async (event) => {
    event.preventDefault();
    axiosInstance()
      .post("/auth/password", {
        email,
        redirect_url: `${window.location.origin}/passwordchange`,
      })
      .then((res) => {
        console.log("resdata", res);
      })
      .catch((e) => {
        // TODO: handle user with accounts
        // TODO: validations
        console.log("error", e);
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
              <label for="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className={styles.input}
                required
                onChange={(e) => setEmail(e.target.value)}
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

export default withUser(ResetPassword);

import styles from "../styles/Profile.module.css";
import { useEffect, useState } from "react";
import { faUser, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import withUser from "../components/withUser";
import { useSelector, useDispatch } from "react-redux";

import { axiosInstance } from "../utils/auth";
import fileChecksum from "../utils/checksum";
import axios, { Axios } from "axios";
import { register } from "../features/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const sendToS3 = (headers, blobId, presignedUrl) => {
    const config = {
      headers,
      onUploadProgress: ({ loaded, total }) =>
        setProgress(Math.floor((loaded * 100) / total)),
    };
    axios
      .put(presignedUrl, file, config)
      .then(() => {
        // NOTE: only attach blob id after we complete upload to s3
        axiosInstance()
          .post("/users/save_thumbnail", { blob_id: blobId })
          .then((res) => {
            console.log(res);
            dispatch(register(res.data));
            setProgress(100);
            setUploading(false);
            setShowModal(false);
          });
      })
      .catch(() => {
        setUploading(false);
        setProgress(0);
      });
  };

  console.log("progeress >>", progress);

  const onConfirm = () => {
    setUploading(true);
    fileChecksum(file).then((checksum) => {
      console.log(checksum);
      axiosInstance()
        .post("/users/presigned_url", {
          checksum,
          size: file.size,
          name: file.name,
          type: file.type,
        })
        .then((res) => {
          console.log("res", res);
          sendToS3(res.data.headers, res.data.blob_id, res.data.presigned_url);
        });
    });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.back}>
          <Link href="/dashboard"> &larr; back to dashboard </Link>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.box1}>
          {currentUser?.thumbnail_url ? (
            <img src={currentUser.thumbnail_url} width="300" height="250" />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              style={{
                width: "200px",
                height: "300px",
                textAlign: "center",
                cursor: "pointer",
                color: "#732e9c",
              }}
            />
          )}

          <h4 className={styles.inforole}>{currentUser.role}</h4>
          <h4 className={styles.info}>name: {currentUser.name} </h4>
          <h4 className={styles.info}>email: {currentUser.email} </h4>
          {currentUser.role.localeCompare("student") === 0 ? (
            <h4 className={styles.info}>
              reputation: {currentUser.reliability}{" "}
            </h4>
          ) : null}
          <button
            className={styles.buttonaddimage}
            onClick={() => setShowModal(true)}
          >
            Add new profile image
          </button>

          {showModal ? (
            <div className={styles.modalwarning}>
              <FontAwesomeIcon
                icon={faUpload}
                style={{ width: "80px", height: "70px", marginTop: "40px" }}
              />
              <h3 className={styles.modaltext}>Upload picture here</h3>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={onFileChange}
              />
              <div className={styles.modalbuttons}>
                <button
                  className={styles.confirmbuttonmodal}
                  onClick={onConfirm}
                >
                  Confirm
                </button>
                <button
                  className={styles.cancelbuttonmodal}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default withUser(Profile);

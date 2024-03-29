import LeftNav from "../components/LeftNav";
import styles from "../styles/MyQuestions.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "../utils/auth";

const Myquestions = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("running effect");
    //  console.log(user, 'department')
    // Promises
    axiosInstance()
      .get("/posts/", {
        params: {
          user_id: 12,
        },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
        console.log("res data posts all", posts);
        console.log("res data posts", posts[0]);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  return (
    <>
      <LeftNav />
      <div className={styles.container}>
        <h1 className={styles.title}> My Questions </h1>
        {posts.length ? null : <h3> You have not posted any questions yet</h3>}

        {posts
          .slice(0)
          .reverse()
          .map((post) => {
            console.log("single post", post);
            console.log("single post body", post.body);
            return (
              <>
                <Link href={`/forum/${post.id}`}>
                  <div className={styles.question}>
                    <div className={styles.userinfo}>
                      <div className={styles.circle}>
                        {post.user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className={styles.questioninfo}>
                      <span className={styles.questioncontent}>
                        {post.body.slice(0, 200)}
                      </span>
                      <span className={styles.topic}> {post.topic.name}</span>
                      <Link href={`edit/${post.id}`}>
                        <button className={styles.editbutton}>Edit</button>
                      </Link>
                    </div>
                    <div className={styles.comments}>
                      {" "}
                      {post.comments.length} comments{" "}
                    </div>
                    <div className={styles.course}>
                      {post.topic.course.name}
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Myquestions;

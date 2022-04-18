import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";
import LeftNav from "../../components/LeftNav";
import Link from "next/link";
import { Form, Field } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { axiosInstance } from "../../utils/auth";
import withUser from "../../components/withUser";

const updateImmutable = (list, payload) => {
  const data = list.find((d) => d.id === payload.id);
  if (data) {
    const index = list.findIndex((d) => d.id === payload.id);

    return [
      ...list.slice(0, index),
      { ...data, ...payload },
      ...list.slice(index + 1),
    ];
  }

  return list;
};

const ForumItem = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(0);
  const [initialValues, setInitialValues] = useState([]);
  const [editComment, setEditComment] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [commentUpdate, setCommentUpdate] = useState({});
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    axiosInstance()
      .get("/users/fetch_current_user")
      .then((res) => {
        console.log("check hereh", res.data);
        setCurrentUser(res.data);
      })
      .catch(() => {
        //
      });
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    console.log("running effect");

    // Promises
    axiosInstance()
      .get(`/posts/${id}`)
      .then((res) => {
        console.log("post data", res);
        setPost(res.data);
        return axiosInstance()
          .get("/comments", {
            params: {
              post_id: res.data.id, // ask why posts.id won't work
            },
          })
          .then((res) => {
            console.log("res comments", res);
            setComments(res.data);
            // count items
          });
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, [router.isReady, router.query]);

  //href={`/forums/${id}`}
  console.log(router.isReady);

  const onSubmit = (values) => {
    console.log(values, "values");
    console.log("values comment", values.comment);
    return axiosInstance()
      .post("/comments", {
        post_id: post.id,
        body: values.comment,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(() => {});
  };

  const onEditComment = (e) => {
    e.preventDefault();
    return axiosInstance()
      .put(`/comments/${commentUpdate.id}`, {
        body: commentBody,
      })
      .then((res) => {
        console.log(res);

        setCommentUpdate();
        setEditComment(!editComment);

        const newComment = commentUpdate;
        newComment.body = commentBody;

        const newComments = updateImmutable(comments, newComment);
        setComments(newComments);
        setCommentBody("");
      })
      .catch(() => {});
  };

  const handleLikeButton = (commentId, e) => {
    e.preventDefault();

    axiosInstance()
      .post("/reactions/reacted", {
        // current user todo
        comment_id: commentId,
      })
      .then((res) => {
        console.log("reaction checking", res);
        setComments((state) => {
          const newState = [...state];
          const index = newState.findIndex((c) => c.id === commentId);
          console.log("index", index);
          newState[index] = res.data[0];
          return newState;
        });
      });
  };
  const handleEditButton = (e, comment) => {
    e.preventDefault();
    setCommentBody(comment.body);
    setCommentUpdate(comment);
    setEditComment(!editComment);
  };
  const getEditButtonClassName = (commenter) => {
    console.log("commeterid", commenter);
    console.log("currentuser", currentUser);
    return currentUser.id === commenter
      ? styles.buttonedit
      : styles.disablebutton;
  };
  const getLikeButtonClassName = (commenter) => {
    console.log("in like");
    console.log("commeterid", commenter);
    console.log("currentuser", currentUser.id);
    return currentUser.id === commenter
      ? styles.buttonedit
      : styles.disablebutton;
    //return currentUser.id === commenter ?  styles.disablebutton : styles.buttonlike
  };

  console.log(post);

  return (
    <>
      <LeftNav />
      <div className={styles.container}>
        <div className={styles.back}>
          {" "}
          <Link href="/myquestions"> &larr; back </Link>
        </div>
        <div className={styles.maincontent}>
          <div className={styles.postdetails}>
            <h2 className={styles.course}>
              {post ? (
                post.topic.course.name
              ) : (
                <Skeleton width="30px" height="14px" />
              )}{" "}
            </h2>
            <h2 className={styles.posttopic}>
              {post ? post.topic.name : <Skeleton width="30px" height="14px" />}
            </h2>
          </div>
          <div className={styles.posttext}>
            <p>{post ? post.body : <Skeleton width="30" height="14" />}</p>
          </div>
          <div className={styles.postsignature}>
            <div className={styles.useravatar}>
              <div className={styles.circle}>
                {" "}
                {post ? (
                  post.user.name.charAt(0)
                ) : (
                  <Skeleton width="10" height="14" />
                )}{" "}
              </div>
            </div>
            <div className={styles.userinfo}>
              <span>
                {" "}
                {post ? (
                  post.user.name
                ) : (
                  <Skeleton width="30" height="14" />
                )}{" "}
              </span>
            </div>
            <div className={styles.date}>
              <span>
                {post ? (
                  `asked ${post.created_at}`
                ) : (
                  <Skeleton width="30" height="14" />
                )}
              </span>
            </div>
          </div>
        </div>
        <h3 className={styles.header}> Comments </h3>
        <div>
          {comments.map((comment) => {
            return (
              <>
                <div className={styles.commentcontainer}>
                  <div className={styles.commentsignature}>
                    <div className={styles.commenteravatar}>
                      <div className={styles.circle}>
                        {" "}
                        {comment.user.name.charAt(0).toUpperCase()}{" "}
                      </div>
                    </div>
              
                    <div className={styles.commenterinfo}>
                      <Link href={`/userprofile/${comment.user.id}`}>
                        <span  className={styles.namecommenter}>
                          {" "}
                          {comment.user.name}
                        </span>
                      </Link>
                      <span className={styles.commenter}>
                        {" "}
                        reliability: {comment.user.reliability}{" "}
                      </span>
                      <span className={styles.like}>
                        Was this answer helpful? &nbsp;
                        <button
                          clasName={getLikeButtonClassName(comment.user_id)}
                          onClick={(e) => handleLikeButton(comment.id, e)}
                        >
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{
                              width: "18px",
                              cursor: "pointer",
                              marginLeft: "18px",
                            }}
                          />
                        </button>
                      </span>
                      <span className={styles.count}>
                        {" "}
                        {comment.reactions_count}{" "}
                      </span>

                      <button
                        className={getEditButtonClassName(comment.user_id)}
                        onClick={(e) => handleEditButton(e, comment)}
                      >
                        Edit
                      </button>

                      {editComment &&
                      commentUpdate &&
                      commentUpdate.id === comment.id ? (
                        <div className={styles.editbox}>
                          <input
                            name="comment"
                            onChange={(e) => setCommentBody(e.target.value)}
                            type="text"
                            className={styles.inputeditcomment}
                            placeholder="Type here ..."
                            value={commentBody}
                          />
                          <button
                            type="submit"
                            className={styles.update}
                            onClick={(e) => onEditComment(e)}
                          >
                            {" "}
                            Update{" "}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={styles.comment}>
                    <p> {comment.body} </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className={styles.makecommentcontainer}>
          <h3 className={styles.header}> Your Answer</h3>
          <div>
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form
                  className={styles.formbox}
                  onSubmit={(event) => {
                    handleSubmit().then(() => {
                      form.reset();
                    });
                  }}
                >
                  <Field
                    name="comment"
                    component="input"
                    type="text"
                    className={styles.inputcomment}
                    placeholder="Type here ..."
                  />
                  <button type="submit" className={styles.button}>
                    {" "}
                    Post Your Answer{" "}
                  </button>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withUser(ForumItem);

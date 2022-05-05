/* eslint-disable */

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
import {
  faThumbsUp,
  faExclamationTriangle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import { axiosInstance } from "../../utils/auth";
import withUser from "../../components/withUser";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Moment from "react-moment";
import "moment-timezone";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs.extend(relativeTime);

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
const required = (value) => (value ? undefined : "Required");

const ForumItem = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  const [initialValues, setInitialValues] = useState([]);
  const [editComment, setEditComment] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [commentUpdate, setCommentUpdate] = useState({});

  const { user: currentUser } = useSelector((state) => state.user);

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
    /* in the form for submitting input onSubmit={(event) => {
      handleSubmit().then(() => {
        form.reset();
      });
    }} */
    console.log(values, "values");
    console.log("values comment", values.comment);
    return axiosInstance()
      .post("/comments", {
        post_id: post.id,
        body: values.comment,
      })
      .then((res) => {
        router.reload();
        console.log(res);
      })
      .catch(() => {});
  };

  const onEditComment = (e) => {
    e.preventDefault();
    if (!commentBody) {
      console.log("isempty");
      return;
    } else {
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
    }
  };

  const handleLikeButton = (commentId, commentUserId, comment, e) => {
    e.preventDefault();
    console.log("like method");

    axiosInstance()
      .post("/reactions/reacted", {
        // current user todo
        comment_id: commentId,
        comment_user_id: commentUserId,
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

  const handleReportButton = () => {
    const deleteUrl = `/posts/${id}`;

    console.log("delete id");
    if (id) {
      axiosInstance()
        .delete(deleteUrl)
        .then((res) => {
          console.log("res in report post", res);
          router.back();
          //router.push("/forum")
        });
    }
  };

  const getEditButtonClassName = (commenter) => {
    console.log("commeterid", commenter);
    console.log("currentuser", currentUser);
    return currentUser.id === commenter
      ? styles.buttonedit
      : styles.disablebutton;
  };
  const getLikeButtonClassName = (comment) => {
    console.log("comment clicked", comment);
    console.log("commeterid", comment.user.id);
    console.log("currentuser", currentUser.id);

    /*  if (comment.reactions?.some((e) => e.user_id === currentUser.id)) {
      return styles.buttonisliked;
      /* vendors contains the element we're looking for 
    } else {
      styles.buttonlike;
    } */

    return currentUser.id === comment.user.id
      ? styles.disablebutton
      : styles.buttonl;
    //return currentUser.id === commenter ?  styles.disablebutton : styles.buttonlike
  };

  const getReportButtonClassName = (user) => {
    console.log("in report", user);

    return user.role.localeCompare("professor") === 0
      ? styles.report
      : styles.disablebutton;
    //return currentUser.id === commenter ?  styles.disablebutton : styles.buttonlike
  };

  const getButtonUpdateClassName = () => {
    // const disabledButton = styles.disabledbuttoncourse;
    return commentBody.length === 0
      ? styles.disabledbuttonupdate
      : styles.update;
  };

  console.log(post);

  return (
    <>
      <LeftNav />
      <div className={styles.container}>
        <div className={styles.back}>
          {" "}
          {/* <Link href="/myquestions"> &larr; back </Link> */}
          <button className={styles.backbutton} onClick={() => router.back()}>
            {" "}
            &larr; back{" "}
          </button>
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
                {" "}
                asked &nbsp;
                {post ? (
                  dayjs(post.created_at).fromNow()
                ) : (
                  // `asked ${post.created_at}`

                  <Skeleton width="30" height="14" />
                )}
              </span>

              {showModal ? (
                <div className={styles.modalwarning}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    style={{ width: "80px", height: "70px", marginTop: "40px" }}
                  />
                  <h3 className={styles.modaltext}>
                    Are you sure this post goes against the University policy?
                    The post will be deleted and the user will be notified
                  </h3>
                  <div className={styles.modalbuttons}>
                    <button
                      className={styles.confirmbuttonmodal}
                      onClick={() => {
                        setShowModal(false);
                        setShowSecondModal(true);
                      }}
                    >
                      {" "}
                      Confirm{" "}
                    </button>
                    <button
                      className={styles.cancelbuttonmodal}
                      onClick={() => setShowModal(false)}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  </div>
                </div>
              ) : null}
              {showSecondModal ? (
                <div className={styles.modalwarning}>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ width: "80px", height: "70px", marginTop: "40px" }}
                  />
                  <h2 className={styles.modaltext}>
                    Post was deleted. The author will be notified.
                  </h2>
                  <button
                    className={styles.close}
                    onClick={() => {
                      setShowSecondModal(false);
                      handleReportButton();
                    }}
                  >
                    {" "}
                    ok{" "}
                  </button>
                </div>
              ) : null}
            </div>
            <button
              className={getReportButtonClassName(currentUser)}
              onClick={() => setShowModal(true)}
            >
              Delete Post
            </button>
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
                        <span className={styles.namecommenter}>
                          {" "}
                          {comment.user.name}
                        </span>
                      </Link>
                      <span className={styles.commenter}>
                        {" "}
                        reputation: {comment.user.reliability}{" "}
                      </span>
                      <span className={styles.like}>
                        Was this answer helpful? &nbsp;
                        <button
                          className={getLikeButtonClassName(comment)}
                          onClick={(e) =>
                            handleLikeButton(
                              comment.id,
                              comment.user_id,
                              comment,
                              e
                            )
                          }
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

                      <span
                        className={styles.alwaysvisible + " " + styles.count}
                      >
                        {" "}
                        {comment.reactions_count}{" "}
                        <div
                          className={
                            styles.reactionsWrapper + " " + styles.showonhover
                          }
                        >
                          {comment.reactions?.map((reaction) => {
                            return (
                              <>
                                <span>{reaction.user.name}</span>
                              </>
                            );
                          })}
                        </div>
                      </span>

                      {editComment &&
                      commentUpdate &&
                      commentUpdate.id === comment.id ? (
                        <div className={styles.editbox}>
                          <textarea
                            name="comment"
                            onChange={(e) => setCommentBody(e.target.value)}
                            type="text"
                            value={commentBody}
                            className={styles.inputeditcomment}
                            placeholder="Type here ..."
                            required
                          ></textarea>

                          <button
                            type="submit"
                            className={getButtonUpdateClassName()}
                            disabled={commentBody.length === 0}
                            onClick={(e) => onEditComment(e)}
                          >
                            {" "}
                            Update{" "}
                          </button>
                          <button
                            type="submit"
                            className={styles.cancelupdate}
                            onClick={(e) => setEditComment(!editComment)}
                          >
                            {" "}
                            Cancel{" "}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={styles.comment}>
                    <p> {comment.body} </p>
                    <button
                      className={getEditButtonClassName(comment.user_id)}
                      onClick={(e) => handleEditButton(e, comment)}
                    >
                      Edit
                    </button>
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
                <form className={styles.formbox} onSubmit={handleSubmit}>
                  <Field
                    name="comment"
                    component="input"
                    type="text"
                    validate={required}
                    className={styles.inputcomment}
                    placeholder="Type here ..."
                  >
                    {({ input, meta }) => (
                      <div
                        style={{
                          "margin-top": "10px",
                          "padding-left": "50px",
                          "padding-right": "50px",
                          width: "100%",
                        }}
                      >
                        <textarea
                          {...input}
                          type="textarea"
                          className={styles.inputcomment}
                        ></textarea>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
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

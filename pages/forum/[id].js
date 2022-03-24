import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import axios from "axios";
import { useEffect, useState } from "react"
import styles from '../../styles/Post.module.css'
import LeftNav from '../../components/LeftNav'
import Link from 'next/link';
import { Form, Field } from "react-final-form";

const ForumItem = ({}) => {
  const router = useRouter()
  const {id} = router.query
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [initialValues, setInitialValues] = useState([])


  useEffect(() => {
    if (!router.isReady) return

    console.log('running effect')

    // Promises
    axios.get(`http://localhost:3001/posts/${id}`)
    .then((res) => {
        console.log("post data", res)
        setPosts(res.data);
        return axios.get("http://localhost:3001/comments", {
            params: {
                post_id: res.data.id, // ask why posts.id won't work
            },
        })
        .then((res) => {
            console.log("res comments", res);
            setComments(res.data)
        })      
    })
    .catch((e) => {
        console.log('error', e);
    })
}, [router.isReady, router.query])

  //href={`/forums/${id}`}
  console.log( router.isReady)

  const onSubmit = (values) => {
    console.log(values, "values");
    console.log("values comment", values.comment)
     return axios
    .post("http://localhost:3001/comments", {
        post_id: posts.id ,
        user_id: 12, 
        body: values.comment
    })
    .then((res) => {
      console.log(res);
      
      
    })
    .catch(() => {}); 
    
  };

  return (
      <>
         <LeftNav />
        <div className={styles.container}>
            <div className={styles.back}> <Link href="/myquestions"> &larr; back </Link></div> 
            <div className={styles.maincontent}>
                <div className={styles.postdetails}>
                    <h2 className={styles.course}> posts.topic.course.name </h2>
                    <h2 className={styles.posttopic}> posts.topic.name</h2>
                </div>
                    <div className={styles.posttext}>
                        <p>{posts.body}</p>
                    </div>
                    <div className={styles.postsignature}>            
                        <div className={styles.useravatar}>
                            <div className={styles.circle}>B</div>
                        </div>
                        <div className={styles.userinfo}>
                            <span> posts.user.name </span>
                        </div>
                        <div className={styles.date}>
                            <span> asked {posts.created_at}</span>
                        </div>

                    </div>
                
            </div>
            <h3 className={styles.header}> comments </h3>
            <div>
                {comments.map((comment) => {
                    return <>
                            <div className={styles.commentcontainer}>
                                <div className={styles.commentsignature}>
                                    <div className={styles.commenteravatar}>
                                        <div className={styles.circle}> {comment.user.name.charAt(0).toUpperCase()} </div>
                                    </div>
                                    <div className={styles.commenterinfo}>
                                        <span className={styles.commenter}> {comment.user.name }</span>
                                        <span className={styles.commenter}> reliability: {comment.user.reliability } </span>
                                    </div>  
                                </div>
                                <div className={styles.comment}>
                                    <p> {comment.body} </p>
                                </div>
                            </div>
                         </>
                })}
               
                        
            </div>

            <div className={styles.makecommentcontainer}>
                <h3 className={styles.header}> Your Answer</h3>
                <div>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form className={styles.formbox} onSubmit={event => {
                            handleSubmit().then(() => {form.reset();})}}
                            >
                                <Field
                                    name="comment"
                                    component="input"
                                    type="text"
                                    className={styles.inputcomment}
                                    placeholder="Type here ..."
                                />
                                <button type="submit" className={styles.button}> Post Your Answer </button>
                            </form>
                        )}
                    />
                </div>

            </div>
            
         </div>
      </>
    
  )
}


export default ForumItem
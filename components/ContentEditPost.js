import styles from "../styles/ContentPostQuestion.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form, Field } from "react-final-form";
import axios from "axios";

import { useRouter } from "next/router";
import { axiosInstance } from "../utils/auth";

const required = (value) => (value ? undefined : "Required");
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const ContentEditPost = () => {
  
  const [topics, setTopics] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [courses, setCourses] = useState([]);
  const [initialValues, setInitialValues] = useState([])
  const [body, setBody] = useState()
  const [topic, setTopic] = useState('')
  const [course, setCourse] = useState()
  const [courseId, setCourseId] = useState()
  const [topicId, setTopicId] = useState()
  const router = useRouter();
  const {id} = router.query
  
  
 
  useEffect(() => {
    if (!router.isReady) return

    console.log('running effect')

    // Promises
    axiosInstance().get(`http://localhost:3001/posts/${id}/edit`)
    .then((res) => {
        console.log("edit post data", res)
        
        setBody(res.data.body);
        setTopic(res.data.topic.name)
        setCourse(res.data.topic.course.name)
        setCourseId(res.data.topic.course_id)
        setTopicId(res.data.topic.id)
    })
    .catch((e) => {
        console.log('error', e);
    })
}, [router.isReady, router.query])

//console.log("INITIAL DATA", post)

  useEffect(() => {
    axiosInstance()
      .get("http://localhost:3001/courses")
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      })
      .catch(() => {});
  }, []);


  useEffect(() => {
    axiosInstance()
      .get("http://localhost:3001/topics")
      .then((res) => {
        console.log("topic response", res.data);
        setTopics(res.data);
        
      })
      .catch(() => {});
  }, []);


  const onSubmit = () => {
    if(text){
      setTopic(text)
    } else {
      setTopic("No Topic")
    }
      const updateFields = {
        topic,
        body,
        topic_id: topicId,
      }
    console.log(updateFields, "values");
    return axiosInstance()
      .put(`http://localhost:3001/posts/${id}`, updateFields)
      .then((res) => {
        console.log(res);
        router.push("/myquestions");
      })
      .catch(() => {});
  };

   const onChangeHandler = (text) => {
     // setTopic(text)
    console.log("text in onchange", text)
    let matches = []
    if(text.length > 0) {
      matches = topics.filter(topic => {
        const regex = new RegExp(`${text}`);
        return topic.name.match(regex)
      })
    }
    console.log("matches", matches)
    setSuggestions(matches)
    setTopic(text)
  }

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([])
  } 

  return (
    <>
      <div className={styles.contentcontainer}>
        <div className={styles.back}>
          <Link href="/dashboard"> &larr; back to dashboard </Link>
        </div>

        <div className={styles.contentwrapper}>
          <div className={styles.tabs}>
            <div className={styles.categories}>
              <h2> Post Your Question </h2>
            </div>
          </div>
        </div>
        <div className={styles.descriptionwrapper}>
          <p className={styles.description}>
            Let your fellow schoolmates know what you need help with. The more
            details you provide, the more quickly your question will be
            answered. Once your question is posted, You can check if it has been
            answered through the "My questions" Tab.
          </p>
        </div>
      </div>

      <div className={styles.coursestab}>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              `{" "}
              <div className={styles.stepwrapper}>
                <label className={styles.label}>
                  {" "}
                  1- Tell us what course you need help with *{" "}
                </label>
              </div>
              <div className={styles.coursewrapper}>
                <Field
                  name="course_id"
                  className={styles.selectinput}
                
                  //onChange={e => setRole(e.target.value)}
                  component="select"
                >
                  {courses.map((c) => {
                    return <>
                    <option value={courseId}>{course}</option>
                    <option value={c.id}>{c.name}</option>;
                    </>
                    
                  })}
                </Field>
              </div>
              <div className={styles.topicwrapper}>
                <label className={styles.label}>
                  {" "}
                  2- Topic you need help with *{" "}
                </label>
              </div>
              <Field
                type="text"
                name="topic"
                component="input"
              >
                {({ input, meta }) => (
                  <div
                    style={{
                      "margin-top": "10px",
                      "padding-left": "50px",
                      "padding-right": "50px",
                      width: "100%",
                      height: "50px",
                    }}
                  >
                    <input
                      {...input}
                      type="text"
                      onChange={e => onChangeHandler(e.target.value)}
                      className={styles.topicinput}
                      value={topic}
                      onBlur={() => {
                      setTimeout(() => {
                      setSuggestions([])
                        }, 100)
                      }}
                    />
                    {suggestions && suggestions.map((suggestion, i) =>
                    <div 
                      key={i} 
                      className={styles.suggestion}
                      onClick={() => onSuggestHandler(suggestion.name)}
                      >
                        {suggestion.name}
                    </div>
                    )}
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className={styles.questionwrapper}>
                <label className={styles.label}>
                  {" "}
                  3- What is your question? *{" "}
                </label>
              </div>
              <Field
                type="text"
                name="question"
                className={styles.questioninput}
                component="input"
                
                //validate={required}
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
                    <input
                      {...input}
                      type="text"
                      value={body}
                      className={styles.questioninput}
                      onChange={e => setBody(e.target.value)}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div
                style={{
                  "margin-top": "10px",
                  "padding-left": "50px",
                  "padding-right": "50px",
                  width: "100%",
                  "text-align": "center",
                }}
              >
                <button type="submit" className={styles.button}>
                  Update
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default ContentEditPost;

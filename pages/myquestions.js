import LeftNav from '../components/LeftNav';
import Header from '../components/Header';
import ContentDashboard from '../components/ContentDashboard';
import styles from '../styles/MyQuestions.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Myquestions = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        console.log('running effect')
      //  console.log(user, 'department')
        // Promises
        axios.get('http://localhost:3001/posts/', {
            params: {
                user_id: 12
            }
        })
        .then((res) => {
            console.log(res);  
            setPosts(res.data)   
            console.log("res data posts all", posts)   
            console.log("res data posts", posts[0])

        })
        .catch((e) => {
            console.log('error', e);
        })
    }, [])


    
    return(

        <>
       
        <LeftNav />
        <div className={styles.container}>


       
            
               

                {posts.map((post) => {
                    console.log("single post", post)
                    console.log("single post body", post.body)
                    return   <>
                    <div className={styles.question}>
                <div className={styles.userinfo}>
                    <div className={styles.circle}>B</div>
                </div>
                                <div className={styles.questioninfo}>
                                    <span className={styles.questioncontent}>{post.body}</span>
                                    <span className={styles.topic}> {post.topic.name}</span>
                                </div>
                                <div className={styles.comments}> 5 comments </div>
                                <div className={styles.course}>{post.topic.course_id}</div>
                                </div>
                            </>
                        

                      
                })}
                     

            </div>
           

        
        
   
        </>
    )
}

export default Myquestions;

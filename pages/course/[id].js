import LeftNav from '../../components/LeftNav';
import { useRouter } from 'next/router'
import styles from '../../styles/MyQuestions.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { axiosInstance } from '../../utils/auth';


const CourseForum = () => {
    const [posts, setPosts] = useState([])
    const router = useRouter()
     const {id} = router.query
    useEffect(() => {
        console.log('running effect')
      //  console.log(user, 'department')
        // Promises
        axiosInstance().get('http://localhost:3001/posts/', {
            params: {
                course_id: id
            },
           
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
    
            <div></div>
            
            <LeftNav />
            <div className={styles.container}>
                <h1 className={styles.title}> Forum </h1>
    
           
                    {posts.map((post) => {
                        console.log("single post", post)
                        console.log("single post body", post.body)
                        return   <>
                        <Link href={`forum/${post.id}`}>
                        <div className={styles.question}>
                    <div className={styles.userinfo}>
                        <div className={styles.circle}>B</div>
                    </div>
                                    <div className={styles.questioninfo}>
                                        <span className={styles.questioncontent}>{post.body}</span>
                                        <span className={styles.topic}> {post.topic.name}</span>
                                    </div>
                                    <div className={styles.comments}> {post.comments.length} comments </div>
                                    <div className={styles.course}>{post.topic.course.name}</div>
                                    </div>
                                    </Link>
                                </>
                            
    
                          
                    })}
                         
                    
                </div>
               
    
            
            
       
            </>
        
    )
}

export default CourseForum;

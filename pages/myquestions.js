import LeftNav from '../components/LeftNav';
import Header from '../components/Header';
import ContentDashboard from '../components/ContentDashboard';
import styles from '../styles/MyQuestions.module.css'

const Myquestions = () => {

    
    return(
        <>
       
        
        <LeftNav />
        <div className={styles.container}>
            <div className={styles.question}>
                <div className={styles.userinfo}>
                    <div className={styles.circle}>B</div>
                </div>
                <div className={styles.questioninfo}>
                    <span className={styles.questioncontent}>I need help with finding derivating of logarithmic and exponential function. </span>
                    <span className={styles.topic}> Derivative</span>

                </div>
                <div className={styles.comments}> 5 comments </div>
                <div className={styles.course}>Math 310</div>

            </div>
           

        </div>
        
   
        </>
    )
}

export default Myquestions;

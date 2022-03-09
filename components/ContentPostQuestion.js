import styles from '../styles/ContentPostQuestion.module.css'
import React from 'react'
import Link from 'next/link'


const ContentPostQuestion = () => {
 

    return (
        <>
       
        <div className={styles.contentcontainer}>
            <div className={styles.back}><Link href="/dashboard"> &larr; back to dashboard </Link></div>
            
        
			<div className={styles.contentwrapper}>
				<div className={styles.tabs}>
					<div className={styles.categories}>
						<h2> Post Your Question </h2>
					</div>
				
				</div>
			</div>
            <div className={styles.descriptionwrapper}>
                <p className={styles.description}>Let your fellow schoolmates know what you need help with. 
                        The more details you provide, the more quickly your question will be answered.
                        Once your question is posted, You can check if it has been answered through the "My questions" Tab.
                 </p>
            </div>
            </div>
            
			
			<div className={styles.coursestab}> 
                <form>
                    <div className={styles.stepwrapper}>
                        <h3 className={styles.label}> 1- Tell us what course you need help with </h3>
                    </div>
                    
                    <div className={styles.coursewrapper}>
                        <select id="course" 
                            className={styles.selectinput} 
                            //onChange={e => setRole(e.target.value)}
                            required
                            >
                            <option value="" disabled selected>Select a course</option>
                            <option value="#">MATH310</option>
                            <option value="#">SOFT210</option>    
                        </select>
                        
                    </div>

                    <div className={styles.topicwrapper}>
                        <h3 className={styles.label}> 2- Topic you need help with </h3>
                    </div>
                    
                            <input type="text" id="topic" className={styles.topicinput} required />
                    

                    <div className={styles.questionwrapper}>
                        <h3 className={styles.label}> 3- What is your question? </h3>
                    </div>
                    
                    
                    <input type="text" id="question" className={styles.questioninput} required />
                    

                   
                
                    <div>
                        <button type="submit" className={styles.button}>Submit</button>
                    </div>
                </form>
                
				    

			</div>
            </>
		

    )
  }
  
  export default ContentPostQuestion;
import styles from '../styles/ContentPostQuestion.module.css'
import React from 'react'
import Link from 'next/link'
import {Form, Field} from 'react-final-form'


const ContentPostQuestion = () => {
 
    const required = value => (value ? undefined : 'Required')
   
    const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)


    const onSubmit = async event => {
        event.preventDefault()


    }




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
                 <Form
                    onSubmit={onSubmit} 
                    initialValues={{ course: '', topic :''}}
                    render={({handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
    `                        <div className={styles.stepwrapper}>
                                <label className={styles.label}> 1- Tell us what course you need help with * </label>
                            </div>
                            
                            <div className={styles.coursewrapper}>
                                <Field name="course" 
                                    className={styles.selectinput} 
                                    //onChange={e => setRole(e.target.value)}
                                    component="select"
                                    validate={required}
                                    
                                    >
                                    <option value="" disabled selected>Select a course </option>
                                    <option value="#">MATlabel10</option>
                                    <option value="#">SOFT210</option>    
                                </Field>
                                
                            </div>

                            <div className={styles.topicwrapper}>
                                <label className={styles.label}> 2- Topic you need help with * </label>
                            </div>
                            
                            
                                    <Field 
                                    type="text" 
                                    name="topic" 
                                    
                                    component="input"
                                    validate={required}
                                    >
                                        {({ input, meta }) => (
                                            <div>
                                                
                                                <input {...input} type="text" className={styles.topicinput} />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                            
                            <div className={styles.questionwrapper}>
                                <label className={styles.label}> 3- What is your question? * </label>
                            </div>
                            
                            
                            <Field 
                                type="text" 
                                name="question" 
                                className={styles.questioninput} 
                                component="input" 
                                validate={required} 
                            >
                                 
                                        {({ input, meta }) => (
                                            <div>
                                                
                                                <input {...input} type="text"className={styles.questioninput} />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>

                          
                                            
                            <div>
                                <button type="submit" className={styles.button}>Submit</button>
                            </div>
                            
                    </form>
                    )}
                    
                />
				     

			</div>
            </>
		

    )
  }
  
  export default ContentPostQuestion;
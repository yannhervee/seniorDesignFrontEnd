import LeftNav from '../components/LeftNav';
import styles from '../styles/Notification.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { axiosInstance } from '../utils/auth';
import{ faNewspaper} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotificationView = () => {
    const [count, setCount]= useState(0)
    const [notifications, setNotifications] = useState([])
    const [currentUser, setCurrentUser] = useState([])



    useEffect(() => {
        if(notifications.length > 0){
        
      const mapped_ids = notifications.map(notification => {
           return {
             id: notification.id,
           }
        
        });
      console.log("mapped", mapped_ids)

      const timer = setTimeout(() => {
        axiosInstance().post('http://localhost:3001/update_read_notfifications', {notifications: {notification_ids: mapped_ids}})
      .then((res) => {
          console.log("fecth read notif", res.data);              
  
      })
      .catch(() => {
          //
      })
        console.log('This will run after 20 second!')
      }, 20000);
    }
      return () => clearTimeout(timer);
    }, [notifications]);



  
    useEffect(() => {
      axiosInstance().get('http://localhost:3001/users/fetch_current_user')
      .then((res) => {
          console.log("fecth user nav", res.data)
          getUnreadNotifications(res.data.id)
                 setCurrentUser(res.data);
                 
  
      })
      .catch(() => {
          //
      })
  
  }, [])
  
  
  const getUnreadNotifications = (user_id) => {
     axiosInstance().get(`http://localhost:3001/unread_notifications/?user_id=${user_id}`)
      .then((res) => {
          console.log("check notification in notification", res.data)
          setCount(res.data.length)
          setNotifications(res.data);
  
      })
      .catch(() => {
          //
      })
  }

    return(
            
        <>    
        <LeftNav />
        <div className={styles.maincontainer}>
          <h1>Notif</h1>
          <div className={styles.question}>
            <div className={styles.notifbody}>
              <a className={styles.icon}><FontAwesomeIcon icon={faNewspaper} style={{width:"80px", height:"70px"}}/></a>
              <div className={styles.text}>body of notification : you have a new nootifcation </div>
            </div>
            <div className={styles.others}>
              <div className={styles.notiftime}>
                3h
              </div>
              <button className={styles.dismiss}>Dismiss</button>
            </div>


           </div>
           
          
           {/*  
            {notifications.length > 0 && notifications.map((notification, index) => {
              return <h1 key={index}>{notification.body}</h1>
            })} */}
          
        </div>  
        </>
    )
}

export default NotificationView;
import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import { axiosInstance } from '../utils/auth'
import { useEffect, useState } from "react"

const Layout = ({children}) => {

    const [count, setCount]= useState(6)
  const [notifications, setNotifications] = useState([])
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    axiosInstance().get('/users/fetch_current_user')
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
   axiosInstance().get(`/unread_notifications/?user_id=${user_id}`)
    .then((res) => {
        console.log("check notification", res.data)
        setCount(res.data.length)
        setNotifications(res.data);

    })
    .catch(() => {
        //
    })
}
    return(
        <>
            <Nav count={count} />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>

            </div>
        </>
    )
}

export default  Layout

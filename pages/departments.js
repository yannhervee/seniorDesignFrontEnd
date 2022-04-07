import { useEffect, useState } from 'react';
import departmentstyles from '../styles/Departments.module.css'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from '../features/userSlice';
import { axiosInstance } from '../utils/auth';


// useEffect, useCallback, useState, useRef, useMemo
const Departments = () => {
    const [selectedDepartments, setSelectedDepartments] = useState({})
    const [departments, setDepartments] = useState([])
    // const user = useSelector(selectUser)
    // console.log("department state redux", user)


    useEffect(() => {
        console.log('running effect')
      //  console.log(user, 'department')
        // Promises
        axiosInstance().get('http://localhost:3001/departments')
        .then((res) => {
            setDepartments(res.data);        
        })
        .catch((e) => {
            console.log('error', e);
        })
    }, [])

    const onDepartmentClick = (department) => {
        // spread operator
        setSelectedDepartments((state) => {
            const newState = { ...state };
            if (newState[department.id]) {
                delete newState[department.id]
            } else {
                newState[department.id] = true
            }
            return newState
        })
        //setSelectedDepartments({ ...selectedDepartments, [department.id] : department })
    }

    const getDepartmentClassName = (department) => {
        const borderClass = departmentstyles.bordercard
        return selectedDepartments[department.id] ? `${departmentstyles.card} ${borderClass}` : departmentstyles.card
    }

    console.log(selectedDepartments)
    const getButtonClassName = () => {
        const disabledButton = departmentstyles.disabledbutton
        return Object.keys(selectedDepartments).length === 0 ? departmentstyles.disabledbutton : departmentstyles.button
    }

    const renderDepartments = () => {
        return departments.map((department) => {
            return <a 
                        key={department.id}
                        onClick={() => { onDepartmentClick(department) }} 
                        className={getDepartmentClassName(department)}
                    >
                        {department.name}
                    </a>
        })
    }    

    return (
        <>
        <div>
            <h1 className={departmentstyles.title}>Which departments are you interested ?</h1>
            <div>{renderDepartments()}</div>
            <div className={departmentstyles.butcontainer}>
            <Link 
                href={{
                    pathname: '/courses',
                    query: { departments: Object.keys(selectedDepartments).join(',') }
                }}
            >
                <button 
                    className={getButtonClassName()}
                    disabled={Object.keys(selectedDepartments).length === 0}
                > 
                    Next
                </button>
            </Link>
          </div>
        </div>
        </>
    ) 
}

export default Departments;


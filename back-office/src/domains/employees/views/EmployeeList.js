import React from 'react'
import { Link } from 'react-router-dom'

function EmployeeList() {
    return (
        <div>
            <div>EmployeeList</div>
            <Link to='create'>Create Employee</Link>
        </div>
    )
}

export default EmployeeList
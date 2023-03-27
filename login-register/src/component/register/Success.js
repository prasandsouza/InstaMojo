import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Success() {
    useEffect(() => {
        axios.post('http://localhost:5000/success')
            .then(res => {
                let value = res.data.data
                console.log(value)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Link to='/' className='text-center text-blue-400 border w-full'><h1> Payment is successful back to home page </h1></Link>
        </div>
    )
}

export default Success
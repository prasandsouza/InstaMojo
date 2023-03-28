import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Success() {
    let query = window.location.search.substring(1);
    
    let vars = query ? query.split("&") : "";

    // payment status
    let values = vars ? vars[1].split('=') : ''
    let paymentStatus = values[1]

    useEffect((paymentStatus) => {
        axios.post('https://instamojo.onrender.com/success', paymentStatus)
            .then(res => {
                let value = res.data.data
                console.log(value)
            })
            .catch(err => console.log(err))
    }, [paymentStatus])
    return (
        <div>
            {paymentStatus === 'Failed' ? <Link to='/' className='text-center text-red-400 border w-full'><h1> Payment is Unsuccessful back to home page </h1></Link> : <Link to='/' className='text-center text-blue-400 border w-full'><h1> Payment is successful back to home page </h1></Link>}
        </div>
    )
}

export default Success

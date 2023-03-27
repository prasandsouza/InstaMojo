import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
function Success() {
    let query = window.location.search.substring(1);
    console.log(query)//"app=article&act=news_content&aid=160990"
    let vars = query.split("&");
    let values = vars[1].split('=')
    let paymentStatus = values[1]
    useEffect(() => {
        axios.post('https://instamojo.onrender.com/success',paymentStatus)
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
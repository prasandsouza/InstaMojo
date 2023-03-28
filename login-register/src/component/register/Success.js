import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Success() {
    let query = window.location.search.substring(1);
    console.log(query)//"app=article&act=news_content&aid=160990"
    let vars = query ? query.split("&") : "";

    //payment id
    let payment_id_string = vars ? vars[0].split('=') : ''
    let payment_id = payment_id_string[1]

    //request id
    let payment_req_id_string = vars ? vars[2].split('=') : ''
    let payment_req_id = payment_req_id_string[1]

    // payment status
    let values = vars ? vars[1].split('=') : ''
    let paymentStatus = values[1]

    let valuesFromPayment = { id: payment_id, req_id: payment_req_id, status: paymentStatus }
    useEffect((paymentStatus) => {
        axios.post('https://instamojo.onrender.com/success', valuesFromPayment)
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
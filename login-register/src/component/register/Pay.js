import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
function Pay(props) {
    const location = useLocation()
    const [data, setData] = useState({
        name: '',
        email: '',
        amount: ''
    })
    let backendData = location.state.data
    let amount = location.state.data.Amount
    useEffect((data) => {
        setData({ ...data, amount: amount })
    }, [amount])
    const changeInput = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    const Payment = () => {
        const { name, email, amount, } = data
        if (name && email && amount) {
            axios.post('https://instamojo.onrender.com/pay', { data, backendData })
                .then(res => {
                    // alert(typeof(res.data))
                    let dataFromApi = res.data.url
                    let datas = JSON.parse(dataFromApi)
                    let url = datas['payment_request']['longurl']
                    window.location.replace(url);
                })
        }
        else {
            alert('invalid data')
        }
    }
    return (

        <div className='flex flex-wrap  flex-col items-center justify-center mt-24 '>
            <div className='flex flex-col items-center border border-black shadow-xl rounded p-12' >
                <h1 className='mb-12 italic text-blue-500 text-2xl'> Payment details</h1>
                <input type="text" name="name" onChange={changeInput} placeholder='name' className='mt-2 p-2 border border-blue-400 rounded' />
                <input type="email" name="email" onChange={changeInput} placeholder='email' className='mt-2 p-2 border border-blue-400 rounded' />
                <input type="number" name="amount" onChange={changeInput} placeholder='amount' className='mt-2 p-2 border border-blue-400 ' value={amount} />
                <div className='flex flex-row w-full justify-around'>
                    <button onClick={Payment} className='border mt-2 border-lime-200 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2 rounded-xl text-white'> Pay Now</button>
                    <Link to='/'>
                        <button className='border mt-2 border-lime-200 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2 rounded-xl text-white'>HomePage</button> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Pay
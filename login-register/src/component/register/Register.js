import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Register() {

    const [user, setUser] = useState({
        invoice: "",
        Amount: 0,
        Qty: 0,
        Status: 'Pending'
    })
    const changeInput = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }
    const finalAmount = user.Qty*user.Amount
    console.log(user)
    const register = () => {
        setUser({...user,Amount:finalAmount})
        console.log('hello')
        const { invoice, Amount, } = user
        if (invoice && Amount) {
            axios.post('http://localhost:5000/register', user)
                .then(res => {
                    alert(res.data.message)
                    window.location.reload(false);
                })
        }
        else {
            alert('invalid data')
        }
    }

    
    return (
        <div className='flex items-center justify-center mt-12'>
            <div className='flex flex-col items-center justify-center border border-lime-600 rounded-xl shadow-2xl py-2 px-4'>
                <h1>  Add invoice </h1>
                <div className='flex flex-col p-2 items-center'>
                    <div className='flex flex-col '>
                        <h1> Purpose of Payment</h1>
                        <input type="text" name='invoice' onChange={changeInput} placeholder='invoice number' className='p-2 border border-lime-400 rounded-xl' />
                    </div>
                    <div className='flex flex-row mt-2'>
                        <input type="text" name="Amount" onChange={changeInput} placeholder='Amount' className=' p-2 border border-lime-400 rounded-xl' />
                    </div>
                    <div className='flex flex-row mt-2'>
                        <input type="text" name="Qty" onChange={changeInput} placeholder='Qty' className=' p-2 border border-lime-400 rounded-xl' />
                    </div>
                    <div className='flex row mt-2 w-full  px-2'>
                    <h1> Status</h1>
                    <select className='ml-12 rounded-2xl' onChange={(e)=> setUser({ ...user, Status: e.target.value })}>
                        <option value="Pending" >Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                    </div>
                </div>
                <div className='flex flex-row w-full items-center justify-around'>
                    <button onClick={register} class=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mt-12 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Add invoice
                    </button>
                    <Link to='/'>
                        <button class="mt-12 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500   text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            View invioce
                        </button>
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default Register
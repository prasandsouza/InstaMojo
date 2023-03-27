import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function HomePage() {
    const [invoiceData, setInvoiceData] = useState([])

    useEffect(() => {
        axios.get("https://instamojo.onrender.com")
            .then(res => {
                let value = res.data.data
                setInvoiceData(value)
            })
            .catch(err => console.log(err))

    }, [])
    return (
        <div className='flex justify-center items-center'>
            <div className=' flex flex-col  justify-center items-center w-10/12 h- shadow-xl mt-24   p-3'>
                <h1 className='font-extrabold text-3xl text-red-400 italic '> Insta Mojo Payment </h1>
                <div className='flex item-center flex-col shadow-xl border border-black p-12 w-10/12 mt-12'>
                    <hr className='w-full'/>
                    <table>
                        <thead >
                            <tr className='bg-gray-100'>
                                <th className='text-start'>Invoice Number</th>
                                <th className='text-start'>Amount</th>
                                <th className='text-start'>Status</th>
                                <th className='text-start'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-y-scroll'>
                            {invoiceData.map((value) => {
                                return (
                                    <tr className='text-gray-800'>
                                        <td>{value.invoice}</td>
                                        <td>{value.Amount}</td>
                                        <td className='text-blue-800'> {value.Status}</td>
                                        <td> {value.Status === 'Paid' ? <button className='bg-gradient-to-b from-green-300 to-green-500  cursor-not-allowed bg-lime-500 text-white font-bold text-center px-2 py-1 rounded-xl w-24'> Paid</button> : <Link to='/pay' state={{data:value}} > <button value={value} className='"mt-12 bg-gradient-to-b from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 hover:text-gray-800 font-bold p-1  rounded-xl  w-24 text-white'> Pay Now</button> </Link>} </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Link to='/register'>
                    <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mt-12 bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
                        Click here to Add Invoice
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage
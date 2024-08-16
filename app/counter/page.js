'use client'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment ,incrementByAmount} from './counterSlice'

export default function Counter() {
  const [inputValue, setInputValue] = useState(null)
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleButtonClick = () => {
    alert(`Input Value: ${inputValue}`)
    dispatch(incrementByAmount(inputValue))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center ">
          <input 
            type='text' 
            value={inputValue} 
            onChange={handleInputChange} 
            className="border text-black border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter text here"
          />
          <button
            onClick={handleButtonClick}
            className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Submit
          </button>
        </div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Increment
        </button>
        <span className="text-2xl font-semibold text-black">{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

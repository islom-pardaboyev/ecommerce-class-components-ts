import { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import { About, Home } from '../pages'

export class index extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about/:id' element={<About/>}/>
      </Routes>
    )
  }
}

export default index
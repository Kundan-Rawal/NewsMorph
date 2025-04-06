import React from 'react'

const StateContext = React.createContext({
  dropdown:false,
  isLoggedIn: false,
  user: null,
  
})

export default StateContext
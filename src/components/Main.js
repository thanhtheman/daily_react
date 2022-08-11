import React, { useState, useEffect } from 'react'

const Main = () => {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [name, setName] = useState('Mario')
  useEffect(() => {
    fetchAPI()
  }, []);


  const increase = () => {
    setCounter(counter + 1);
  }
  const decrease = () => {
    setCounter(counter - 1)
  }
  const reset = () => {
    setCounter(0);
  }

  const getFullUserInfo = (user) => {
    const {name: { first, last }} = user
    return `${first} ${last}`
  }

  const getUserImage= (user) => {
    const { picture: { large } } = user
    return `${large}`

  }

  let userData;
  const url ='https://randomuser.me/api'
  const fetchAPI = async () => {
    try {
      let res = await fetch(url)
      userData = await res.json()
      console.log(userData)
      setData(JSON.stringify(userData))
      setUserInfo(userData.results)
      return userData
    } catch (error) {
        console.log(error)
    }
  }
  console.log(name);
  return (
    <div>
      <h1 className='main--title'>React Counter</h1>
      <h1 className='main--title'>{counter}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={reset}>Reset</button>
      <br />
      <h1 className='main--title'>Fetch Random API</h1>
      <button onClick={fetchAPI}>Get Data</button>
      <div>
        <p className='user-data'>{data}</p>
        {
          userInfo.map((user, idx) => (
            <div key={idx}> 
              <h1>{getFullUserInfo(user)}</h1>
              <img src={getUserImage(user)} alt="profile picture" />
            </div>
          ))
        }
        <h1>{name}</h1>
        <button onClick={() => setName('Luigi')}>change name</button>
      </div>
    </div>
  )
}

export default Main
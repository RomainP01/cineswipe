import { auth, firebaseRef } from '../config'
import Room from './Room.js'
import { useState } from 'react'

import { db } from '../config'

import { titleAnim } from '../animation'

import { motion } from 'framer-motion'

const JoinRoom = ({ currentRoom, setCurrentRoom }) => {
  const [code, setCode] = useState('')

  const roomRef = db.collection('room')

  const makeid = (length) => {
    var result = []
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      )
    }
    return result.join('')
  }

  const addRoom = (room) => {
    roomRef.add({
      room: room,
      username: makeid(5),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code.length == 5) {
      db.collection('room')
        .where('room', '==', code)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot.docs.length)
          if (querySnapshot.docs.length > 0) {
            if (querySnapshot.docs.length > 1) {
              console.log('too many people in the room')
            } else {
              setCurrentRoom(code)
              addRoom(code)
            }
          } else {
            console.log('Mauvais code')
          }
        })
    }
  }
  return (
    <div className="JoinRoom">
      <div className="astuce">
        <motion.h3 variants={titleAnim} initial="hidden" animate="show">
          Or join a party with a code
        </motion.h3>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code"
        maxLength="5"
        minLength="5"
      />
      <div className="buttons">
        <button onClick={handleSubmit} disabled={!code}>
          Join
        </button>
      </div>
    </div>
  )
}

export default JoinRoom

import { db } from '../config'

import { titleAnim } from '../animation'

import { motion } from 'framer-motion'

const CreateRoom = ({ currentRoom, setCurrentRoom }) => {
  const roomRef = db.collection('room')
  const handleRoomChange = (room) => {
    setCurrentRoom(room)
    addRoom(room)
  }

  const addRoom = (room) => {
    roomRef.add({
      room: room,
      username: makeid(5),
    })
  }

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

  return (
    <div className="CreateRoom">
      <div className="astuce">
        <motion.h3 variants={titleAnim} initial="hidden" animate="show">
          Host a party and share the code with your friend{' '}
        </motion.h3>
      </div>

      <div className="buttons">
        <button className="button" onClick={() => handleRoomChange(makeid(5))}>
          Host
        </button>
      </div>
    </div>
  )
}

export default CreateRoom

import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { auth } from './config'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import Room from './components/Room'
import './App.css'
import Match from './components/Match'
import { motion } from 'framer-motion'
import { titleAnim } from './animation'
const App = () => {
  const [currentRoom, setCurrentRoom] = useState(null)
  const [matchTitle, setMatchTitle] = useState(null)
  const [matchPicture, setMatchPicture] = useState(null)

  return (
    <div className="app">
      <motion.h1
        initial={{ x: '-5vh' }}
        animate={{ x: 0 }}
        transition={{
          type: 'spring',
          repeat: Infinity,
          duration: 4,
          bounce: 0.8,
        }}
        className="titleLogo"
      >
        Cine<span>Swipe</span>
      </motion.h1>

      <div className="content">
        {currentRoom === null ? (
          <>
            <CreateRoom
              currentRoom={currentRoom}
              setCurrentRoom={setCurrentRoom}
            />
            <JoinRoom
              currentRoom={currentRoom}
              setCurrentRoom={setCurrentRoom}
            />
          </>
        ) : (
          <>
            {matchTitle === null ? (
              <Room
                currentRoom={currentRoom}
                setMatchTitle={setMatchTitle}
                setMatchPicture={setMatchPicture}
              />
            ) : (
              <Match
                matchTitle={matchTitle}
                matchPicture={matchPicture}
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App

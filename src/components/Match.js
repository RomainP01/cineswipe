import { useState, useMemo } from 'react'

import { db, firebaseRef } from '../config'

import { firebase } from 'firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import TinderCard from 'react-tinder-card'

const Match = ({ matchTitle, matchPicture, currentRoom, setCurrentRoom }) => {
  const handleLeave = (room) => {
    const query = db.collection('liked').where('room', '==', currentRoom)
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
    setCurrentRoom(null)
  }
  return (
    <>
      <h1>It's a match</h1>
      <div
        className="cardMatch"
        style={{
          backgroundImage:
            'url(https://image.tmdb.org/t/p/w500/' + matchPicture + ')',
        }}
      >
        <h3>{matchTitle}</h3>
      </div>
      <div className="buttons">
        <button className="button" onClick={() => handleLeave()}>
          Leave
        </button>
      </div>
    </>
  )
}

export default Match

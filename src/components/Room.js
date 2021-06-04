import React, { useState, useEffect } from 'react'

import { db, firebaseRef } from '../config'

import { firebase } from 'firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import TinderCard from 'react-tinder-card'

const Room = ({ currentRoom, setMatchTitle, setMatchPicture }) => {
  const filmRef = db.collection('films')
  const [films] = useCollectionData(filmRef)

  const likedRef = db.collection('liked')

  const [lastDirection, setLastDirection] = useState()

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=12b252191244406f6cdcec5e4ef65838&language=en-US&page=1',
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result['results'])
          setIsLoaded(true)
          setItems(result['results'])
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true)
          setError(error)
        },
      )
  }, [])

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const swiped = (direction, nameToDelete, picture) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    if (direction === 'right') {
      db.collection('liked')
        .where('titre', '==', nameToDelete)
        .where('room', '==', currentRoom)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                setMatchTitle(doc.data().titre)
                setMatchPicture(doc.data().picture)
              }
            })
          } else {
            console.log('ajouté')
            addLiked(nameToDelete, picture)
          }
        })
    }
  }

  const addLiked = (titre, picture) => {
    likedRef.add({
      titre: titre,
      picture: picture,
      room: currentRoom,
    })
  }

  return (
    <>
      <div className="cardContainer">
        {items &&
          items.map((item) => (
            <TinderCard
              className="swipe"
              key={item.title}
              onSwipe={(dir) => swiped(dir, item.title, item.poster_path)}
              onCardLeftScreen={() => outOfFrame(item.title)}
            >
              <div
                style={{
                  backgroundImage:
                    'url(https://image.tmdb.org/t/p/w500/' +
                    item.poster_path +
                    ')',
                }}
                className="card"
              >
                <h3 className="titreFilm">{item.title}</h3>
              </div>
            </TinderCard>
          ))}
      </div>

      <h3>Room Code : {currentRoom}</h3>
    </>
  )
}

export default Room

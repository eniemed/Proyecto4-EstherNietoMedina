import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Favorites = () => {
  const { user } = useContext(UserContext)

  const muestraFavorites = () => {
    const usuario = localStorage.getItem(user.username)

    if (usuario) {
      const usuarioActual = JSON.parse(usuario)

      return (
        <article className='favorite-structure'>
          <section>
            <h1 className='shop-title'>My Favorites</h1>
          </section>
          <section className='favorite-list'>
            {usuarioActual.favorites.map((libro) => (
              <div key={libro.title} className='book'>
                <img src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`} className='favorite-cover' />
              </div>
            ))}
          </section>
        </article>
      )
    } else {
      return (
        <p>Nothing to see here...</p>
      )
    }
  }

  return (
    <article>
      {user.loggedIn ? (
        muestraFavorites()
      ) : (
        <p className='shop-title'>Please log in to view your favorites!</p>
      )}
    </article>
  )
}

export default Favorites

import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

const ListaLibros2023 = () => {
  const [libros, setLibros] = useState([]) 
  const { user } = useContext(UserContext)

  const fetchLibros = async () => {
    const data = await fetch('https://openlibrary.org/search.json?q=2023')
    const { docs } = await data.json()
    setLibros(docs)
  }

  const agregarFavorites = (libro) => {
    if (user.loggedIn) {
      const userActual = JSON.parse(localStorage.getItem(user.username))
      userActual.favorites.push({ titulo: libro.title, cover_i: libro.cover_i })
      localStorage.setItem(user.username, JSON.stringify(userActual))
    }
  }

  useEffect(() => {
    fetchLibros()
  })

  return (
    <article className='shop-estructure'>
      <section>
        <ul className='book-list'>
          {libros.map((libro) => (
            <li key={libro.key} className="book-container">
              <img src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`} className="book-cover" />
              <div className="book-info">
                <h2 className="book-title">{libro.title}</h2>
                <p className="book-authors">{libro.author_name ? libro.author_name.join(', ') : 'Unknown'}</p>
                <p className="book-year">Published in {libro.publish_year ? Math.max(...libro.publish_year) : 'Unknown'}</p>
                <div className='book_cartBTN_icon'>
                  <button className="book_cartBTN">Add to cart</button>
                  <span className="heart-icon" onClick={() => agregarFavorites(libro)}>❤</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default ListaLibros2023

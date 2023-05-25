'use client';

import { useEffect, useState } from 'react'
import '../styles/planets.scss'

export default function StarWarsPlanets() {
  const [planetData, setPlanetData] = useState([])
  const [previousLink, setPreviousLink] = useState('')
  const [nextLink, setNextLink] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [url, setUrl] = useState('https://swapi.dev/api/planets/')

  interface mappedPlanetData {
    name: string
    climate?: string
    population?: number
  }

  useEffect(() => {
    const controller = new AbortController() // create an abortController to ensure the api call isn't run while component is unmounted

    fetch(url, { signal: controller.signal} )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError(true)
        }
        return Promise.reject(res)
      })
      .then(data => {
        setPlanetData(data.results)
        setPreviousLink(data.previous)
        setNextLink(data.next)
      })
      .catch(res => console.error(res.status))
      .finally(() => {
        if (controller.signal.aborted) return
        setLoading(false)
      })

    return () => {
      controller.abort() // when the component unmounts, abort the request
    }
  }, [url])

  const callBreadcrumbLink = (newLink: string) => {
    setUrl(newLink)
  }

  return (
    <>
      {loading && (
        <div className='loading-text'>
          <p>Trust in the force...</p>
          <p>Your data is being collected from across the galaxy.</p>
        </div>
      )}
      {error ? (
        <div className='error-text'>
          <p>There is a great disturbance in the Force.</p>
          <p>I fear something terrible has happened:</p>
          <p>{error}</p>
        </div>
      ) : planetData !== undefined && planetData.length > 0 ? (
        <>
          <div className='planets-wrapper'>
            <div className='header-row'>
              <div className='name data-column'>Planet Name:</div>
              <div className='climate data-column'>Planet Climate:</div>
              <div className='population data-column'>Planet Population:</div>
            </div>
            {planetData.map((planet: mappedPlanetData, index) => (
              <div className='data-row' key={index}>
                <div className='name data-column'>{planet.name}</div>
                <div className='climate data-column'>{planet.climate}</div>
                <div className='population data-column'>{planet.population}</div>
              </div>
            ))}
          </div>
          <div className='breadcrumb-nav'>
            <div className='previous-link'>
              {previousLink === null ? (
                <div />
              ) : (
                <button type='button' className='previous-button' onClick={() => callBreadcrumbLink(previousLink)}>
                  Previous Page
                </button>
              )}
            </div>
            <div className='next-link'>
              {nextLink === null ? (
                <div />
              ) : (
                <button type='button' className='next-button' onClick={() => callBreadcrumbLink(nextLink)}>
                  Next Page
                </button>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

import React from 'react'
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App.jsx'

export function render(url) {
  const helmetContext = {}

  return new Promise((resolve, reject) => {
    let didError = false
    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          if (didError) return
          let html = ''
          const writable = new Writable({
            write(chunk, _encoding, callback) {
              html += chunk.toString()
              callback()
            },
            final(callback) {
              resolve({ html, helmet: helmetContext.helmet })
              callback()
            }
          })
          pipe(writable)
        },
        onError(error) {
          didError = true
          reject(error)
        }
      }
    )
  })
}

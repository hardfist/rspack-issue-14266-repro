import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => React.createElement('div', null, 'Hello, world'),
})

const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute]),
})

export function render() {
  const el = document.createElement('div')
  document.body.appendChild(el)

  createRoot(el).render(React.createElement(RouterProvider, { router }))
}

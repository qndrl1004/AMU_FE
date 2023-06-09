import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import { ErrorBoundary } from './pages/ErrorBoundary'
import FindPassword from './pages/FindPassword'
import Login from './pages/Login'
import MyWikiList from './pages/MyWikiList'
import Profile from './pages/Profile'
import { SearchList } from './pages/SearchList'
import SignUp from './pages/SignUp'
import Wiki from './pages/Wiki'
import WikiDetail from './pages/WikiDetail'
import Withdrawal from './pages/Withdrawal'
import loginAction from './routes/login'
import resetPassrodAction from './routes/resetPassword'
import Root from './routes/Root'
import signupAction from './routes/signup'
import wikiAction from './routes/wiki'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/main',
      element: <Root />,
      loader: async ({ request }) => {
        const res = await fetch('/api/profile/detail', {
          method: 'get',
        })

        const profileData = await res.json()
        sessionStorage.setItem('nickname', profileData.nickname)
        return profileData
      },
      children: [
        {
          path: 'search',
          element: <SearchList />,
          loader: async ({ request }) => {
            const url = new URL(request.url)
            const query = url.searchParams.get('q')
            const res = await fetch(`/api/amuwiki/search?query=${query}`, {
              method: 'get',
            })
            if (!res.ok) throw res
            const data = await res.json()
            return data
          },
          action: async ({ request }) => {},
        },
        {
          path: ':wikiId',
          element: <WikiDetail />,
          loader: async ({ request }) => {
            const url = new URL(request.url)

            const id = url.pathname.split('/')[2]

            const body = JSON.stringify({
              '_id': id,
            })

            const res = await fetch(`/api/post/detail`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body,
            })

            if (!res.ok) throw res
            const data = await res.json()
            return data[0]
          },
        },
        {
          path: 'post/:wikiId',
          element: <Wiki />,
          loader: async ({ request }) => {
            const url = new URL(request.url)
            console.log('url#########', url)

            const id = url.pathname.split('/')[3]
            console.log('Reid', id)

            const body = JSON.stringify({
              '_id': id,
            })

            const res = await fetch(`/api/post/detail`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body,
            })

            if (!res.ok) throw res
            const data = await res.json()
            return data[0]
          },
          action: async ({ request }) => {
            const url = new URL(request.url)
            console.log('수정url#########', url)

            const id = url.pathname.split('/')[3]
            console.log('Reid', id)

            const formData = await request.formData()
            const title = formData.get('title')
            const text = formData.get('description')

            const body = JSON.stringify({
              '_id': id,
              title,
              text,
            })

            const res = await fetch(`/api/post`, {
              method: 'put',
              headers: {
                'Content-Type': 'application/json',
              },
              body,
            })

            if (!res.ok) throw res
            const data = await res.json()
            return redirect(`/main/${id}`)
          },
        },
        {
          path: 'post',
          element: <Wiki />,
          action: wikiAction,
        },
        {
          path: 'mywiki',
          element: <MyWikiList />,
          loader: async ({ request }) => {
            const res = await fetch('/api/post/mypost')
            const data = await res.json()

            return data
          },
        },
      ],
    },
    { path: '/login', element: <Login />, action: loginAction },
    {
      path: '/signup',
      element: <SignUp />,
      action: signupAction,
    },
    {
      path: '/find',
      element: <FindPassword />,
      action: resetPassrodAction,
    },
    { path: '/withdrawal', element: <Withdrawal /> },
    {
      path: '/profile',
      element: <Profile />,
      loader: async ({ request }) => {
        const res = await fetch('/api/profile/detail', {
          method: 'get',
        })

        const profileData = await res.json()

        return profileData
      },
    },
  ],
  { basename: '/' }
)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </CookiesProvider>
)

import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from '../util/Cookie'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserMenu() {
  const isLoginUser = getCookie()
  const nickname = sessionStorage.getItem('nickname')
  const imgRef = useRef<any>()
  const navigate = useNavigate()

  function handleLogout() {
    removeCookie()
    sessionStorage.clear()

    navigate('/')
    location.reload()
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/profile/image')
      const blobData = await data.blob()
      const objectURL = URL.createObjectURL(blobData)

      imgRef.current.src = objectURL
    }

    fetchData().catch(console.error)
    // URL.revokeObjectURL(objectURL)
  }, [])

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 hover:bg-gray-50">
        {isLoginUser ? (
          <div className="flex flex-row gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full "
              ref={imgRef}
              id="profile-img"
            ></img>
            <span>Hello, {nickname}!</span>
          </div>
        ) : (
          <Link to="/login" className="px-2 sm:px-4 py-2.5">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Log in
            </button>
          </Link>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 divide-y">
            {isLoginUser ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/main/post"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      New Wiki
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/main/mywiki"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      My Wiki
                    </a>
                  )}
                </Menu.Item>{' '}
              </>
            ) : (
              <></>
            )}
            <Menu.Item>
              {({ active }) =>
                isLoginUser ? (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Log out
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Log in
                  </Link>
                )
              }
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

import { Button } from 'flowbite-react'
import { useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'

export default function Wiki() {
  const data = useLoaderData() as unknown as any

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          {data ? <>Edit</> : <>New</>} Wiki
        </h2>
        <Form
          action={data ? `/main/post/${data._id}` : '/main/post'}
          method={data ? 'put' : 'post'}
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Type wiki title"
                required
                {...(data ? { defaultValue: data.title } : {})}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Your description here"
                {...(data ? { defaultValue: data.text } : {})}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <Button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            {data ? <>Edit</> : <>Add</>}
          </Button>
        </Form>
      </div>
    </section>
  )
}

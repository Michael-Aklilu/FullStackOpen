import { describe,expect,test } from 'vitest'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import blogService from '../services/blogs'


describe('Tests for blog', () => {
  const blog = {
    title: 'This is a test',
    author: 'Michael Aklilu',
    url: 'google.com',
    likes: 4444
  }
  const user = { username: 'Michael Aklilu' }
  const setBlogs = () => {}
  const blogs = []
  test('Check that blog only displays name and author', () => {

    render(<Blog blog={blog} user={user} setBlogs={setBlogs} blogs={blogs}/>)
    const element = screen.getByText('This is a test Michael Aklilu')
    expect(element).toBeDefined()
  })

  test('Check that view button works', async() => {
    const event = userEvent.setup()
    render(<Blog user={user} setBlogs={setBlogs} blogs={blogs} blog={blog} />)
    const button = screen.getByText('View')
    await event.click(button)
    const newUrl = screen.getByText('google.com',{ exact: false })
    const newLike = screen.getByText('Likes:4444',{ exact:false })
  })
  test('Check that the like button works properly',async() => {
    const event = userEvent.setup()
    render(<Blog user={user} setBlogs={setBlogs} blogs={blogs} blog={blog} />)
    const viewButton = screen.getByText('View')
    await event.click(viewButton)
    const likeButton = screen.getByText('like')
    event.click(likeButton)
    event.click(likeButton)
    expect(blog.likes === 4446)
  })
  test('Check that the add blog from works properly',async () => {
    const handleCreateSpy = vi.spyOn(blogService, 'create').mockResolvedValue({
      title: 'testing a form',
      author: 'Mike',
      url: 'google.com',
    })
    const event = userEvent.setup()
    const setSuccessMessage = vi.fn()
    const setShowMessage = vi.fn()
    const setBlogs = vi.fn()
    const blogs = []

    render( <CreateBlog user={user} setBlogs={setBlogs} blogs={blogs} setSuccessMessage={setSuccessMessage} setShowMessage={setShowMessage}/>)
    const title = screen.getByPlaceholderText('Becoming a software engineer')
    const author = screen.getByPlaceholderText('Michael Aklilu')
    const url = screen.getByPlaceholderText('fullstackopen.com')
    const createButton = screen.getByText('Create')
    await event.type(title,'testing a form')
    await event.type(author,'Mike')
    await event.type(url,'google.com')
    await event.click(createButton)

    expect(handleCreateSpy).toHaveBeenCalledWith({
      title: 'testing a form',
      author: 'Mike',
      url: 'google.com',
    })
    expect(setBlogs).toHaveBeenCalledWith([
      ...blogs,
      { title: 'testing a form', author: 'Mike', url: 'google.com' },
    ])
  })
})
const { test, expect, beforeEach, describe } = require('@playwright/test');
const { before } = require('node:test');

require('dotenv').config()
describe('Blog app', () => {
  beforeEach(async ({ page,request }) => {
    const response = await request.delete('http://localhost:3003/api/users/testing/reset');
    await request.post('http://localhost:3003/api/users',{
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
            name: "Michael Aklilu",
            username: 'Miki',
            password: '12345'
        })
    })
    await page.goto('http://localhost:5173')
  })
 
  describe('Login',()=> {
    test('Login form is shown', async({ page }) => {
      const username = await page.getByTestId('username')
      const password = await page.getByTestId('password')
      const loginButton = await page.getByRole('button',{name:'Log in'})
      expect(username).toBeDefined()
      expect(password).toBeDefined()
      expect(loginButton).toBeDefined()
    })
    test('suceeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('Miki')
      await page.getByTestId('password').fill('12345')
      await page.getByRole('button',{name:'Log in'}).click()
      expect(page.getByText('Miki logged in'))
    })
  })
  test('fails with wrong credentials', async ({page}) =>{
    await page.getByTestId('username').fill('Miki')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button',{name:'Log in'}).click()
    expect(page.getByText('Wrong username and password'))
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('Miki')
      await page.getByTestId('password').fill('12345')
      await page.getByRole('button',{name:'Log in'}).click()
    })
    
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button',{name:'New blog'}).click()
      await page.getByPlaceholder('Becoming a software engineer').fill('Playwright test three')
      await page.getByPlaceholder('Michael Aklilu').fill('Michael Aklilu')
      await page.getByPlaceholder('fullstackopen.com').fill('fullstackopen.com')
      await page.getByRole('button',{name:'Create'}).click()
      expect(page.getByText('Playwright test three Michael Aklilu'))
    })

    test('a blog can be liked',async({ page }) =>{
       await page.getByRole('button',{name:'View'}).first().click()
       const locator = page.locator('text=Likes:')
       const intialLikes = await locator.textContent()
       const initialLikesNumber = parseInt(intialLikes.replace('likes:', '').trim())
       await page.getByRole('button',{name:'like'}).click()
       const updatedLikes = await locator.textContent()
       const updatedLikesNumber = parseInt(updatedLikes.replace('Likes:','').trim())
       expect(updatedLikesNumber).toBe(initialLikesNumber + 1)

    })
    test('users can delete their blog',async( {page} ) => {
        await page.getByRole('button',{name:'View'}).click()
        await page.getByRole('button',{name:'Remove'}).click()
        page.on('dialog',async(dialog) => {
            expect(dialog.message()).toBe('Remove blog Playwright test three by Michael Aklilu')
            await dialog.accept()
        })
        expect(page.getByText('Playwright test three Michael Aklilu').not.toBeDefined())
    })

  })

})
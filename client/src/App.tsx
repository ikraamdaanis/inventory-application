import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AddCategoryForm } from './components/AddCategoryForm'

interface CategoryInterface {
  category_id: string
  title: string
  description: string
}

interface ItemInterface {
  item_id: string
  name: string
  description: string
  price: number
  category: string
  url: string
  stock: number
}

export const App = () => {
  const [categories, setCategories] = useState<CategoryInterface[] | null>(null)
  const [items, setItems] = useState<ItemInterface[] | null>(null)

  const getData = async () => {
    const { data } = await axios.get('http://localhost:5000/api/categories')
    setCategories(data)
  }

  const getItems = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/items`)
    setItems(data)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    console.log('Items: ', items)
  }, [items])

  return (
    <div className="App">
      <div className="categories">
        {categories?.map(category => (
          <div key={category.category_id}>
            <h2>{category.title}</h2>
            {items &&
              items
                .filter(item => item.category === category.category_id)
                .map(item => <p key={item.item_id}>{item.name}</p>)}
          </div>
        ))}
      </div>
      <AddCategoryForm />
    </div>
  )
}

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import { productsByUsername } from '../src/graphql/queries'
import { deleteProduct as deleteProductMutation } from '../src/graphql/mutations'

export default function MyProducts() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetchProducts()
  }, [])
  async function fetchProducts() {
    const { username } = await Auth.currentAuthenticatedUser()
    const productData = await API.graphql({
      query: productsByUsername, variables: { username }
    })
    setProducts(productData.data.productsByUsername.items)
  }
  async function deleteProduct(id) {
    await API.graphql({
      query: deleteProductMutation,
      variables: { input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    fetchProducts()
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Mine Produkter</h1>
      {
        products.map((product, index) => (
          <div key={index} className="border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500 mt-2 mb-2">Oprettet: {product.createdAt}</p>
            <Link href={`/edit-product/${product.id}`}>
              <a className="text-sm mr-4 text-blue-500">Opdater Produkt</a>
            </Link>
            <Link href={`/products/${product.id}`}>
              <a className="text-sm mr-4 text-blue-500">Se Produkt</a>
            </Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deleteProduct(product.id)}
            >Slet Produkt</button>
          </div>
        ))
      }
    </div>
  )
}
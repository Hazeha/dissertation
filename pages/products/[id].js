/*eslint-disable */
import { API, Storage } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { listProducts, getProduct } from '../../src/graphql/queries'
export default function Product({ product }) {
  const [coverImage, setCoverImage] = useState(null)
  useEffect(() => {
    updateCoverImage()
  }, [])
  async function updateCoverImage() {
    if (product.coverImage) {
      const imageKey = await Storage.get(product.coverImage)
      setCoverImage(imageKey)
    }
  }
  console.log('product: ', product)
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">{product.name}</h1>
      {
        coverImage && <img src={coverImage} className="mt-4" alt="product"/>
      }
      <p className="text-sm font-light my-4">by {product.username}</p>
      <div className="mt-8">
        <ReactMarkdown className='prose' children={product.discription} />
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const productData = await API.graphql({
    query: listProducts
  })
  const paths = productData.data.listProducts.items.map(product => ({ params: { id: product.id }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params
  const productData = await API.graphql({
    query: getProduct, variables: { id }
  })
  return {
    props: {
      product: productData.data.getProduct
    },
    revalidate: 60
  }
}
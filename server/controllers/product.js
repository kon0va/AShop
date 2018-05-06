import mongoose from 'mongoose'
import xss from 'xss'

const Product = mongoose.model('Product')

async function getProduct (ctx, next) {
  const { _id } = ctx.params
  if (!_id) {
    ctx.body = '_id is required'
    return
  }

  let product = await Product.findById(_id).exec()

  ctx.body = product
}

async function postProducts (ctx, next) {
  let product = ctx.request.body
  product = {
    title: xss(product.title),
    price: xss(product.price),
    intro: xss(product.intro)
  }

  product = new Product(product)

  try {
    await product.save()
    ctx.body = product
  } catch (e) {
    ctx.throw(501, e)
  }
}

async function putProducts (ctx, next) {
  let body = ctx.request.body
  const { _id } = body
  let product = await Product.findById(_id).exec()

  if (!product) {
    ctx.body = 'product not exist'
    return
  }

  product.title = xss(body.title)
  product.price = xss(body.price)
  product.intro = xss(body.intro)

  try {
    await product.save()
    ctx.body = product
  } catch (e) {
    ctx.throw(501, e)
  }
}

export {
  getProduct,
  postProducts,
  putProducts
}

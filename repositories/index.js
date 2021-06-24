import ProductRepository from '@/repositories/ProductRepository';

export default (context) => {
  return {
    productRepo: ProductRepository(context),
  }
}

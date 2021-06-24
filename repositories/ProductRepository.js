export default ({$axios}) => ({
  getProducts(params = {}) {
    return $axios.$get('/products', {params});
  },
});

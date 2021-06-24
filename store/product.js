export const state = () => ({
  products: [],
  productsLoaded: false,
});

const types = {
  SET_LOADED: 'setProductsLoaded',
  SET_PRODUCTS: 'setProducts',
};

export const mutations = {
  [types.SET_LOADED](state, loaded) {
    state.productsLoaded = loaded;
  },

  [types.SET_PRODUCTS](state, products) {
    state.products = products;
  },
};

export const actions = {
  getProducts({commit}) {
    return this.$repos.productRepo
      .getProducts()
      .then(response => {
        commit(types.SET_PRODUCTS, response.data);
        commit(types.SET_LOADED, true);
        return response;
      });
  },
};

export const getters = {
  products: state => state.products,
  productsLoaded: state => state.productsLoaded,
  product: (state) => (id) => {
    return state.products.find(i => {
      return i.id == id;
    })
  },
};

<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card class="product-container">
        <v-card-title class="headline">
          Products
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-for="(group, index) in groupProducts" :key="'group_'+index">
              <v-col v-for="product in group" :key="product.id">
                <v-card class="" width="250">
                  <v-img height="100" :src="product.image"></v-img>
                  <v-card-title>
                    {{ product.name }}
                  </v-card-title>
                  <v-card-text>
                    {{ product.description }}
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="primary" block>Buy</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <!-- PAGINATION -->
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data() {
      return {
        per_page: 16,
        per_row: 4,
        products_count: 0,
      };
    },

    computed: {
      ...mapGetters({
        'products': 'product/products',
        'productsLoaded': 'product/productsLoaded',
      }),

      page() {
        return this.$route.params.page;
      },

      groupProducts() {
        let list = this.products;
        let groups = [[], [], [], [],];

        for (let p of list) {
          for (let group of groups) {
            if (group.length < this.per_row) {
              group.push(p);
            }
          }
        }

        return groups;
      },

      paginatedProducts() {
        /*
        return this.products.slice(
          this.page == 1 ? 0 : this.page * this.per_page,
          this.page * this.per_page > this.products.length ?
        );
         */
      },
    },

    methods: {
      ...mapActions({
        'getProducts': 'product/getProducts',
      }),
    },

    mounted() {
      if (!this.productsLoaded) {
        this.getProducts();
      }
    }
  }
</script>
<style>

</style>

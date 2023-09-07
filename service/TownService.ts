export const TownService = {
    getTownsData() {
      return [
        {
          il: "Ankara"
        },
        {
          il: "İstanbul"
        }
      ];
    },
  
    getTownsMini() {
      return Promise.resolve(this.getTownsData().slice(0, 5));
    },
  
    getTownsSmall() {
      return Promise.resolve(this.getTownsData().slice(0, 10));
    },
  
    getTowns() {
      return Promise.resolve(this.getTownsData());
    }
  
    // getProductsWithOrdersSmall() {
    //   return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    // },
  
    // getProductsWithOrders() {
    //   return Promise.resolve(this.getProductsWithOrdersData());
    // }
  };
  
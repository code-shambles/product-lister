(function ($) {

$(document).ready(function () {

var ProductGrid = {

  handleProductListChange: function (products) {
    console.log('Grid: handleProductListChange', products);
    this.UI.update(products);
  },

  init: function () {
    console.log('Grid: init');
    var me = this;
    me.UI.init();
    document.addEventListener('product-list-change', function (ev) {
      console.log('Grid: product-list-change', ev.detail);
      me.handleProductListChange(ev.detail.products);
    }, false);
  }
};


ProductGrid.UI = {

  update: function (products) {
    console.log('Grid.UI: update', products);
    this.$root.html(products);
  },

  init: function () {
    console.log('Grid.UI: init');
    this.$root = $('<div id="product-grid" class="product-list">');
    $(document.body).append(this.$root);
  }
};


document.addEventListener('product-list-ready', function (ev) {
  console.log('Grid: product-list-ready', ev.detail);
  ProductGrid.init();
}, false);

});

})(jQuery);

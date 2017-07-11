(function ($) {

$(document).ready(function () {

var ProductFilterPrice = {

  options: {},
  events: {},

  handleProductListChange: function (options) {
    console.log('FilterPrice: handleProductListChange', options);
    this.options = options.price;
    this.UI.update(this.options);
  },

  onOptionClick: function(optionId, optionValue) {
    console.log('FilterPrice: onOptionClick', optionId, optionValue);
    this.options[optionId].map(function (option) {
      option.active = optionValue == option.value;
    });
    //this.UI.update(this.options); // might be optional here!
    var metaChangeEvent = new CustomEvent('product-list-meta-change', {
      "detail": {
        "filter": {
          "price": this.options
        }
      }
    });
    document.dispatchEvent(metaChangeEvent);
  },

  init: function (products, meta) {
    console.log('FilterPrice: init', products, meta);
    var me = this;
    me.UI.init(me.config, me.onOptionClick.bind(me));
    document.addEventListener('product-list-change', function (ev) {
      console.log('FilterPrice: product-list-change', ev.detail);
      me.handleProductListChange(ev.detail.meta.filter);
    }, false);
    me.handleProductListChange(meta.filter);
  }
};


ProductFilterPrice.UI = {
  $root: $('<div id="product-filter-price" class="product-filter"><strong>Preis von</strong></div>'),
  $ulMin: $('<ul>'),
  $ulMax: $('<ul>'),
  $li: $('<li>'),

  optionsLabels: {
    "0": "0 €",
    "50": "50 €",
    "200": "200 €",
    "500": "500 €",
    "999999": "egal"
  },

  update: function (optionSets) {
    console.log('FilterPrice.UI: update', optionSets);
    if (optionSets) {
      var me = this;
      // list priceMin
      me.$ulMin.empty();
      optionSets.priceMin.map(function (option, index) {
        if (option.avlbl !== false) {
          var $li = me.$li.clone(me.$li, false)
            .text(me.optionsLabels[option.value])
            .data('optionValue', option.value);
          if (option.active === true) {
            $li.addClass('active');
          }
          me.$ulMin.append($li);
        }
      });
      // list priceMax
      me.$ulMax.empty();
      optionSets.priceMax.map(function (option, index) {
        if (option.avlbl !== false) {
          var $li = me.$li.clone(me.$li, false)
            .text(me.optionsLabels[option.value])
            .data('optionValue', option.value);
          if (option.active === true) {
            $li.addClass('active');
          }
          me.$ulMax.append($li);
        }
      });
    }
  },

  init: function (config, onOptionClick) {
    console.log('FilterPrice.UI: init');
    this.$ulMin.on('click', 'li', function (ev) {
      console.log('------------');
      onOptionClick('priceMin', $(ev.target).data('optionValue'));
    });
    this.$ulMax.on('click', 'li', function (ev) {
      console.log('------------');
      onOptionClick('priceMax', $(ev.target).data('optionValue'));
    });
    this.$root.append(this.$ulMin, '<strong>bis</strong>', this.$ulMax);
    $(document.body).append(this.$root);
  }
};


document.addEventListener('product-list-ready', function (ev) {
  console.log('FilterPrice: product-list-ready', ev.detail);
  ProductFilterPrice.init(ev.detail.products, ev.detail.meta);
}, false);

});

})(jQuery);

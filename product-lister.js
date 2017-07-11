(function ($) {

$(document).ready(function () {

var ProductLister = {
  meta: {
    sorting: null,
    paging: null,
    filter: {
      "participants": {
        "participantsMin": [{
            "value": 1
          },{
            "value": 2,
            "active": true
          },{
            "value": 4
          }],
        "participantsMax": [{
            "value": 1,
            "avlbl": false
          },{
            "value": 2
          },{
            "value": 4
          },{
            "value": 999999
          }]
      },
      "price": {
        "priceMin": [{
            "value": 0
          },{
            "value": 50,
            "active": true
          },{
            "value": 200
          },{
            "value": 500
          }],
        "priceMax": [{
            "value": 50
          },{
            "value": 200
          },{
            "value": 500,
            "active": true
          },{
            "value": 999999
          }]
      },
      "duration": {
        "durationMin": [{
            "value": 1
          },{
            "value": 3
          },{
            "value": 7
          },{
            "value": 10
          },{
            "value": 14
          }],
        "durationMax": [{
            "value": 1
          },{
            "value": 3
          },{
            "value": 7
          },{
            "value": 10,
            "active": true
          },{
            "value": 14
          },{
            "value": 999999
          }]
      }
    }
  },

  requestParams: {
    "cid": "",
    "pid": "",
    "loc": "",
    "range": "",
    "tgid": "",
    "priceMin": "",
    "priceMax": "",
    "sortBy": "",
    "start": ""
  },

  events: {},

  /**
   * get the list of products (and updated filter options) from the back-end
   */
  getListing: function () {
    // TODO make request
    this.notifyChange();
  },

  handleMetaChange: function (newMeta) {
    console.log('Lister: handleMetaChange', newMeta);
    // update this.meta.filter
    Object.assign(this.meta.filter, newMeta, true);
    console.log('Lister: this.meta.filter', this.meta.filter);
    // get the new listing
    this.getListing();
    // TODO add option to prevent updating the listing
  },

  /**
   * notify subscribers that the list (products(meta) changed
   */
  notifyChange: function () {
    this.events.listChange.detail.meta = this.meta;
    console.log('Lister: notifyChange', this.events.listChange.detail);
    document.dispatchEvent(this.events.listChange);
  },

  /**
   * read initial filter options (from localstorage, url pramas, or elsewhere)
   */
  initOptions: function () {
    //var productListingOptions = localStorage.getItem('productListingOptions');
    // TODO replace line below by logic ;-)
    productListingOptions = this.meta.filter;
    console.log('Lister: initOptions', productListingOptions);
    if (typeof productListingOptions === 'object') {
      this.meta.filter = productListingOptions;
    }
  },

  init: function () {
    this.events.listChange = new CustomEvent('product-list-change', {
      "detail": {
        "meta": this.meta,
        "products": "to be done"
      }
    });
    this.events.listReady = new CustomEvent('product-list-ready', {
      "detail": {
        "meta": this.meta,
        "products": "to be done"
      }
    });
    this.initOptions();
    var me = this;
    document.addEventListener('product-list-meta-change', function (ev) {
      console.log('Lister: product-list-meta-change', ev.detail);
      me.handleMetaChange(ev.detail);
    }, false);
    window.ProductLister = this;
    document.dispatchEvent(this.events.listReady);
  }
};

ProductLister.init();

});

})(jQuery);

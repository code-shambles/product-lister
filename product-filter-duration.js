(function ($) {

$(document).ready(function () {

var ProductFilterDuration = {

  options: {},
  events: {},
  config: {
    optionId: 'duration',
    optionSets: ['durationMin', 'durationMax']
  },

  handleProductListChange: function (options) {
    console.log('FilterDuration: handleProductListChange', options);
    this.options = options.duration;
    this.UI.update(this.options);
  },

  onOptionClick: function(optionSetId, optionValue) {
    console.log('FilterDuration: onOptionClick', optionSetId, optionValue);
    this.options[optionSetId].map(function (option) {
      option.active = optionValue == option.value;
    });
    this.UI.update(this.options); // might be optional here!
    var metaChangeEvent = new CustomEvent('product-list-meta-change', {
      "detail": {
        "filter": {
          [this.config.optionId]: this.options
        }
      }
    });
    document.dispatchEvent(metaChangeEvent);
  },

  init: function (products, meta) {
    console.log('FilterDuration: init', products, meta);
    var me = this;
    me.UI.init(me.config, me.onOptionClick.bind(me));
    document.addEventListener('product-list-change', function (ev) {
      console.log('FilterDuration: product-list-change', ev.detail);
      me.handleProductListChange(ev.detail.meta.filter);
    }, false);
    me.handleProductListChange(meta.filter);
  }
};


ProductFilterDuration.UI = {

  config: {},

  update: function (optionSets) {
    console.log('FilterDuration.UI: update', optionSets);
    var me = this;

    me.$root.empty();
    for (var optionSetId in optionSets) {
      var $ul = $('<ul>');
      var optionSet = optionSets[optionSetId];
      me.$root.append('<strong>' + me.labels[optionSetId] + '</strong>', $ul);
      optionSet.map(function (option) {
        var $li = $('<li>')
          .text(me.labels[option.value])
          .data('optionSetId', optionSetId)
          .data('optionValue', option.value);
        if (option.active === true) {
          $li.addClass('active');
        }
        $ul.append($li);
      });
    }
  },

  initLabels: function () {
    this.labels = {
      [this.config.optionId + "Min"]: "Reisedauer von",
      [this.config.optionId + "Max"]: "bis",
      "1": "1 Tag",
      "3": "2 Tage",
      "7": "7 Tage",
      "10": "10 Tage",
      "14": "14 Tage",
      "999999": "egal",
    };
  },

  init: function (config, onOptionClick) {
    console.log('FilterDuration.UI: init');
    var me = this;
    me.config = config;
    me.initLabels();
    me.$root = $('<div id="product-filter-' + this.config.optionId + '" class="product-filter">');
    me.$root.on('click', 'li', function (ev) {
      console.log('------------');
      onOptionClick($(ev.target).data('optionSetId'), $(ev.target).data('optionValue'));
    });
    $(document.body).append(me.$root);
  }
};


document.addEventListener('product-list-ready', function (ev) {
  console.log('FilterDuration: product-list-ready', ev.detail);
  ProductFilterDuration.init(ev.detail.products, ev.detail.meta);
}, false);

});

})(jQuery);

(function ($) {

$(document).ready(function () {

var ProductFilterParticipants = {

  options: {},
  events: {},

  handleProductListChange: function (options) {
    console.log('FilterParticipants: handleProductListChange', options);
    this.options = options.participants;
    this.UI.update(this.options);
  },

  onOptionClick: function(optionId, optionValue) {
    console.log('FilterParticipants: onOptionClick', optionId, optionValue);
    this.options[optionId].map(function (option) {
      option.active = optionValue == option.value;
    });
    this.UI.update(this.options); // might be optional here!
    var metaChangeEvent = new CustomEvent('product-list-meta-change', {
      "detail": {
        "filter": {
          "participants": this.options
        }
      }
    });
    document.dispatchEvent(metaChangeEvent);
  },

  init: function (products, meta) {
    console.log('FilterParticipants: init', products, meta);
    var me = this;
    me.UI.init(me.config, me.onOptionClick.bind(me));
    document.addEventListener('product-list-change', function (ev) {
      console.log('FilterParticipants: product-list-change', ev.detail);
      me.handleProductListChange(ev.detail.meta.filter);
    }, false);
    me.handleProductListChange(meta.filter);
  }
};


ProductFilterParticipants.UI = {
  $root: $('<div id="product-filter-participants" class="product-filter"><strong>Teilnehmer von</strong></div>'),
  $ulMin: $('<ul>'),
  $ulMax: $('<ul>'),
  $li: $('<li>'),

  optionsLabels: {
    "1": "1 Person",
    "2": "2 Personen",
    "4": "4 Personen",
    "999999": "egal",
  },

  update: function (optionSets) {
    console.log('FilterParticipants.UI: update', optionSets);
    if (optionSets) {
      var me = this;
      // list participantsMin
      me.$ulMin.empty();
      optionSets.participantsMin.map(function (option, index) {
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
      // list participantsMax
      me.$ulMax.empty();
      optionSets.participantsMax.map(function (option, index) {
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
    console.log('FilterParticipants.UI: init');
    this.$ulMin.on('click', 'li', function (ev) {
      console.log('------------');
      onOptionClick('participantsMin', $(ev.target).data('optionValue'));
    });
    this.$ulMax.on('click', 'li', function (ev) {
      console.log('------------');
      onOptionClick('participantsMax', $(ev.target).data('optionValue'));
    });
    this.$root.append(this.$ulMin, '<strong>bis</strong>', this.$ulMax);
    $(document.body).append(this.$root);
  }
};


document.addEventListener('product-list-ready', function (ev) {
  console.log('FilterParticipants: product-list-ready', ev.detail);
  ProductFilterParticipants.init(ev.detail.products, ev.detail.meta);
}, false);

});

})(jQuery);

// ----------------------------------------------------------------------------
// Auto-height thing

$(function () {
  Harvey.attach('(min-width: 480px)', {

    on: function () {
      $(window).on('resize.fill', function () {
        $('.speakers .item').css({ height: $(window).innerHeight() });
        $('.speaker.section').css({ height: $(window).innerHeight() });
      });
      $(window).trigger('resize.fill');
    },

    off: function () {
      $('.speakers .item').css({ height: null });
      $('.speaker.section').css({ height: null });
      $(window).off('resize.fill');
    }
  });
});

// ----------------------------------------------------------------------------
// Toggleable

$(function () {
  $(document).toggleable('.toggle', { using: '.toggle-button' });
  $(document).toggleable('.faq-list li', { using: 'strong' });
});

// ----------------------------------------------------------------------------
// Auto-replace

$(document).on('section', function (e, id) {
  if (id === 'top') $.replaceHash(null);
  else $.replaceHash(id);
});

// ----------------------------------------------------------------------------
// Replace hash helper

if (window.history && window.history.replaceState) {
  $.replaceHash = function (hash) {
    window.history.replaceState(null, null, hash ? "#"+hash : location.pathname);
  };
} else {
  $.replaceHash = function(){};
}

// ----------------------------------------------------------------------------

$.monitorHover({ y: 70 });
$(document).on('over:on', function () {
  $('.navigation').toggleClass('show-links', true);
});
$(document).on('over:off', function () {
  $('.navigation').toggleClass('show-links', false);
});

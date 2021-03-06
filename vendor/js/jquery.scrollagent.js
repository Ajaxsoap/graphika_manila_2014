/*! jQuery.scrollagent (c) 2012, Rico Sta. Cruz. MIT License.
 *  https://github.com/rstacruz/jquery-stuff/tree/master/scrollagent */

// Call $(...).scrollagent() with a callback function.
//
// The callback will be called everytime the focus changes.
//
// Example:
//
//      $("h2").scrollagent(function(cid, pid, currentElement, previousElement) {
//        if (pid) {
//          $("[href='#"+pid+"']").removeClass('active');
//        }
//        if (cid) {
//          $("[href='#"+cid+"']").addClass('active');
//        }
//      });

(function($) {
  var count = 0;

  $.fn.scrollagent = function(options, callback) {
    // Event tag
    var tag = '.scrollagent.scrollagent-'+(++count);

    // Account for $.scrollspy(function)
    if (typeof callback === 'undefined') {
      callback = options;
      options = {};
    }

    var $sections = $(this);
    var $parent = options.parent || $(window);
    var xform = options.xform || (function(y, range, height) {
      return y + height * (0.3 + 0.7 * Math.pow(y/range, 2));
    });
    var offsets = getOffsets($sections, options);

    // State
    var current = null;
    var height = null;
    var range = null;

    // Save the height. Do this only whenever the window is resized so we don't
    // recalculate often.
    $(window).on('resize'+tag, function() {
      height = $parent.height();
      range = $(document).height();
      offsets = getOffsets($sections, options);
      $parent.trigger('scroll'+tag);
    });

    // Find the current active section every scroll tick.
    $parent.on('scroll'+tag, function() {
      var y = $parent.scrollTop();
      y = xform(y, range, height);

      var latest = null;

      for (var i in offsets) {
        if (offsets.hasOwnProperty(i)) {
          var offset = offsets[i];
          if (offset.top < y) latest = offset;
        }
      }

      if (latest && (!current || (latest.index !== current.index))) {
        callback.call($sections,
          latest ? latest.id : null,
          current ? current.id : null,
          latest ? latest.el : null,
          current ? current.el : null);
        current = latest;
      }
    });

    $(window).trigger('resize');
    $parent.trigger('scroll');

    return this;
  };

  function getOffsets($sections, options) {
    var offsets = [];
    $sections.each(function(i) {
      var offset = $(this).attr('data-anchor-offset') ?
        parseInt($(this).attr('data-anchor-offset'), 10) :
        (options.offset || 0);

      offsets.push({
        top: $(this).offset().top + offset,
        id: $(this).attr('id'),
        index: i,
        el: this
      });
    });
    return offsets;
  }

})(jQuery);

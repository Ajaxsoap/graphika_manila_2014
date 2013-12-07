// ----------------------------------------------------------------------------
// Speaker scrolling animation

$(function () {
  $('.fillsize').fillsize('>img');
});

$(function () {
  var $speakers = $(".speaker.section");

  $('.section[id], .m-section').scrollagent({
    xform: function (y, range, height) { return y + height * 0.8; }
  }, function (cid, pid, el, previous) {
    $(el).addClass('active');
    $(previous).removeClass('active');
    $(document).trigger('section', cid);
    $('html')
      .toggleClass(getClass($(previous)), false)
      .toggleClass(getClass($(el)), true);
  });

  function getClass($el) {
    var isSpeaker = $el.is('.speaker');
    if (isSpeaker) {
      return 'section-speakers section-speaker-'+$speakers.index($el);
    } else
      return 'section-'+$el.attr('id');
  }
});

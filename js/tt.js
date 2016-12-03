$('.js-trigger').on('click', function() {
  $(this).toggleClass('menu__trigger--active');
	$('.js-menu').slideToggle('fast');
});

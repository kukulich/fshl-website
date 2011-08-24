$(function() {
	// Activate navigation item
	var $window = $(window);
	var $navigation = $('nav a');
	var navigationHeight = $('nav').height();
	var targets = $navigation.map(function() {
		return $(this).attr('href');
	});
	var actual = targets[0];
	var offsets = $.map(targets, function(target) {
		return $(target).offset().top;
	});

	function activateTarget(target)
	{
		if (actual !== target) {
			$navigation.eq($.inArray(actual, targets)).parent('li').removeClass('active');
			$navigation.eq($.inArray(target, targets)).parent('li').addClass('active');
			actual = target;
		}
	}

	function scrollToTarget(target)
	{
		var targetNo = $.inArray(target, targets);
		$('html,body').animate({
			scrollTop: offsets[targetNo] - navigationHeight - 5
		}, 'slow', function() {
			activateTarget(target);
		});
	}

	function scroll()
	{
		var scrollTop = $window.scrollTop() + 50;
		for (var i = offsets.length - 1; i >= 0; i--) {
			if (scrollTop >= offsets[i]) {
				activateTarget(targets[i]);
				break;
			}
		}
	}

	$()
		.add($navigation)
		.add('#donation a')
			.click(function() {
			var target = $(this).attr('href');
			scrollToTarget(target);
			window.location.hash = target.substr(1);
			return false;
		});
	$window.scroll(scroll);
	if (window.location.hash) {
		scrollToTarget(window.location.hash);
	}
});

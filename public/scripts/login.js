//Remove error message when a user clicks on input.

$(document).ready(function() {
	$('.login-form').on('click', () => {
		$('.error-message').text('')
		$('.error-message').removeClass('error-message')
	})
});
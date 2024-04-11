//AJAX to clear error message when user clicks on input fields.

$(document).ready(function() {
	$('#login-form').on('input', function(event) {
			event.preventDefault();
			$('.error-message').text(' ');
			let data = $(this).serialize();
	})
});

const handleInput = () => {

}

const handleSubmit = () => {
	
}
$('#navbar').scrollspy();

$(document).bind('scroll', function(){

	var b = $('body').scrollTop();

	if(b > 40)
	{
		$('html').addClass('scrolled');
	}
	else
	{
		$('html').removeClass('scrolled');
	}
});

$('#contact').submit(function(){

	var name = $('#contact #name').val(),
		email = $('#contact #email').val(),
		message = $('#contact #message').val();


	$('#contact #send').val('Sending...');

	$.ajax({
		url: '/app/mail.php',
		type: 'POST',
		data: {name: name,email: email,message: message},
		success: function(data, textStatus, jqXHR){

			$('#contact').find('.alert').hide();

			if (data == 0)
			{
				var error =	'<div class="alert alert-block alert-error fade in"><button type="button" class="close" data-dismiss="alert">×</button><h4 class="alert-heading">Oh snap! You got an error!</h4><p>Sorry, your message hasn\'t been sent. Please try again - or contact us directly at <a href="mailto:contact@tchew.info">contact@tchew.info</a></p><p><a class="btn btn-danger" href="mailto:contact@tchew.info">contact@tchew.info</a></p></div>';

				$('#contact').prepend(error);

				$('#contact #send').val('Send');

				setTimeout(function(){$('#contact').find('.alert').fadeOut();}, 20000);
			}
			else
			{
				var success =	'<div class="alert alert-block alert-success fade in"><button type="button" class="close" data-dismiss="alert">×</button><h4 class="alert-heading">Thanks for getting in touch</h4><p>Your message has been sent successfully, we\'ll be in touch soon.</p></div>';

				$('#contact').prepend(success);

				$('#contact').find('fieldset').slideUp();

				$('#contact #send').val('Send');

				setTimeout(function(){$('#contact').find('fieldset').slideDown();$('#contact').find('.alert').fadeOut();}, 10000);

				name = $('#contact #name').val(''),
				email = $('#contact #email').val(''),
				message = $('#contact #message').val('');
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
		}
	});

	return false;
});

$(".alert").alert()
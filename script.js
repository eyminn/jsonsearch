$(document).ready(function() {

	var searchsubject;
	$('#getphotos').click(function() {
		searchsubject = $('#searchphotos').val();
		getphotos();
	});
	$('#searchphotos').keydown(function(e){
		if (e.keyCode == 13) {
			searchsubject = $(this).val();
			getphotos();
		}
	});

	function getphotos() {
		var flickURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + searchsubject + "&jsoncallback=?"

		$.ajax(
			{
				dataType: 'json',
				method: 'GET',
				url: flickURL,
				success: proccesPhotos
			}
		)

		
	}

	function proccesPhotos(data){
		console.log(data);
		$('#photos').html("");
		for(var i=0; i<data.items.length; i++){
			var foto = data.items[i];
			var htmlCode = "<div><a href='" + foto.link + "' target='_blank'><img src='" + foto.media.m +"' alt='" + foto.title + "'></a><h4>" + foto.title + "</h4></div>";
			$('#photos').append(htmlCode);
		}
		$('#source a').attr("href", data.link).text(data.title + " Flickr.com");
	}

})
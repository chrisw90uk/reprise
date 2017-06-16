$(document).ready(function(){
	
	$('input[type=file]').change(function (e) {
		console.log(this.files[0].size.toString());
	});


	$("form.imgUpload").submit(function(event){
		event.preventDefault();

		var data = new FormData();
		data.append('name', $('input[name="imgName"]').val());
		data.append('alt', $('input[name="imgAlt"]').val());
		data.append('image', $('input[type=file]')[0].files[0]);

		$.ajax({
			xhr: function() {
		        var xhr = new window.XMLHttpRequest();
		        xhr.upload.addEventListener("progress", function(evt) {
		            if (evt.lengthComputable) {
		                var percentComplete = evt.loaded / evt.total;
		                $(".progress__bar").width(percentComplete*100 + "%");
		            }
		       }, false);

		       return xhr;
		    },
			url: 'ctrl/uploadImg.php',
	        type: 'POST',
	        data: data,
	        processData: false, // Don't process the files
        	contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        	success: function(data, textStatus, jqXHR){
        		alert(data);
        		window.location.href = "../reprise/img-upload.html"
        	},
        	error: function(jqXHR, textStatus, errorThrown){
	            console.log('ERRORS: ' + textStatus);
	        }
		});


	});

});
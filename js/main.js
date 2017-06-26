/*global $, console*/
$(document).ready(function () {
	"use strict";
	
	var contents,
		url,
		nm,
		em,
		sb,
		ms,
		dt,
		err,
		collect,
		i;
	
	contents = {};
	
	$(".bg-main .box").load("./partials/home.html", function (rsp) {
		contents["./partials/home.html"] = rsp;
	});

	function loadContents(urlPar) {
		if (contents[urlPar]) {
			$(".bg-main .box").html(contents[urlPar]);
		} else {
			$(".bg-main .box").load(urlPar, function (rsp) {
				contents[urlPar] = rsp;
			});
		}
	}

	function handleResponse(response) {
		$(".feedback").html(response);
		console.log(response);
	}

	function handleError(jqXHR, textStatus, errorThrown) {
		console.log("textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
	}

	function validateForm(ev) {
		ev.preventDefault();
		
		dt = {};
		err = [];
		nm = $("#name").val().trim();
		em = $("#email").val().trim();
		sb = $("#subject").val().trim();
		ms = $("#comment").val().trim();
		$(".feedback").html("");
		
		if (nm !== "") {
			dt.name = nm;
		} else {
			err.push("Name<br>");
		}
		
		if (em !== "") {
			dt.email = em;
		} else {
			err.push("Email<br>");
		}
		
		if (sb !== "") {
			dt.subject = sb;
		} else {
			err.push("Subject<br>");
		}
		
		if (ms !== "") {
			dt.message = ms;
		} else {
			err.push("Message");
		}
		
		if (err.length === 0) {
			$.ajax({
				type: "post",
				url: "./server-side-script/web-service.php",
				data: dt,
				dataType: "text"
			}).done(handleResponse).fail(handleError);
		} else {
			collect = "Please fill in the following fields: <br>";
			for (i = 0; i < err.length; i += 1) {
				collect += (err[i]);
			}
			$(".feedback").html(collect);
			err = [];
			collect = "";
		}
	}
	
	$(".bg-header a").on("click", function (ev) {
		ev.preventDefault();
		url = $(this).attr("href");
		console.log(url);
		loadContents(url);
		$(".bg-main .box").on("submit", "form", validateForm);
	});
});

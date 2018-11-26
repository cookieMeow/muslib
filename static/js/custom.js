// var firebase = require("firebase");

$(document).ready(function()
{
	// var musicData = [];
	// var config = {
	//   apiKey: "AIzaSyAYd9AK8thmpaJxgtrjgNhU2wNCPbpUjMY",
	//   authDomain: "inf551-b516a.firebaseapp.com",
	//   databaseURL: "https://inf551-b516a.firebaseio.com",
	//   projectId: "inf551-b516a",
	//   storageBucket: "inf551-b516a.appspot.com",
	//   messagingSenderId: "146881048005"
	// };
	// firebase.initializeApp(config);

	// "use strict";

	// var database = firebase.database();
	// var dbRef = firebase.database().ref();
	// dbRef.on('value', function(snapshot) {
	//     snapshot.forEach(function(childSnapshot) {
	//       var childData = childSnapshot.val();
	//       musicData.push(childData);
	//     });
	// });
	// console.log(musicData)

	// $(".main_search").on('click', function() {
	// 	location.href = "{% url 'musics' %}";
	// });



	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initDropdown();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		var hamb = $('.hamburger');
		var menu = $('.menu');
		var menuOverlay = $('.menu_overlay');
		var menuClose = $('.menu_close_container');

		hamb.on('click', function()
		{
			menu.toggleClass('active');
			menuOverlay.toggleClass('active');
		});

		menuOverlay.on('click', function()
		{
			menuOverlay.toggleClass('active');
			menu.toggleClass('active');
		});

		menuClose.on('click', function()
		{
			menuOverlay.toggleClass('active');
			menu.toggleClass('active');
		});
	}

	/* 

	4. Init Dropdown

	*/

	function initDropdown()
	{
		if($('.domain_search_dropdown').length)
		{
			var dd = $('.domain_search_dropdown');
			var ddItems = $('.domain_search_dropdown ul li');
			var ddSelected = $('.domain_search_selected');
			dd.on('click', function()
			{
				dd.toggleClass('active');
			});
			ddItems.on('click', function()
			{
				var selectedDomain = $(this).text();
				ddSelected.text(selectedDomain);
			});
		}
	}

});
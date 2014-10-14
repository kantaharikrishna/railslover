(function () {
	var d = document;
	var c = {
		COCOS2D_DEBUG:2,
		box2d:false,
		showFPS:false,
		frameRate:60,
		tag:'gameCanvas',
		engineDir:'../cocos2d/',
		appFiles:['MyFifthApp.js'],
		mainFile:'main.js'
	};
	window.addEventListener('DOMContentLoaded', function () {
		var s = d.createElement('script');
		s.src = c.engineDir + 'platform/jsloader.js';
		d.body.appendChild(s);
		s.c = c;
		s.id = 'cocos2d-html5';
	});
})();
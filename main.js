$(document).ready(function(){
/*
	User Story: As a user, I can start a 25 minute pomodoro, and the timer will go off
	once 25 minutes has elapsed.

	Bonus User Story: As a user, I can reset the clock for my next pomodoro.

	Bonus User Story: As a user, I can customize the length of each pomodoro.
*/
	var countPls = $('.pls'),
		countSub = $('.sub'),
		sessionCount = $('.session .count'),
		breakCount = $('.break .count'),
		reset = $('.reset'),
		pause = $('.pause'),
		start = $('.start'),
		clock = $('.clock'),
		timerId=null,
		isPause=false,
		time = parseInt(sessionCount.text())*60-1,
		timeMin=0,timeSec=0,
		toggle=0,
		toggleId=null,
		step=5;

	var breakToggle = function(n){
		var id = setInterval(function(){
			clock.toggle();
			n--;
			if(n<1) clearInterval(id);
		});
		
	};
	var timeFormat = function(time){
		return (time < 10 )? '0'+time : time;
	}
	var init = function(){
		countPls.attr('disabled', false)
		countSub.attr('disabled', false)
		clock.css('color', '#e74c3c');
		clock.text('25:00');
		breakCount.text('5');
		sessionCount.text('25')
		time = parseInt(sessionCount.text())*60-1;
		sessionCount.text('25');
		timeMin=0;
		timeSec=0;
		start.text('start');
		if(timerId)
			clearInterval(timerId);
	};
	init();

	reset.on('click', function(){
		init();
	});
	pause.on('click', function(){
		isPause=true;
	});
			//time=5; // temporary secondes
	start.on('click', function(){

			countPls.attr('disabled', true)
			countSub.attr('disabled', true)
			isPause=false;
			if(timerId) clearInterval(timerId);
			timerId = setInterval(function(){
				if(!isPause){
					timeMin = Math.floor(time / 60);
					timeSec = time % 60;
					clock.text(timeFormat(timeMin) +':'+timeFormat(timeSec))
					time--;
					// time for a break
					if(timeMin === 0 && timeSec === 0){

						clock.text('break!').css('color', '#00B16A');
						clearInterval(timerId); // stop the session interval

						toggle=0; // for break out put toggle

						 toggleId = setInterval(function(){
							clock.toggle();
							toggle++;
							console.log("rani fe toggle timer")
							if(toggle > 3){
								clearInterval(toggleId);
								toggleId = null;
							}

						},500);
						// start a break interval
						
							time = 4;//parseInt(breakCount.text())*60-1;
							timerId = setInterval(function(){
								if(!toggleId && !isPause){	
									timeMin = Math.floor(time / 60);
									timeSec = time % 60;
									clock.css('display','block').text(timeFormat(timeMin) +':'+timeFormat(timeSec));
									time--;
									if(timeMin === 0 && timeSec === 0){
										init();
									}
								}
							}, 1000)
						
					}// end of break interval
				}
			}, 1000);
		
		
	});

	countPls.on('click', function(){
		var n = parseInt($(this).parent().find('.count').text())+step;
			$(this).parent().find('.count').text(n);
			time = n*60-1;
	
			

	});
	countSub.on('click', function(){
			var n = parseInt($(this).parent().find('.count').text())-step;
			if(n >= step){
				$(this).parent().find('.count').text(n);
				time = n*60-1;
			}
	});


});
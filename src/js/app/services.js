(function(){

    var app = angular.module('myServices', []);

    app.factory('getWWWData', ['$http', '$log', function($http, $log){
        var cache = {};
        var urls = {
            'www_data': 'json/www_data.json'
        };

        return function (type, callback){
            if(angular.isUndefined(cache[type])){
                callback = callback||function(){};

                var url = urls[type];

                $http.get(urls[type])
                    .success(function (data, status, headers, config) {
                        cache[type] = data;
                        callback(data);
                    })
                    .error(function (data, status, headers, config) {

                        $log.error('Wystąpił błąd podczas żądania "'+url+'"!');

                    });
            } else {
                callback(data);
            }

        };
    }]);

    app.service('mainService', function () {
        var mainService = {};

        ////////////////////////////////////////////////////////////////////////////////////////////
        
        mainService.StartTooltip = function() {
            $('[data-toggle="tooltip"]').tooltip({
                placement: 'right'
            });
        };        

        mainService.EmptyWord = function(myTag) {
            $(myTag).empty();
        };
        mainService.AnimateWord = function(myTag,myWord,myDelay,myStep,fade) {
            var myChars = myWord.split("");
            var i = 0;
            var myTimer;
            var myTimeout = setTimeout(function() {
                myTimer = setInterval(timerTick, myStep);
            }, myDelay);
            function timerTick() {
                var mySpan = document.createElement("span");
                var myText = document.createTextNode(myChars[i]);
                mySpan.appendChild(myText);
                $(myTag).append(mySpan);
                if (fade) {
                    mySpan.classList.add('animation-1');                    
                }
                i++;
                if (i >= myChars.length) {
                    clearInterval(myTimer);
                }
            }
        };
        mainService.SetNoOpacity = function(myTag) {
            $(myTag).css('opacity','0');
        };
        mainService.FadeIn = function(myTag,myDelay,myStep) {
            var FadeInShow = setTimeout(function() {
                $(myTag).animate({opacity: '1'}, myStep);
            }, myDelay);
        };

        mainService.ShowWebsite = function(showWebsiteData) {
            var totalTime = 0;
            for (var key in showWebsiteData) {
                switch (showWebsiteData[key].mode) {
                    case "AnimateWord":
                        mainService.EmptyWord(showWebsiteData[key].selector);
                        mainService.AnimateWord(showWebsiteData[key].selector,showWebsiteData[key].word,(totalTime+showWebsiteData[key].delayTime),showWebsiteData[key].stepTime);
                        totalTime += showWebsiteData[key].delayTime + (showWebsiteData[key].word.length * showWebsiteData[key].stepTime);
                        break;
                    default:      // "FadeIn"
                        mainService.SetNoOpacity(showWebsiteData[key].selector);
                        mainService.FadeIn(showWebsiteData[key].selector,(totalTime+showWebsiteData[key].delayTime),showWebsiteData[key].stepTime);
                        totalTime += showWebsiteData[key].delayTime + showWebsiteData[key].stepTime;
                }
            }
        };

        ////////////////////////////////////////////////////////////////////////////////////////////

        mainService.StartSlider = function(sliderId,numberOfSlides,slideDelay,slideTime) {
            
            var w8slider = {
                
                getNumberOfNextSlide: function(numberOfSlide,progress) {
                    var numberOfNextSlide = 1;
                    if (progress) {
                        numberOfNextSlide = numberOfSlide + 1;                        
                        if (numberOfNextSlide > this.numberOfSlides) numberOfNextSlide = 1;
                    } else {
                        numberOfNextSlide = numberOfSlide - 1;                        
                        if (numberOfNextSlide < 1) numberOfNextSlide = this.numberOfSlides;
                    }
                    return numberOfNextSlide;
                },
                setPanelPointImg: function(imgTag,state) {

                },
                slideToSlide: function(numberOfSlide) {
                    $(this.mySlides[this.activeSlide]).animate({opacity: 0}, 1000);
                    this.panelPoints[this.activeSlide].src = "./img/w8-slider/w8-slider-pointempty.png";
                    this.activeSlide = numberOfSlide;
                    $(this.mySlides[this.activeSlide]).animate({opacity: 1}, 1000);
                    this.panelPoints[this.activeSlide].src = "./img/w8-slider/w8-slider-pointfull.png";
                    $(w8slider.mySlides[w8slider.activeSlide]).find('.w8-slider-name-line-opacited').css('width','0');
                    $(w8slider.mySlides[w8slider.activeSlide]).find('.w8-slider-name-line-opacited').animate({width: '35%'}, w8slider.slideDelay);
                    $(w8slider.mySlides[w8slider.activeSlide]).find('.w8-slider-slide-img').animate({zoom: 2}, w8slider.slideDelay);
                },
                startTimer: function() {
                    function myTimer() {
                        if ( (w8slider.autoSlide) && (!w8slider.sliderPaused) ) {
                            w8slider.slideToSlide(w8slider.getNumberOfNextSlide(w8slider.activeSlide,true));
                        }
                        setTimeout(myTimer, w8slider.slideDelay);
                    }
                    setTimeout(myTimer, w8slider.slideDelay);
                },
                initButtons: function() {
                    // panel
                    $(this.mySlider).mouseover(function() { w8slider.autoSlide = false; });
                    $(this.mySlider).mouseout(function() { w8slider.autoSlide = true; });
                    function OnPanelOver(event) {
                        $(event.currentTarget).animate({opacity: 1}, 500);
                    }
                    function OnPanelOut(event) {
                        $(event.currentTarget).animate({opacity: 0}, 500);
                    }
                    this.sliderPanel.addEventListener("mouseenter", OnPanelOver, false);
                    this.sliderPanel.addEventListener("mouseleave", OnPanelOut, false);
                    $(this.btnLeft).click(function() { $(this).fadeTo('slow', 0.5).fadeTo('slow', 0.15); w8slider.slideToSlide(w8slider.getNumberOfNextSlide(w8slider.activeSlide,false)); });
                    $(this.btnRight).click(function() { $(this).fadeTo('slow', 0.5).fadeTo('slow', 0.15); w8slider.slideToSlide(w8slider.getNumberOfNextSlide(w8slider.activeSlide,true)); });
                    $(this.btnPause).click(function() { $(this).fadeTo('slow', 0.5).fadeTo('slow', 0.15); w8slider.sliderPaused = !w8slider.sliderPaused; });
                    // panel2
                    function OnPanel2Click(event) {
                        $(event.target).fadeTo('slow', 1).fadeTo('slow', 0.5);
                        w8slider.slideToSlide(w8slider.panelPoints.indexOf(event.target));
                    }
                    this.sliderPanel2.addEventListener("click", OnPanel2Click, false);
                },
                initGUI: function() {
                    // slides
                    for (var i=1; i<numberOfSlides+1; i++) {
                        this.mySlides[i] = this.mySlider.querySelector("#w8-slider-slide"+i);
                    }
                    // panel
                    this.sliderPanel = this.mySlider.querySelector("#w8-slider-panel");
                    this.btnLeft = this.sliderPanel.querySelector("#w8-slider-panel-btn-left");
                    this.btnRight = this.sliderPanel.querySelector("#w8-slider-panel-btn-right");
                    this.btnPause = this.sliderPanel.querySelector("#w8-slider-panel-btn-pause");
                    // panel2
                    this.sliderPanel2 = this.mySlider.querySelector("#w8-slider-panel2");
                    this.panelPoints = [];
                    for (var k=1; k<numberOfSlides+1; k++) {
                        this.panelPoints[k] = new Image();
                        this.panelPoints[k].src = "img/w8-slider/w8-slider-pointempty.png";
                        this.panelPoints[k].classList.add("w8-slider-panel2-point");
                        this.sliderPanel2.appendChild(this.panelPoints[k]);
                    }
                    this.panelPoints[1].src = "img/w8-slider/w8-slider-pointfull.png";
                },
                init: function(sliderId,numberOfSlides,slideDelay,slideTime) {
                    this.mySlider = document.querySelector("#"+sliderId);
                    this.numberOfSlides = numberOfSlides;
                    this.activeSlide = 1;
                    this.slideDelay = slideDelay;
                    this.slideTime = slideTime;
                    this.mySlides = [];
                    this.slideWidth = this.mySlider.clientWidth;
                    this.initGUI();
                    this.initButtons();
                    this.sliderPaused = false;
                    this.autoSlide = true;
                    this.startTimer();
                }

            };
            w8slider.init(sliderId,numberOfSlides,slideDelay,slideTime);

        };

        ////////////////////////////////////////////////////////////////////////////////////////////

        mainService.GetRandomInt = function(min, max) {
            var myInt = max+1;
            while (myInt > max) {
                myInt = parseInt(Math.random()*(max-min+1) + min);
            }
            return myInt;
        };

        mainService.ShuffleTable = function(myTable) {
            for(var j, x, i = myTable.length; i; j = Math.floor(Math.random() * i), x = myTable[--i], myTable[i] = myTable[j], myTable[j] = x);
            return myTable;
        };

        return mainService;
    });


})();
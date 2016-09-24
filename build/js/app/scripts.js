(function(){

    var app = angular.module('myControllers', ['myDirectives', 'myServices']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'views/home.html',
                label: 'Witaj'
            })
            .when('/products/:categoryName/:productName', {
                controller: 'productsController',
                templateUrl: 'views/produkty.html',
                label: 'Produkty'
            })
            .when('/products/:categoryName', {
                controller: 'productsController',
                templateUrl: 'views/produkty.html',
                label: 'Produkty'
            })
            .when('/products', {
                controller: 'productsController',
                templateUrl: 'views/produkty.html',
                label: 'Produkty'
            })
            .when('/contact', {
                controller: 'contactController',
                templateUrl: 'views/kontakt.html',
                label: 'Kontakt'
            })
            .otherwise({
                redirectTo: '/home'
            });            

        $locationProvider
            .html5Mode(true);
            
    }]);

    app.controller('myController', ['$scope', '$http', '$window', '$location', '$anchorScroll', 'mainService', 'getWWWData', function($scope, $http, $window, $location, $anchorScroll, mainService, getWWWData) {

        getWWWData('www_data', function (data) {
            $scope.wwwData = data;
            $scope.WWWInit();
        });

        $scope.WWWInit = function() {

            $scope.products = [];
            $scope.shuffleProducts = [];
            angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                $scope.products[category.name] = [];
            });
            angular.forEach($scope.wwwData.products, function(product, productKey) {
                angular.forEach(product.sections, function(section) {
                    section.activeElementId = -1;
                });
                var imagesIds = [];
                for (var i = 0; i < product.images; i++) {
                    imagesIds.push(i);
                }
                product.imagesIds = imagesIds;
                product.activeImageId = 0;
                $scope.products[product.category].push(product);
            });
            angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                $scope.shuffleProducts[category.name] = mainService.ShuffleTable($scope.products[category.name]);
            });

            $scope.imgProductsFolderPath = './img/products/';

            // SLIDER
            $scope.colorsForSlider = ['#d82c38'];
            $scope.sliderCategoriesColors = [];
            $scope.sliderCategoriesImageNumbers = [];
            $scope.randomSlider = function() {
                angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                    $scope.sliderCategoriesColors[categoryKey] = $scope.colorsForSlider[mainService.GetRandomInt(0,$scope.colorsForSlider.length-1)];
                    $scope.sliderCategoriesImageNumbers[categoryKey] = mainService.GetRandomInt(0,$scope.products[category.name].length-1);
                });
            };
            $scope.randomSlider();            
        };

        $scope.menuCenterDropdownMenu = false;
        $scope.menuCenterDropdownMenuActiveCategory = "";
        $scope.menuMobileMenu = false;
        $scope.menuMobileActiveCategory = "";

        // START //

        $scope.showWebsiteData = {
            a1 : {mode: "FadeIn", selector: ".logo > h1", stepTime: 800, delayTime: 0},
            a2 : {mode: "AnimateWord", selector: ".logo > p", word: "M O N I T O R Y", stepTime: 40, delayTime: 0, fade: true},
            a3 : {mode: "FadeIn", selector: ".menu-center", stepTime: 800, delayTime: 0},
            a4 : {mode: "FadeIn", selector: ".menu-right", stepTime: 800, delayTime: 0},
            a5 : {mode: "FadeIn", selector: ".w8-slider", stepTime: 800, delayTime: 0},
            a6 : {mode: "FadeIn", selector: ".product-store-gallerries", stepTime: 800, delayTime: 0}
        };

        $(window).load(function() {
            $('.siteLoader').hide();
            mainService.StartTooltip();
            mainService.ShowWebsite($scope.showWebsiteData);
            mainService.StartSlider("w8-slider1",4,4000,1000);
        });

        $scope.GoToSiteTop = function() {
            $location.hash('site-top');
            $anchorScroll();
        };

        $scope.ShowDropdownMenu = function(category) {
            if ($scope.menuCenterDropdownMenuActiveCategory == category) {
                $scope.menuCenterDropdownMenu = !$scope.menuCenterDropdownMenu;
            } else {
                $scope.menuCenterDropdownMenu = true;
            }
            $scope.menuCenterDropdownMenuActiveCategory = category; 
        };
        $scope.ShowMobileMenu = function(category) {
            if ($scope.menuMobileMenuActiveCategory == category) {
                $scope.menuMobileMenu = !$scope.menuMobileMenu;
            } else {
                $scope.menuMobileMenu = true;
            }
            $scope.menuMobileMenuActiveCategory = category;
        };

        $scope.GoToProduct = function (categoryName,productNumber) {
            $location.path('/products/'+categoryName+'/'+productNumber);
            console.log('/products/'+categoryName+'/'+productNumber);
        };        

        $scope.SlideUpAndDownByClass = function(elementClass) {
            $(elementClass).slideUp($scope.slideTime).slideDown($scope.slideTime);
        };
        $scope.SlideUpAndDownChildByClass = function(e,elementChildClass) {
            $(e.currentTarget).find(elementChildClass).slideUp($scope.slideTime).slideDown($scope.slideTime);
        };
   
        $('.underline-link').mouseenter(function() {
            $(this).find('underline').animate({width: '100%'}, $scope.slideTime);
        });
        $('.underline-link').mouseleave(function() {
            $(this).find('underline').animate({width: '0%'}, $scope.slideTime);
        });

    }]);

    //////////
    // HOME //
    //////////

    app.controller('homeController', ['$scope', 'mainService', function($scope, mainService){

        $scope.$parent.menuCenterDropdownMenu = false;
        $scope.$parent.menuMobileMenu = false;

        angular.element(document).ready(function() {

        });

    }]);

    //////////////
    // PRODUCTS //
    //////////////  

    app.controller('productsController', ['$scope', '$routeParams', 'mainService', function($scope, $routeParams, mainService){


        $scope.$parent.menuCenterDropdownMenu = false;
        $scope.$parent.menuMobileMenu = false;

        $scope.SetActiveCategory = function (categoryName, productName) {

            $scope.$parent.activeCategory = $scope.$parent.wwwData.categories[0];
            angular.forEach($scope.$parent.wwwData.categories, function(category, categoryKey) {
                if(category.name == categoryName) {
                    $scope.$parent.activeCategory = category;
                }
            });
            $scope.$parent.activeProduct = $scope.products[$scope.$parent.activeCategory.name][0];
            angular.forEach($scope.products[$scope.$parent.activeCategory.name], function(product, productKey) {
                if(product.name == productName) {
                    $scope.$parent.activeProduct = product;
                }
            });
            console.log("Ustawiłem:",$scope.$parent.activeCategory.label," -> ",$scope.$parent.activeProduct.name);
        };
        $scope.SetActiveCategory($routeParams.categoryName,$routeParams.productName);

        $scope.AnimateProducts = function () {
            var showProductsData = {
                a1 : {mode: "FadeIn", selector: ".products-show-1", stepTime: 500, delayTime: 0},
                a2 : {mode: "FadeIn", selector: ".products-show-2", stepTime: 500, delayTime: 0},
                a3 : {mode: "FadeIn", selector: ".products-show-3", stepTime: 500, delayTime: 0},
                a4 : {mode: "FadeIn", selector: ".products-show-4", stepTime: 500, delayTime: 0},
                a5 : {mode: "FadeIn", selector: ".products-show-5", stepTime: 500, delayTime: 0},
                a6 : {mode: "FadeIn", selector: ".products-show-6", stepTime: 500, delayTime: 0},
                a7 : {mode: "FadeIn", selector: ".products-show-7", stepTime: 500, delayTime: 0}
            };
            mainService.ShowWebsite(showProductsData);
        };

        angular.element(document).ready(function() {
            $scope.AnimateProducts();
        });

    }]);

    /////////////
    // CONTACT //
    /////////////  

    app.controller('contactController', ['$scope', 'mainService', function($scope, mainService){


        $scope.$parent.menuCenterDropdownMenu = false;
        $scope.$parent.menuMobileMenu = false;

        $scope.AnimateContact = function () {
            var showProductsData = {
                a1 : {mode: "FadeIn", selector: ".contact-show-1", stepTime: 500, delayTime: 0},
                a2 : {mode: "FadeIn", selector: ".contact-show-2", stepTime: 500, delayTime: 0},
                a3 : {mode: "FadeIn", selector: ".contact-show-3", stepTime: 500, delayTime: 0},
                a4 : {mode: "FadeIn", selector: ".contact-show-4", stepTime: 500, delayTime: 0}
            };
            mainService.ShowWebsite(showProductsData);
        };

        angular.element(document).ready(function() {
            $scope.AnimateContact();
        });

    }]);


})();;
(function(){

    var app = angular.module('myDirectives', ['myFilters']);

})();;
(function(){
 
    var app = angular.module('myFilters', []);

    app.filter('capitalize', function() {
        return function(input, scope) {
            if (input !== null)
            input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        };
    });

    app.filter('maskEmail', function(){
        return function (input, length) {

            input = input||'';
            length = length||3;

            var parts = input.split('@');
            var masked = parts[0].substr(0, length);
            var maskLength = parts[0].length - length;

            for (var i = 0; i<maskLength; i++) {
                masked += '*';
            }

            parts[0] = masked;

            return parts.join('@');
        };
    });


})();;
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
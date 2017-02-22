(function(){

    var app = angular.module('myControllers', ['myDirectives', 'myServices']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'views/home.html',
                label: 'Witaj'
            })
            .when('/produkty/:categoryName/:productName', {
                controller: 'produktyController',
                templateUrl: 'views/produkty.html',
                label: 'Produkty'
            })
            .when('/produkty/:categoryName', {
                controller: 'produktyController',
                templateUrl: 'views/produkty.html',
                label: 'Produkty'
            })
            .when('/produkty', {
                controller: 'produktyController',
                templateUrl: 'views/produkty.html',
                label: 'Produkty'
            })
            .when('/kontakt', {
                controller: 'kontaktController',
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

            $scope.produkty = [];
            $scope.shuffleprodukty = [];
            $scope.actualYear = new Date().getFullYear();
            angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                $scope.produkty[category.name] = [];
            });
            angular.forEach($scope.wwwData.produkty, function(product, productKey) {
                angular.forEach(product.sections, function(section) {
                    section.activeElementId = -1;
                });
                var imagesIds = [];
                for (var i = 0; i < product.images; i++) {
                    imagesIds.push(i);
                }
                product.imagesIds = imagesIds;
                product.activeImageId = 0;
                $scope.produkty[product.category].push(product);
            });
            angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                $scope.shuffleprodukty[category.name] = mainService.ShuffleTable($scope.produkty[category.name]);
            });

            $scope.imgproduktyFolderPath = './img/produkty/';

            // SLIDER 
            $scope.colorsForSlider = ['#d82c38'];
            $scope.sliderCategoriesColors = [];
            $scope.sliderCategoriesImageNumbers = [];
            $scope.randomSlider = function() {
                angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                    $scope.sliderCategoriesColors[categoryKey] = $scope.colorsForSlider[mainService.GetRandomInt(0,$scope.colorsForSlider.length-1)];
                    $scope.sliderCategoriesImageNumbers[categoryKey] = mainService.GetRandomInt(0,$scope.produkty[category.name].length-1);
                });
            };
            $scope.randomSlider();  
            mainService.dataLoaded = true;
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
            $location.path('/produkty/'+categoryName+'/'+productNumber);
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
    // produkty //
    //////////////  

    app.controller('produktyController', ['$scope', '$routeParams', 'mainService', function($scope, $routeParams, mainService){

 
        $scope.$parent.menuCenterDropdownMenu = false;
        $scope.$parent.menuMobileMenu = false;

        $scope.SetActiveCategory = function (categoryName, productName) {

            $scope.$parent.activeCategory = $scope.$parent.wwwData.categories[0];
            angular.forEach($scope.$parent.wwwData.categories, function(category, categoryKey) {
                if(category.name == categoryName) {
                    $scope.$parent.activeCategory = category;
                }
            }); 
            $scope.$parent.activeProduct = $scope.produkty[$scope.$parent.activeCategory.name][0];
            angular.forEach($scope.produkty[$scope.$parent.activeCategory.name], function(product, productKey) {
                if(product.name == productName) {
                    $scope.$parent.activeProduct = product;
                }
            });
        };
        $scope.SetActiveCategory($routeParams.categoryName,$routeParams.productName);

        $scope.Animateprodukty = function () {
            var showproduktyData = {
                a1 : {mode: "FadeIn", selector: ".produkty-show-1", stepTime: 500, delayTime: 0},
                a2 : {mode: "FadeIn", selector: ".produkty-show-2", stepTime: 500, delayTime: 0},
                a3 : {mode: "FadeIn", selector: ".produkty-show-3", stepTime: 500, delayTime: 0},
                a4 : {mode: "FadeIn", selector: ".produkty-show-4", stepTime: 500, delayTime: 0},
                a5 : {mode: "FadeIn", selector: ".produkty-show-5", stepTime: 500, delayTime: 0},
                a6 : {mode: "FadeIn", selector: ".produkty-show-6", stepTime: 500, delayTime: 0},
                a7 : {mode: "FadeIn", selector: ".produkty-show-7", stepTime: 500, delayTime: 0}
            }; 
            mainService.ShowWebsite(showproduktyData);
        };

        angular.element(document).ready(function() {
            $scope.Animateprodukty();
        });

    }]);

    /////////////
    // kontakt //
    /////////////  

    app.controller('kontaktController', ['$scope', 'mainService', function($scope, mainService){


        $scope.$parent.menuCenterDropdownMenu = false;
        $scope.$parent.menuMobileMenu = false;

        $scope.Animatekontakt = function () {
            var showproduktyData = {
                a1 : {mode: "FadeIn", selector: ".kontakt-show-1", stepTime: 500, delayTime: 0},
                a2 : {mode: "FadeIn", selector: ".kontakt-show-2", stepTime: 500, delayTime: 0},
                a3 : {mode: "FadeIn", selector: ".kontakt-show-3", stepTime: 500, delayTime: 0},
                a4 : {mode: "FadeIn", selector: ".kontakt-show-4", stepTime: 500, delayTime: 0}
            };
            mainService.ShowWebsite(showproduktyData);
        };

        angular.element(document).ready(function() {
            $scope.Animatekontakt();
        });

    }]);


})();
(function(){

    var app = angular.module('myControllers', ['myDirectives', 'myServices']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'views/home.html',
                label: 'Welcome'
            })
            .when('/products/:categoryAlias/:productAlias', {
                controller: 'productsController',
                templateUrl: 'views/products.html',
                label: 'Products'
            })
            .when('/products/:categoryAlias', {
                controller: 'productsController',
                templateUrl: 'views/products.html',
                label: 'Products'
            })
            .when('/products', {
                controller: 'productsController',
                templateUrl: 'views/products.html',
                label: 'Products'
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
            angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                $scope.products[category.name] = [];
            });
            angular.forEach($scope.wwwData.products, function(product, productKey) {
                $scope.products[product.category].push(product);
            });

            // SLIDER
            $scope.colorsForSlider = ['#1e3557','#37342d','#83293b'];
            $scope.sliderCategoriesColors = [];
            $scope.sliderCategoriesImageNumbers = [];
            $scope.randomSlider = function() {
                angular.forEach($scope.wwwData.categories, function(category, categoryKey) {
                    //$scope.sliderCategoriesColors[categoryKey] = $scope.colorsForSlider[mainService.GetRandomInt(0,$scope.colorsForSlider.length-1)];
                    //$scope.sliderCategoriesImageNumbers[categoryKey] = mainService.GetRandomInt(1,$scope.products[category.name].length);
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
            a1 : {mode: "FadeIn", selector: ".logo > h1", stepTime: 500, delayTime: 0},
            a2 : {mode: "AnimateWord", selector: ".logo > p", word: "M O N I T O R Y", stepTime: 33, delayTime: 0, fade: true},
            a3 : {mode: "FadeIn", selector: ".menu-center", stepTime: 500, delayTime: 0},
            a4 : {mode: "FadeIn", selector: ".menu-right", stepTime: 500, delayTime: 0},
            a5 : {mode: "FadeIn", selector: ".w8-slider", stepTime: 500, delayTime: 0},
            a6 : {mode: "FadeIn", selector: ".product-store-gallerries", stepTime: 500, delayTime: 0}
        };

        $(window).load(function() {
            $('.siteLoader').hide();
            mainService.StartTooltip();
            //mainService.StartSlider("w8-slider1",$scope.wwwData.categories.length,4000,1000);
            mainService.ShowWebsite($scope.showWebsiteData);
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
            $scope.$parent.activeProduct = productNumber;
            $location.path('/products/'+categoryName+'/'+$scope.$parent.activeProduct);
            console.log('/products/'+categoryName+'/'+$scope.$parent.activeProduct);
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

        $scope.$parent.menuRight = false;

        angular.element(document).ready(function() {

        });

    }]);

    /////////////
    // PRODUCTS //
    /////////////   

    app.controller('productsController', ['$scope', '$routeParams', 'mainService', function($scope, $routeParams, mainService){

        $scope.$parent.menuRight = false;

        $scope.SetActiveCategory = function (categoryAlias, productAlias) {
            if (categoryAlias) {
                for (var i = 0; i < $scope.wwwData.length; i ++) {
                    if ($scope.wwwData[i].name === categoryAlias) {
                        $scope.$parent.activeCategoryID = i;
                    }
                }
            } else {
                $scope.$parent.activeCategoryID = 1;                
            }
            if (productAlias) {
                $scope.$parent.activeProduct = productAlias;
            } else {
                $scope.$parent.activeProduct = 1;
            }
        };
        $scope.SetActiveCategory($routeParams.categoryAlias,$routeParams.productAlias);

        $scope.AnimateProducts = function () {
            var showProductsData = {
                a1 : {mode: "FadeIn", selector: ".products-show-1", stepTime: 500, delayTime: 0},
                a2 : {mode: "FadeIn", selector: ".products-show-2", stepTime: 500, delayTime: 0},
                a3 : {mode: "FadeIn", selector: ".products-show-3", stepTime: 500, delayTime: 0},
                a4 : {mode: "FadeIn", selector: ".products-show-4", stepTime: 500, delayTime: 0},
                a5 : {mode: "FadeIn", selector: ".products-show-5", stepTime: 500, delayTime: 0},
                a6 : {mode: "AnimateWord", selector: ".products-product-title > h4", word: $scope.$parent.wwwData[$scope.$parent.activeCategoryID].products[$scope.$parent.activeProduct-1].title, stepTime: 10, delayTime: 500, fade: false},
                a7 : {mode: "AnimateWord", selector: ".products-product-desc > p", word: $scope.$parent.wwwData[$scope.$parent.activeCategoryID].products[$scope.$parent.activeProduct-1].desc, stepTime: 1, delayTime: 500, fade: false}
            };
            mainService.ShowWebsite(showProductsData);
        };

        $scope.NextProduct = function () {
            if ($scope.$parent.activeProduct < $scope.$parent.wwwData[$scope.$parent.activeCategoryID].products.length) {
                $scope.$parent.activeProduct++;
            }
            $scope.AnimateProducts();
        };
        $scope.PreviousProduct = function () {
            if ($scope.$parent.activeProduct > 1) {
                $scope.$parent.activeProduct--;
            }
            $scope.AnimateProducts();
        };

        angular.element(document).ready(function() {
            $scope.AnimateProducts();
        });

    }]);

    //////////////////
    // REGISTRATION //
    //////////////////

    app.controller('registrationController', ['$scope', '$http', '$window', '$location', 'mainService', function($scope, $http, $window, $location, mainService){

        angular.element(document).ready(function() {
            mainService.StartTooltip();
            $scope.showData = {
                a1 : {mode: "FadeIn", selector: ".container-formular", stepTime: 500, delayTime: 0}
            };
            mainService.ShowWebsite($scope.showData);
        });

        $scope.$parent.menuRight = false;
        $scope.registrationFail = false;

        $scope.$parent.Logout();

        $scope.RegisterUser = function() {

            $scope.users = [];
            $scope.phpAtt = "?email='"+$scope.user[1]+"'";
            $http.get("../../php/users-getusers.php"+$scope.phpAtt).success(function(data) {
                $scope.$parent.users = data;
                if ($scope.$parent.users[0] !== undefined) {
                    $scope.bladRejestracji = true;                    
                } else {
                    $scope.$parent.user[10] = 0;
                    $scope.$parent.user[11] = $window.btoa($scope.$parent.users[1]);
                    $scope.$parent.user[12] = "dane";
                    $scope.$parent.HttpPost('../../php/users-setuser.php',$scope.$parent.user);
                    $location.path('/logowanie');
                }
            });
        };             

    }]);

    ////////////////
    // ACTIVATION //
    ////////////////

    app.controller('activationController', ['$scope', '$routeParams', '$http', '$window', '$location', 'mainService', function($scope, $routeParams, $http, $window, $location, mainService){

        $scope.$parent.menuRight = false;
        angular.element(document).ready(function() {
            mainService.StartTooltip();
            $scope.showData = {
                a1 : {mode: "FadeIn", selector: ".container-formular", stepTime: 500, delayTime: 0}
            };
            mainService.ShowWebsite($scope.showData);
        });

        $scope.users = [];
        $scope.phpAtt = "?activation='"+$routeParams.code+"'";
        $http.get("../../php/users-getusers.php"+$scope.phpAtt).success(function(data) {
            $scope.$parent.users = data;
            $scope.$parent.user = $scope.$parent.users[0];
            $scope.$parent.user[10] = 2;
            $scope.$parent.HttpPost('../../php/users-activation.php',$scope.$parent.user);
        });

    }]);

    ///////////
    // LOGIN //
    ///////////

    app.controller('loginController', ['$scope', '$http', '$location', 'mainService', function($scope, $http, $location, mainService){

        $scope.$parent.menuRight = false;
        angular.element(document).ready(function() {
            mainService.StartTooltip();
            $scope.showData = {
                a1 : {mode: "FadeIn", selector: ".container-formular", stepTime: 500, delayTime: 0}
            };
            mainService.ShowWebsite($scope.showData);
        });

        $scope.$parent.getUsers();
        $scope.emailError = $scope.passwordError = $scope.activationError = false;

        $scope.Logged = function(index) {
            $scope.$parent.user = $scope.$parent.users[index];
            $scope.$parent.userAccess = $scope.$parent.users[index][9];
            $scope.$parent.userLogged = true;
            mainService.setCookie('Logged',$scope.$parent.user[1],'1','/','products-store.flash-developer.pl',false);            
            $location.path('#');
        };

        $scope.Login = function() {
            $scope.$parent.userLogged = false;
            $scope.users = [];
            $scope.phpAtt = "?email='"+$scope.user[1]+"'";
            $http.get("../../php/users-getusers.php"+$scope.phpAtt).success(function(data) {
                $scope.$parent.users = data;
                if ($scope.$parent.users[0] === undefined) {
                    $scope.emailError = true;
                } else if ($scope.$parent.users[0][10] < 2) {
                    $scope.activationError = true;
                } else if ($scope.$parent.users[0][2] == $scope.$parent.user[2]) {
                    $scope.Logged(0);
                } else {
                    $scope.passwordError = true;
                }

            });

        };

    }]);

    ///////////////////////
    // PASSWORD RECOVERY //
    ///////////////////////

    app.controller('passwordRecoveryController', ['$scope', '$http', '$location', 'mainService', function($scope, $http, $location, mainService){

        $scope.$parent.menuRight = false;
        angular.element(document).ready(function() {
            mainService.StartTooltip();
            $scope.showData = {
                a1 : {mode: "FadeIn", selector: ".container-formular", stepTime: 500, delayTime: 0}
            };
            mainService.ShowWebsite($scope.showData);
        });
        $scope.$parent.getUsers();
        $scope.$parent.recoveryError = false;

        $scope.PasswordRecovered = function(useer) {
            $scope.$parent.HttpPost('../../php/users-password-recovery.php',useer);
            $location.path('/login');
        };

        $scope.PasswordRecovery = function() {
            $scope.$parent.recoveryError = true;
            for (var i = 0; i < $scope.$parent.users.length; i++) {
                if ( $scope.$parent.users[i][1] === $scope.$parent.user[1] ) {
                    $scope.$parent.recoveryError = false;
                    $scope.PasswordRecovered($scope.$parent.users[i]);
                } 
            }
        };        

    }]);


})();
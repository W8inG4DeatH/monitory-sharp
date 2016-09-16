(function(){

    var app = angular.module('myControllers', ['myDirectives', 'myServices']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'views/home.html',
                label: 'Welcome'
            })
            .when('/gallery/:categoryAlias/:artAlias', {
                controller: 'galleryController',
                templateUrl: 'views/gallery.html',
                label: 'Gallery'
            })
            .when('/gallery/:categoryAlias', {
                controller: 'galleryController',
                templateUrl: 'views/gallery.html',
                label: 'Gallery'
            })
            .when('/gallery', {
                controller: 'galleryController',
                templateUrl: 'views/gallery.html',
                label: 'Gallery'
            })
            .when('/registration', {
                controller: 'registrationController',
                templateUrl: 'views/registration.html',
                label: 'Registration'
            })
            .when('/activation/:code', {
                controller: 'activationController',
                templateUrl: 'views/activation.html',
                label: 'Activation'
            })
            .when('/login', {
                controller: 'loginController',
                templateUrl: 'views/login.html',
                label: 'Login'
            })
            .when('/password-recovery', {
                controller: 'passwordRecoveryController',
                templateUrl: 'views/password-recovery.html',
                label: 'Password Recovery'
            })            
            .otherwise({
                redirectTo: '/home'
            });            

        $locationProvider
            .html5Mode(true);
            
    }]);

    app.controller('myController', ['$scope', '$http', '$window', '$location', '$anchorScroll', 'mainService', function($scope, $http, $window, $location, $anchorScroll, mainService) {

        // LOG SYSTEM

        $scope.user = [];
        $scope.user[13] = "";

        $scope.userLogged = false;
        $scope.userAccess = 0;
        $scope.menuRight = false;
        $scope.activeCategoryID = 0;
        $scope.activeArt = 1;

        $scope.HttpPost = function(phppath,phpdata,endMassage) {
            $http.post(phppath, { "data" : phpdata })
            .
            success(function(data, status) {
                $scope.status = status;
                $scope.data = data;
                $scope.result = data; // Show result from server in our <pre></pre> element
                if (endMassage) {
                    alert(endMassage);
                }
            })
            .
            error(function(data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });
        };        

        $scope.getUsers = function(id, email) {
            $scope.users = [];
            $scope.phpAtt = "";
            if (id) {
                $scope.phpAtt = "?id="+id;
            } else if (email) {
                $scope.phpAtt = "?email="+email;            
            }
            $http.get("../../php/users-getusers.php"+$scope.phpAtt).success(function(data) {
                $scope.users = data;
            });
        };

        $scope.Logout = function() {
            $scope.user = [];
            $scope.user[13] = "Anonymous";
            $scope.userAccess = 0;
            mainService.setCookie('Logged','','1','/','arts-store.flash-developer.pl',false);             
            $scope.userLogged = false;
        };

        // Earlier logged user detection
        $scope.CheckUserCookie = function() {
            $scope.userCookie = mainService.getCookie('Logged');
            if ($scope.userCookie !== null) {
                $scope.users = [];
                $scope.phpAtt = "?email='"+$scope.userCookie+"'";
                $http.get("../../php/users-getusers.php"+$scope.phpAtt).success(function(data) {
                    $scope.users = data;
                    if ($scope.users[0] !== undefined) {
                        $scope.user = $scope.users[0];
                        $scope.userAccess = $scope.user[9];
                        $scope.userLogged = true;
                        mainService.setCookie('Logged',$scope.user[1],'1','/','arts-store.flash-developer.pl',false);            
                    } 
                });
            }
        };
        $scope.CheckUserCookie();

        // ARTS - STORE

        $scope.galleryData = mainService.getGalleryData();
        $scope.colorsForSlider = ['#1e3557','#37342d','#83293b'];
        $scope.sliderCategoriesColors = [];
        $scope.sliderCategoriesImageNumbers = [];
        $scope.randomSlider = function() {
            for (var i=0; i<$scope.galleryData.length; i++) {
                $scope.sliderCategoriesColors[i] = $scope.colorsForSlider[mainService.GetRandomInt(0,$scope.colorsForSlider.length-1)];
                $scope.sliderCategoriesImageNumbers[i] = mainService.GetRandomInt(1,$scope.galleryData[i].arts.length);
            }
        };
        $scope.randomSlider();

        // START //

        $scope.showWebsiteData = {
            a1 : {mode: "AnimateWord", selector: ".logo > h1", word: "A R T S", stepTime: 75, delayTime: 0, fade: true},
            a2 : {mode: "AnimateWord", selector: ".logo > p", word: "S T O R E", stepTime: 33, delayTime: 0, fade: true},
            a3 : {mode: "FadeIn", selector: ".menu-center", stepTime: 500, delayTime: 0},
            a4 : {mode: "FadeIn", selector: ".menu-right", stepTime: 500, delayTime: 0},
            a5 : {mode: "FadeIn", selector: ".w8-slider", stepTime: 500, delayTime: 0},
            a6 : {mode: "FadeIn", selector: ".art-store-gallerries", stepTime: 500, delayTime: 0}
        };

        $(window).load(function() {
            $('.siteLoader').hide();
            mainService.StartTooltip();
            mainService.StartSlider("w8-slider1",$scope.galleryData.length,4000,1000);
            mainService.ShowWebsite($scope.showWebsiteData);
        });

        $scope.GoToSiteTop = function() {
            $location.hash('site-top');
            $anchorScroll();
        };

        $scope.GoToArt = function (categoryName,artNumber) {
            $scope.$parent.activeArt = artNumber;
            $location.path('/gallery/'+categoryName+'/'+$scope.$parent.activeArt);
            console.log('/gallery/'+categoryName+'/'+$scope.$parent.activeArt);
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
    // GALLERY //
    /////////////   

    app.controller('galleryController', ['$scope', '$routeParams', 'mainService', function($scope, $routeParams, mainService){

        $scope.$parent.menuRight = false;

        $scope.SetActiveCategory = function (categoryAlias, artAlias) {
            if (categoryAlias) {
                for (var i = 0; i < $scope.galleryData.length; i ++) {
                    if ($scope.galleryData[i].name === categoryAlias) {
                        $scope.$parent.activeCategoryID = i;
                    }
                }
            } else {
                $scope.$parent.activeCategoryID = 1;                
            }
            if (artAlias) {
                $scope.$parent.activeArt = artAlias;
            } else {
                $scope.$parent.activeArt = 1;
            }
        };
        $scope.SetActiveCategory($routeParams.categoryAlias,$routeParams.artAlias);

        $scope.AnimateGallery = function () {
            var showGalleryData = {
                a1 : {mode: "FadeIn", selector: ".gallery-show-1", stepTime: 500, delayTime: 0},
                a2 : {mode: "FadeIn", selector: ".gallery-show-2", stepTime: 500, delayTime: 0},
                a3 : {mode: "FadeIn", selector: ".gallery-show-3", stepTime: 500, delayTime: 0},
                a4 : {mode: "FadeIn", selector: ".gallery-show-4", stepTime: 500, delayTime: 0},
                a5 : {mode: "FadeIn", selector: ".gallery-show-5", stepTime: 500, delayTime: 0},
                a6 : {mode: "AnimateWord", selector: ".gallery-art-title > h4", word: $scope.$parent.galleryData[$scope.$parent.activeCategoryID].arts[$scope.$parent.activeArt-1].title, stepTime: 10, delayTime: 500, fade: false},
                a7 : {mode: "AnimateWord", selector: ".gallery-art-desc > p", word: $scope.$parent.galleryData[$scope.$parent.activeCategoryID].arts[$scope.$parent.activeArt-1].desc, stepTime: 1, delayTime: 500, fade: false}
            };
            mainService.ShowWebsite(showGalleryData);
        };

        $scope.NextArt = function () {
            if ($scope.$parent.activeArt < $scope.$parent.galleryData[$scope.$parent.activeCategoryID].arts.length) {
                $scope.$parent.activeArt++;
            }
            $scope.AnimateGallery();
        };
        $scope.PreviousArt = function () {
            if ($scope.$parent.activeArt > 1) {
                $scope.$parent.activeArt--;
            }
            $scope.AnimateGallery();
        };

        angular.element(document).ready(function() {
            $scope.AnimateGallery();
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
            mainService.setCookie('Logged',$scope.$parent.user[1],'1','/','arts-store.flash-developer.pl',false);            
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
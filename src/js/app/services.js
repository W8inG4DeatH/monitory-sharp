(function(){

    var app = angular.module('myServices', []);

    app.service('mainService', function () {
        var mainService = {};

        mainService.getGalleryData = function() {
            var galleryData = [
            {
                "name": "animals",
                "title": "multicellular, eukaryotic organisms",
                "desc": "All animals are motile, meaning they can move spontaneously and independently, at some point in their lives.",
                "landingArts": [1,2,3],
                "arts": [
                    {
                        "title": "Bears in forest",
                        "desc": "Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives. Although only eight species of bears are extant, they are widespread, appearing in a wide variety of habitats throughout the Northern Hemisphere and partially in the Southern Hemisphere. Bears are found on the continents of North America, South America, Europe, and Asia."
                    },
                    {
                        "title": "Bear attack",
                        "desc": "A bear attack is an attack by any mammal of the family Ursidae, on another animal, although it usually refers to bears attacking humans or domestic pets. Bear attacks are relatively rare, but frequent enough to be of concern for those who are in bear habitats. Bear attacks can be fatal and often hikers, hunters, fisherman, and others in bear country take precautions against bear attacks."
                    },
                    {
                        "title": "Eagle and the Wolves",
                        "desc": "The Eagle and The Wolves is a 2003 novel by Simon Scarrow, the fourth book in the Eagle Series where main characters Macro and Cato command two cohorts of soldiers made up of warriors and nobles from the Atrebatan kingdom. This book follows their adventures in 44 AD during the occupation of Britain by Rome and Caratacus's following rebellion."
                    },
                    {
                        "title": "Cat",
                        "desc": "The domestic cat is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines.[6] Cats are often valued by humans for companionship and for their ability to hunt vermin. There are more than 70 cat breeds."
                    },
                    {
                        "title": "White tigers",
                        "desc": "The white Bengal tigers are distinctive due to the color of their fur. The white fur caused by a lack of the pigment pheomelanin, which is found in Bengal tigers with orange color fur. When compared to Bengal tigers, the white Bengal tigers tend to grow faster and heavier than the orange Bengal tiger."
                    }
                ]
            },
            {
                "name": "history",
                "title": "knowledge acquired by investigation",
                "desc": "It is an umbrella term that relates to past events as well as the memory, discovery, collection, organization, presentation, and interpretation of information about these events.",
                "landingArts": [1,2,3],
                "arts": [
                    {
                        "title": "Gladiator",
                        "desc": "Gladiator was an armed combatant who entertained audiences in the Roman Republic and Roman Empire in violent confrontations with other gladiators, wild animals, and condemned criminals. Some gladiators were volunteers who risked their lives and their legal and social standing by appearing in the arena. Most were despised as slaves, schooled under harsh conditions, socially marginalized, and segregated even in death."
                    },
                    {
                        "title": "Ancient Rome",
                        "desc": "Ancient Rome was an Italic civilization that began on the Italian Peninsula as early as the 8th century BC. Located along the Mediterranean Sea and centered on the city of Rome, it expanded to become one of the largest empires in the ancient world[1] with an estimated 50 to 90 million inhabitants (roughly 20% of the world's population) and covering 6.5 million square kilometers (2.5 million sq mi) during its height between the first and second centuries."
                    },
                    {
                        "title": "Ancient Athens",
                        "desc": "Athens is one of the oldest named cities in the world, having been continuously inhabited for at least 5000 years. Situated in southern Europe, Athens became the leading city of Ancient Greece in the first millennium BC, and its cultural achievements during the 5th century BC laid the foundations of western civilization."
                    },
                    {
                        "title": "Ancient Persia",
                        "desc": "The history of Iran, commonly also known as Persia in the Western world, is intertwined with the history of a larger region, also to an extent known as Greater Iran, comprising the area from Anatolia, the Bosphorus, and Egypt in the west to the borders of Ancient India and the Syr Darya in the east, and from the Caucasus and the Eurasian Steppe in the north to the Persian Gulf and the Gulf of Oman in the south."
                    },
                    {
                        "title": "French Revolution",
                        "desc": "The French Revolution overthrew the monarchy, established a republic, experienced violent periods of political turmoil, and finally culminated in a dictatorship under Napoleon that rapidly brought many of its principles to Western Europe and beyond. Inspired by liberal and radical ideas, the Revolution profoundly altered the course of modern history, triggering the global decline of absolute monarchies while replacing them with republics and liberal democracies."
                    },
                    {
                        "title": "Monarch",
                        "desc": "A monarch is the sovereign head of state in a monarchy. A monarch may exercise the highest authority and power in the state, or others may wield that power on behalf of the monarch. Typically a monarch either personally inherits the lawful right to exercise the state's sovereign rights (often referred to as the throne or the crown) or is selected by an established process from a family or cohort eligible to provide the nation's monarch."
                    }
                ]
            },
            {
                "name": "nature",
                "title": "broadest sense",
                "desc": "Although humans are part of nature, human activity is often understood as a separate category from other natural phenomena.",
                "landingArts": [1,2,3],
                "arts": [
                    {
                        "title": "Sea bay",
                        "desc": "A bay is a body of water connected to an ocean or lake, formed by an indentation of the shoreline. A large bay may be called a gulf, a sea, a sound, or a bight. A cove is a smaller circular or oval coastal inlet with a narrow entrance; some coves may be referred to as bays. A fjord is a particularly steep bay shaped by glacial activity."
                    },
                    {
                        "title": "Bird",
                        "desc": "Birds (Aves) are a group of endothermic vertebrates, characterised by feathers, toothless beaked jaws, the laying of hard-shelled eggs, a high metabolic rate, a four-chambered heart, and a lightweight but strong skeleton. They rank as the class of tetrapods with the most living species, at approximately ten thousand, with more than half of these being passerines, sometimes known as perching birds or, less accurately, as songbirds."
                    },
                    {
                        "title": "Moon",
                        "desc": "The Moon is thought to have formed approximately 4.5 billion years ago, not long after Earth. There are several hypotheses for its origin; the most widely accepted explanation is that the Moon formed from the debris left over after a giant impact between Earth and a Mars-sized body called Theia."
                    },
                    {
                        "title": "Red tree",
                        "desc": "In botany, a tree is a perennial plant with an elongated stem, or trunk, supporting branches and leaves in most species. In some usages, the definition of a tree may be narrower, including only woody plants with secondary growth, plants that are usable as lumber or plants above a specified height."
                    },
                    {
                        "title": "Lake town",
                        "desc": "Lake Town is a posh neighbourhood in north Kolkata, in Indian state of West Bengal. The area comes under the jurisdiction of South Dum Dum Municipality. The neighbourhood was developed in a planned manner after the Independence of India. Today, it is one of the important food and leisure hub in North Kolkata, having many international fast food chains and a cinema hall."
                    }
                ]
            },
            {
                "name": "vehicles",
                "title": "mobile machines",
                "desc": "Typical vehicles include wagons, bicycles, motor vehicles (motorcycles, cars, trucks, buses), railed vehicles (trains, trams), watercraft (ships, boats), aircraft and spacecraft.",
                "landingArts": [1,2,3],
                "arts": [
                    {
                        "title": "Street tramcar",
                        "desc": "A tram (also known as tramcar; and in North America known as streetcar, trolley or trolley car) is a rail vehicle which runs on tracks along public urban streets, and also sometimes on a segregated right of way. The lines or networks operated by tramcars are called tramways. Tramways powered by electricity, the most common type historically, were once called electric street railways."
                    },
                    {
                        "title": "Battleships",
                        "desc": "A battleship is a large armored warship with a main battery consisting of heavy caliber guns. During the late 19th and early 20th centuries the battleship was the most powerful type of warship, and a fleet of battleships was vital for any nation that desired to maintain command of the sea."
                    },
                    {
                        "title": "Cabriolet",
                        "desc": "A convertible or cabriolet is an automobile body style that can convert between an open-air mode and an enclosed one, varying in degree and means by model. Convertibles evolved from the earlier phaeton, an open vehicle without glass side windows that may have had removable panels of fabric or other material for protection from the elements."
                    },
                    {
                        "title": "Sailing",
                        "desc": "Sailing comprises wind propulsion of a craft by means of sails and steering it over water, ice or land, depending on the type of craft. A sailor manages the force of the wind on the sails by adjusting their angle with respect to the moving sailing craft and sometimes by adjusting the sail area."
                    },
                    {
                        "title": "Train",
                        "desc": "A train is a form of rail transport consisting of a series of vehicles that usually runs along a rail track to transport cargo or passengers. Motive power is provided by a separate locomotive or individual motors in self-propelled multiple units. Although historically steam propulsion dominated, the most common modern forms are diesel and electric locomotives, the latter supplied by overhead wires or additional rails."
                    }
                ]
            }
            ];
            return galleryData;
        };

        ////////////////////////////////////////////////////////////////////////////////////////////

        mainService.setCookie = function(name, value, days, path, domain, secure) {   // secure - tylko na https
            if(!navigator.cookieEnabled) return;    // zakończenie funkcji, jeśli przeglądarka nie wspiera cookies
            var euc = encodeURIComponent;       
            var cookie = euc(name) + "=" + euc(value);
            if(typeof days === "number") {
                var date = new Date();
                date.setTime(date.getTime() + days * 1000 * 60 * 60 * 24);
                cookie += "; expires=" + date.toGMTString();
            }
            if(path) {
                cookie += "; path=" + path;
            }
            if(domain) {
                cookie += "; domain=" + domain;
            }
            if(secure) {
                cookie += "; secure;";
            }
            document.cookie = cookie;
        };

        mainService.getCookie = function(name) {
            if(!document.cookie) return null;
            var arr = document.cookie.split(/; */),
                cookies = {};
            arr.forEach(function(cookie) {
                cookie = cookie.split("=");
                cookies[cookie[0]] = decodeURIComponent(cookie[1]);
            });
            return cookies[name] || null;
        };

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
                    this.panelPoints[this.activeSlide].src = "img/w8-slider/w8-slider-pointempty.png";
                    this.activeSlide = numberOfSlide;
                    $(this.mySlides[this.activeSlide]).animate({opacity: 1}, 1000);
                    this.panelPoints[this.activeSlide].src = "img/w8-slider/w8-slider-pointfull.png";
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

        return mainService;
    });


})();
class Movie {

    constructor() {
        this.actors = {};
        this.tweens = {};
        this.dragState = false;

        // Ensure these elements exist in your included celeb.html
        this.actors.svg = document.querySelector('#main');
        this.actors.shadow = document.querySelector('#shadow');
        this.actors.greeting = document.querySelector('#greeting');
        this.actors.partyHat = document.querySelector('#party-hat');
        this.actors.balloon = document.querySelector('#balloon');
        this.actors.balloonString = document.querySelector('#balloon-string');
        this.actors.hatConfettiGroup = document.querySelector('#hat-confetti');
        this.actors.hatConfettiLeft = this.actors.hatConfettiGroup ? this.actors.hatConfettiGroup.querySelectorAll('circle.left') : [];
        this.actors.hatConfettiRight = this.actors.hatConfettiGroup ? this.actors.hatConfettiGroup.querySelectorAll('circle.right') : [];
        this.actors.balloonConfetti = document.querySelector('#balloon-confetti');
        this.actors.balloonConfettiLeft = this.actors.balloonConfetti ? this.actors.balloonConfetti.querySelectorAll('circle.left') : [];
        this.actors.balloonConfettiRight = this.actors.balloonConfetti ? this.actors.balloonConfetti.querySelectorAll('circle.right') : [];
        this.actors.gopher = document.querySelector('#gopher');
        this.actors.gopherRightEye = this.actors.gopher ? this.actors.gopher.querySelector('#go-right-eye') : null;
        this.actors.gopherLeftEye = this.actors.gopher ? this.actors.gopher.querySelector('#go-left-eye') : null;
        this.actors.gopherLeftHand = this.actors.gopher ? this.actors.gopher.querySelector('#go-left-hand') : null;
        this.actors.gopherEyeBlinks = this.actors.gopher ? this.actors.gopher.querySelectorAll('.eye-blink') : [];
        this.actors.gopherPupils = this.actors.gopher ? this.actors.gopher.querySelectorAll('.pupils') : [];

        // Only start eye follow if the required elements are found
        if (this.actors.gopherPupils.length > 0) {
             this._startEyes();
        }
    }

    _startEyes() {
        // start eye blinks...
        this.tweens.gopherEyeBlinks = TweenMax.to(this.actors.gopherEyeBlinks, 0.6, 
            {repeat: -1, autoAlpha: 0, repeatDelay: 1, ease: SteppedEase.config(1) });

        // ...and also the pupils' mouse follow
        var stage = Snap(this.actors.svg);
        stage.mousemove((e) => {
            var radius = 28,
                xoff = 25,
                mx = e.clientX,
                my = e.clientY,
                gopherX = this.actors.gopher.getBBox().x + this.actors.gopher.getCTM().e,
                gopherY = this.actors.gopher.getBBox().y + this.actors.gopherRightEye.getBBox().height + this.actors.gopher.getCTM().f,
                flip = (mx < gopherX) ? -1 : 1,
                deg = ( Math.atan((my - gopherY) / (mx - gopherX)) ),
                dy = radius * Math.sin(deg) * flip,
                dx = radius * Math.cos(deg) * flip + xoff;

            TweenMax.set(this.actors.gopherPupils, { x: dx, y: dy, transformOrigin: 'center center'});

        });
    }
    _redrawString() {
        var hand = this.actors.gopherLeftHand,
            balloon = this.actors.balloon;

        if (!hand || !balloon) return; // Safety check

        var knot = document.querySelector('#balloon-knot');
        if (!knot) return; // Safety check
        
        var knotBox = knot.getBBox();
        var knotTransform = knot.getCTM();

        var start = { x: hand.getBBox().x-212, y: hand.getBBox().y+130 };

        var end = {
            x: knotBox.x + knotTransform.e + knotBox.width/2,
            y: knotBox.y + knotTransform.f + knotBox.height/2
        };

        var control = { x: start.x + (Math.abs(end.x - start.x)*1.2), y: start.y - (Math.abs(end.y - start.y)*.4) }

        var newArc = Snap(this.actors.balloonString);
        var pathStr = "M" + start.x + "," + start.y + " Q" + control.x + "," + control.y + " " + end.x + "," + end.y;
        newArc.attr({path: pathStr });
    }

    _balloonDrag(me) {
        TweenMax.set(me.actors.balloonString, {strokeDasharray: 0});
        var tween = Draggable.create(me.actors.balloon, {
            type: 'x,y',
            throwProps: true,
            onClick: (e) => {
                console.log('started dragging...');
            },
            onDragStart: function(e) {
                me.dragState = true;
            },
            onDrag: function(e) {
                //console.log(e);
                me._redrawString();

                var confetti = [...me.actors.balloonConfettiLeft, ...me.actors.balloonConfettiRight];

                var dx = me.actors.balloon.getCTM().e + me.actors.balloon.getBBox().width*0.1,
                    dy = me.actors.balloon.getCTM().f + me.actors.balloon.getBBox().height*0.1;

                TweenMax.staggerTo(confetti, 1, {x: dx, y: dy, ease: Power4.easeOut }, 0.01);
            },
            onDragEnd: function(e) {
                me.dragState = false;
            }
        });
    }

    setStage() {
        console.log('clear stage...');
        var actors = this.actors;
        var clearTl = new TimelineMax();

        clearTl
            .set(actors.greeting, {autoAlpha: 0})
            .set([actors.hatConfettiLeft,actors.hatConfettiRight], {autoAlpha:0})
            .set([actors.balloonConfettiLeft,actors.balloonConfettiRight], {autoAlpha:0})
            // celeb.js: setStage() method
            // ...
            .set(actors.partyHat, {autoAlpha:0, scale: 0.2, transformOrigin: '50% 50%'})
            .set(actors.balloon, {autoAlpha:0, scale: 0.1, transformOrigin: 'bottom center'})
            .set(actors.balloonString, {autoAlpha: 0.6})
            // ...
        ;
        
        this._redrawString();   //get rid of my initial squiggle

        return clearTl;
    }
    enterPartyHat() {
        console.log('enter party hat...');
        var actors = this.actors;
        var hatTl = new TimelineMax({ delay: 1.5 });

        hatTl
            .fromTo(actors.partyHat, 0.6, {scale:0.2}, {scale:1, autoAlpha:1, ease: Elastic.easeInOut })
            .add('hat')
            .staggerFromTo(actors.hatConfettiLeft, 1, {x: '+=50', scale:0.05}, 
                                                        {x: 0, scale: 1, autoAlpha: 1, ease: Power4.easeOut }, 0.01, 'hat-=0.4')
            .staggerFromTo(actors.hatConfettiRight, 1, {x: '-=50', scale:0.05}, 
                                                        {x: 0, scale: 1, autoAlpha: 1, ease: Power4.easeOut }, 0.01, 'hat-=0.4')
            .add('confetti')
            .staggerTo(actors.hatConfettiLeft, 10, {x: '-=50', autoAlpha: 0}, 0.01, 'confetti-=0.6')
            .staggerTo(actors.hatConfettiRight, 10, {x: '+=50', autoAlpha: 0}, 0.01, 'confetti-=0.6')
        ;

        return hatTl;
    }
    enterBalloon() {
        console.log('enter balloon ...');
        var actors = this.actors;
        var balloonTl = new TimelineMax();

        var slength = actors.balloonString ? Math.ceil(actors.balloonString.getTotalLength()) : 0;
        TweenMax.set(actors.balloonString, {strokeDasharray: slength, strokeDashoffset: slength});

        balloonTl
            .to(actors.balloonString, 0.4, {strokeDashoffset: 0, ease: Linear.easeNone })
            .fromTo(actors.balloon, 1, {scale:0.1}, {scale:1, autoAlpha:1, ease: Elastic.easeInOut}, '-=0.3')
            .add('balloon')
            .staggerFromTo(actors.balloonConfettiLeft, 1.4, {x: '+=50', scale:0.05}, 
                                                        {x: 0, scale: 1, autoAlpha: 0.9, ease: Power4.easeOut }, 0.01, 'balloon-=0.5')
            .staggerFromTo(actors.balloonConfettiRight, 1.4, {x: '-=50', scale:0.05}, 
                                                        {x: 0, scale: 1, autoAlpha: 0.9, ease: Power4.easeOut }, 0.01, 'balloon-=0.5')
            .add('confetti')
            .staggerTo(actors.balloonConfettiLeft, 10, {x: '-=20', autoAlpha: 0.7}, 0.01, 'confetti-=0.6')
            .staggerTo(actors.balloonConfettiRight, 10, {x: '+=20', autoAlpha: 0.7}, 0.01, 'confetti-=0.6')

        ;

        return balloonTl;
    }
    _followBalloonString() {
        // Continuously update balloon string
        TweenMax.ticker.addEventListener("tick", () => {
            this._redrawString();
        });
    }

    enterGreeting() {
        console.log('enter greeting ...');
        var actors = this.actors;
        var greetTl = new TimelineMax();

        greetTl
            .to(actors.greeting, 1, {autoAlpha: 1, onComplete: this._balloonDrag, onCompleteParams: [this]});

        return greetTl;
    }

    go() {
        console.log('go...');

        var masterTl = new TimelineMax();

        masterTl
            .add(this.setStage(), 'scene-clear')
            .add(this.enterPartyHat(), 'scene-hat')
            // *** FIX: Corrected the negative offsets to start right after the hat animation finishes (or overlaps slightly) ***
            // The value '+=0' means start this timeline immediately after the previous one finishes.
            .add(this.enterBalloon(), 'scene-hat+=0.5', 'scene-balloon') 
            .add(this.enterGreeting(), 'scene-balloon+=0', 'scene-greeting') 
            // Or you could make them appear at the same time:
            // .add(this.enterBalloon(), 'scene-hat+=0.5') 
            // .add(this.enterGreeting(), 'scene-hat+=0.5') 
            
        ;
    }

}

var movie = new Movie();
movie.go();

movie.actors.greeting.addEventListener('click', function(evt){
    console.log('opening go blog...');
    window.open('https://blog.golang.org/6years');
});

// The card.js logic is kept here as it was provided:
$(document).ready(function () {
    $('.container').mouseenter(function () {
        $('.card').stop().animate({
            top: '-90px'
        }, 'slow');
    }).mouseleave(function () {
        $('.card').stop().animate({
            top: '5px'
        }, 'slow');
    });
});
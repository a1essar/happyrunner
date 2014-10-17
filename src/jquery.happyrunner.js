/* ========================================================================
 * HappyRunner: happyrunner.js v0.1
 * ========================================================================
 * Copyright 2013 Happycms.ru
 * ======================================================================== 
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('happyrunner', ['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.happyrunner = function( options ) {  
        var $this
        ,   el = '.js__happyrunner-link'
        ,   elActive = '.js__happyrunner-link.active'
        ,   runner = '.js__happyrunner-runner'
        ,   $el
        ,   $elActive
        ,   $runner
        ,   elProp = []
        ;
        
        var settings = $.extend( {
            fixedWidth: false,
            fixedHeight: false,
            outerWidth: true,
            outerHeight: true,
            runnerCentering: false,
            animateDelay: 600,
            animateEasing: 'swing',
            callback: function() {},
        }, options);
        
        function init(){
            $this = $(this)
            ,   $el = $this.find(el)
            ,   $elActive = $this.find(elActive)
            ,   $runner = $this.find(runner)
            ;

            $el.on('mouseover.happyrunner', runnerGo);
            $this.on('mouseleave.happyrunner', runnerBack);
            $this.trigger('mouseleave.happyrunner');
            
            return this;
        };
        
        function runnerGo(){
            $thisEl = $(this)
            ,   $el = $this.find(el)
            ,   $elActive = $this.find(elActive)
            ,   $runner = $this.find(runner)
            
            ,   elProp['width'] = (settings.outerWidth) ? $thisEl.outerWidth(true) : $thisEl.width()
            ,   elProp['height'] = (settings.outerHeight) ? $thisEl.outerHeight(true) : $thisEl.height()
            ,   elProp['top'] = $thisEl.position().top
            ,   elProp['left'] = $thisEl.position().left
            ,   elProp['runner-width'] = $runner.outerWidth()
            ,   elProp['runner-height'] = $runner.outerHeight()
            ,   elProp['color'] = ($thisEl.is('[data-happyrunner-color]')) ? $thisEl.attr('data-happyrunner-color') : false
            ;       

            $el.removeClass('hover');
            $thisEl.addClass('hover');
            
            animate();    
        }
        
        function runnerBack(){ 
            $el = $this.find(el)
            ,   $elActive = $this.find(elActive)
            ,   $thisEl = $elActive
            ,   $runner = $this.find(runner)
            
            ,   elProp['width'] = (settings.outerWidth) ? $thisEl.outerWidth(true) : $thisEl.width()
            ,   elProp['height'] = (settings.outerHeight) ? $thisEl.outerHeight(true) : $thisEl.height()
            ,   elProp['top'] = $thisEl.position().top
            ,   elProp['left'] = $thisEl.position().left
            ,   elProp['runner-width'] = $runner.outerWidth()
            ,   elProp['runner-height'] = $runner.outerHeight()
            ,   elProp['color'] = ($thisEl.is('[data-happyrunner-color]')) ? $thisEl.attr('data-happyrunner-color') : false
            ;       
            
            $el.removeClass('hover');
            $thisEl.addClass('hover');
            
            animate();    
        }

        function animate(){
            setTimeout(function(){
                settings.callback($this);
            }, settings.animateDelay);
            
            if(typeof Modernizr != 'undefined' && Modernizr.csstransitions && elProp['color']){
                $runner.css('background-color', elProp['color']).css('color', elProp['color']).css('border-color', elProp['color']);    
            }
            
            /* 1) высота элемента, ширина элемента, горизонатальный отступ, вертикальный отступ */
            if(settings.fixedWidth == false && settings.fixedHeight == false && settings.runnerCentering == false){
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                    $runner.css('transform', 'translate3d('+elProp['left']+'px,'+elProp['top']+'px,0)').css('width', elProp['width']).css('height', elProp['height']); 
                    return true; 
                }   
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $runner.css('transform', 'translate('+elProp['left']+'px,'+elProp['top']+'px)').css('width', elProp['width']).css('height', elProp['height']); 
                    return true;
                } 
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                    $runnercss.css('left', elProp['left']).css('top', elProp['top']).css('width', elProp['width']).css('height', elProp['height']); 
                    return true;
                }
                
                $runner.animate({'left': elProp['left'], 'top': elProp['top'], 'width': elProp['width'], 'height' : elProp['height']}, settings.animateDelay, settings.animateEasing, function(){
                    return true;     
                }); 
            } 
            
            /* 2) фикс. высота, ширина элемента, горизонатальный отступ, вертикальный отступ */
            if(settings.fixedWidth == false && settings.fixedHeight == true && settings.runnerCentering == false){
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                    $runner.css('transform', 'translate3d('+elProp['left']+'px,'+elProp['top']+'px,0)').css('width', elProp['width']); 
                    return true;                         
                }
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $runner.css('transform', 'translate('+elProp['left']+'px,'+elProp['top']+'px)').css('width', elProp['width']); 
                    return true;
                } 
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                    $runnercss.css('left', elProp['left']).css('top', elProp['top']).css('width', elProp['width']); 
                    return true;
                }
                
                $runner.animate({'left': elProp['left'], 'top': elProp['top'], 'width': elProp['width']}, settings.animateDelay, settings.animateEasing, function(){
                    return true;     
                }); 

            } 
            
            /* 3) высота, фикс. ширина элемента, горизонатальный отступ, вертикальный отступ */
            if(settings.fixedWidth == true && settings.fixedHeight == false && settings.runnerCentering == false){
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                    $runner.css('transform', 'translate3d('+elProp['left']+'px,'+elProp['top']+'px,0)').css('height', elProp['height']); 
                    return true;                      
                }
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $runner.css('transform', 'translate('+elProp['left']+'px,'+elProp['top']+'px)').css('height', elProp['height']); 
                    return true;
                } 
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                    $runnercss.css('left', elProp['left']).css('top', elProp['top']).css('height', elProp['height']); 
                    return true;
                }
                
                $runner.animate({'left': elProp['left'], 'top': elProp['top'], 'height' : elProp['height']}, settings.animateDelay, settings.animateEasing, function(){
                    return true;     
                }); 
   
            } 
            
            /* 4) фикс. высота, фикс. ширина элемента, горизонатальное центрирование */
            if(settings.fixedWidth == true && settings.fixedHeight == true && settings.runnerCentering == 'horizontal'){
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                    $runner.css('transform', 'translate3d('+parseInt( elProp['left'] + (elProp['width'])/2 - (elProp['runner-width'])/2)+'px,0,0)'); 
                    return true;       
                }
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $runner.css('transform', 'translate('+parseInt( elProp['left'] + (elProp['width'])/2 - (elProp['runner-width'])/2)+'px,0)'); 
                    return true;
                } 
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                    $runnercss.css('left', parseInt( elProp['left'] + (elProp['width'])/2 - (elProp['runner-width'])/2)); 
                    return true;
                }
                
                $runner.animate({'left': parseInt( elProp['left'] + (elProp['width'])/2 - (elProp['runner-width'])/2)}, settings.animateDelay, settings.animateEasing, function(){
                    return true;     
                }); 
            } 
            
            /* 5) фикс. высота, фикс. ширина элемента, вертикальное центрирование */
            if(settings.fixedWidth == true && settings.fixedHeight == true && settings.runnerCentering == 'vertical'){
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                    $runner.css('transform', 'translate3d(0,'+parseInt( elProp['top'] + (elProp['height'])/2 - (elProp['runner-height'])/2)+'px,0)'); 
                    return true;                     
                }    
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $runner.css('transform', 'translate(0,'+parseInt( elProp['top'] + (elProp['height'])/2 - (elProp['runner-height'])/2)+'px)'); 
                    return true;
                } 
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                    $runnercss.css('top', parseInt( elProp['top'] + (elProp['height'])/2 - (elProp['runner-height'])/2)); 
                    return true;
                }
                
                $runner.animate({'top': parseInt( elProp['top'] + (elProp['height'])/2 - (elProp['runner-height'])/2)}, settings.animateDelay, settings.animateEasing, function(){
                    return true;     
                });
            } 
            
            /* 6) фикс. высота, фикс. ширина элемента, горизонатальный отступ, вертикальный отступ */
            if(settings.fixedWidth == true && settings.fixedHeight == true && settings.runnerCentering == false){
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms3d && Modernizr.csstransitions){
                    $runner.css('transform', 'translate3d('+elProp['left']+'px,'+elProp['top']+'px,0)'); 
                    return true;    
                }    
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransforms && Modernizr.csstransitions){
                    $runner.css('transform', 'translate('+elProp['left']+'px,'+elProp['top']+'px)'); 
                    return true;
                } 
                
                if(typeof Modernizr != 'undefined' && Modernizr.csstransitions){
                    $runnercss.css('left', elProp['left']).css('top', elProp['top']); 
                    return true;
                }
                
                $runner.animate({'left': elProp['left'], 'top': elProp['top']}, settings.animateDelay, settings.animateEasing, function(){
                    return true;     
                }); 
            } 
        }
        
        $(window).on('load resize orientationchange', function(){
            $this.trigger('mouseleave.happyrunner'); 
        });
        
        return this.each(init);
    };
}));

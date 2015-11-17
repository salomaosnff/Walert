/**
 * Created by Salomão on 15/11/2015.
 */
var Walert = function(options){
    var self=this;

    if((typeof $ == 'undefined') || (typeof jQuery == 'undefined')){
        throw new Error('jQuery é requerido!');
    }else if(typeof options == 'object'){
        var padrao = {
            "title"      : "",
            "icon"       : "",
            "body"       : "",
            "time"       : 5000,
            "date"       : new Date(),
            "easeTime"   : 250,
            "onOpen"     : function(){return false;},
            "onClose"    : function(){return false;},
            "onClick"    : function(){return false;},
            "onHoverIn"  : function(){return false;},
            "onHoverOut" : function(){return false;}
        },
            config,
            box = $("#walert-box"),
            style = $('<style id="walert-style">' +
                '#walert-box{' +
                'position: fixed;' +
                'bottom: 0;' +
                'right:0;' +
                'list-style:none;' +
                'margin:0;' +
                'padding:0;' +
                'box-sizing:border-box;' +
                'font-family:Arial;' +
                '}' +

                '#walert-box li{' +
                'display:block;' +
                'background:#fff;' +
                'color:#333;' +
                'font-size:88%;' +
                'min-height:64px;' +
                'max-height:256px;' +
                'width:370px;' +
                'margin-bottom: 8px;' +
                'box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);' +
                'cursor:pointer;' +
                'border-radius: 2px;' +
                'overflow: hidden;' +
                'transition: all .25s ease-out, opacity .1ms;' +
                '}' +

                '#walert-box li .close{' +
                'float:right;' +
                'width:20px;' +
                'height:20px;' +
                'text-align:center;' +
                'line-height:1.45;' +
                'cursor:pointer;' +
                'opacity:.25;' +
                'transition:all .25s ease-in;' +
                'margin:4px;' +
                'position: relative;' +
                '}' +

                '#walert-box li .close:before,' +
                '#walert-box li .close:after{' +
                'content: "";' +
                'display: block;' +
                'width: 2px;' +
                'height:75%;' +
                'background: #ff4472;' +
                'position: absolute;' +
                'left:50%;' +
                'transform: rotate(45deg);' +
                '}' +

                '#walert-box li .close:after{transform: rotate(-45deg);}' +
                '#walert-box li:hover{box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);}' +
                '#walert-box li:hover .close{opacity:1;}' +

                '#walert-box li img.icon{' +
                'width:80px;' +
                'height:80px;' +
                'background:#eee;' +
                'float:left;' +
                '}' +

                '#walert-box li .content{' +
                'margin-left:88px;' +
                'margin-right:0;' +
                'min-height: 64px;' +
                'padding: 8px 0;' +
                '}' +

                '#walert-box li .content p.body{' +
                'margin:0;' +
                'padding:8px 0;' +
                '}' +
                '#walert-box li .content .time{' +
                'display:block;' +
                'opacity:.5;' +
                'text-align:right;' +
                'margin-right:8px;' +
                '}' +
                '#walert-box li .content .botoes{' +
                'display: flex;' +
                'flex-direction: row;' +
                'margin-top:8px;' +
                '}' +

                '#walert-box li .content .botoes .btn{' +
                'flex: 1;' +
                'display: inline-block;' +
                'position: relative;' +
                'width: 120px;' +
                'height: 32px;' +
                'text-align: center;' +
                'margin-right: 8px;' +
                'line-height: 32px;' +
                'border-radius: 2px;' +
                'font-size: 0.9em;' +
                'background-color: #4285f4;' +
                'color: #fff;' +
                '}' +
                '</style>'), to;
        if($("#walert-style").length<=0){
            style.appendTo('head');
        }
        if(box.length <= 0){
            $('<ul id="walert-box"></ul>').appendTo('body');
            box = $('#walert-box');
        }
        self.item = $('<li><span class="close"></span><img src="#" alt="icone" class="icon"><div class="content"><strong class="title"></strong><p class="body"></p></div><span class="time"></span></li>');
        config = $.extend(padrao, options);

        if(typeof config.title == 'string'){
            self.item.find('.title').html(config.title);
        }
        if(typeof config.icon == 'string'){
            self.item.find('.icon').attr('src',config.icon);
        }
        if(typeof config.body == 'string'){
            self.item.find('.body').html(config.body);
        }
        if(typeof config.date == 'string'){
            self.item.find('.time').html(config.date);
        }

        self._height = function(a){
            var item = box.find('li');
            var height = 0;
            item.each(function(i, el){
                height += $(el).outerHeight()+8;
            });
            if(a){
                box.animate({
                    'height' : height
                }, config.easeTime, function(){
                    $(this).css('height','auto')
                });
            }else{
                box.css('height','auto');
            }
        };
        self._close = function(){

            self.item.fadeOut(500, function(){
                $(this).css({'opacity':'0','display':'block'}).animate({
                    'margin-bottom':'0',
                    'height':'0',
                    'min-height':'0',
                    'max-height':'0'
                }, config.easeTime, "linear", function(){
                    setTimeout("$(this).remove()",1);
                    if(typeof config.onClose == 'function'){
                        config.onClose();
                    }
                })
            });

        };
        self._open = function(){
            self.item.appendTo(box).fadeOut(0);
            self._height(true);
            self.item.fadeIn(500);
            self.item.find('.close').on('click',self._close);
            to = setTimeout(self._close,config.time);

            var evento = self.item.find('.icon, .content');
            //Evento Open
            if(typeof config.onOpen == 'function'){
                config.onOpen();
            }

            //Evento HoverIn
            self.item.on('mouseenter',function(){
                if(to){
                    to = clearTimeout(to);
                }

                if(typeof config.onHoverIn == 'function'){
                    config.onHoverIn();
                }
            });

            //Evento Click
            if(typeof config.onClick == 'function'){
                evento.on('click',config.onClick);
            }
            //Evento HoverOut
            self.item.on('mouseleave',function(){
                if(!to){
                    to = setTimeout(self._close,config.time);
                }

                if(typeof config.onHoverOut == 'function'){
                    config.onHoverOut();
                }
            });

        };
        self._open();

        return config;

    }else{
        throw new Error('Parêmetro inválido!');
    }
};

window.Walert = Walert;

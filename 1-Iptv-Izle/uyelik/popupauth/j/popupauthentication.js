'use strict';

var TMDAuthentication = {
    EventSetted : false,
	Config: {
		webSiteId: '',
		callback: function(user){},
		cookieExpireDays: 1
	},
    ShowLoginPopup: function(settings) {
		this.ShowPopup('login', settings);
	},
    ShowRegisterPopup: function(settings) {
		this.ShowPopup('register', settings);
	},
	ShowEditPopup: function(settings) {
		this.ShowPopup('edit', settings);
	},
	ShowLostPasswordPopup: function(settings) {		
		this.ShowPopup('lost-password', settings);
	},
	ShowActivationPopup: function(settings) {
		this.ShowPopup('activation', settings);
	},
	ShowPopup: function(page, settings)
	{
        this.Config = this.Extend(this.Config, settings);
		var css = document.createElement('style');
		css.innerHTML = `
			@charset "utf-8";
			html.overlock,
			html.overlock body {overflow:hidden;}

			.pmsBox_overlay {position:fixed;width:100%;height:100%;display:none;top:0;left:0;background:rgba(0,0,0,0.5);z-index:999999; opacity: 0; visibility: hidden;
				-webkit-transition: all .5s ease;
				transition: all .5s ease;
			}
			.pmsBox_overlay.show {display: block; opacity: 1; visibility: visible;}
			.pmsBox_centerWrap{display:table;position:absolute;width:100%;height:100%}
			.pmsBox_centerer{display:table-cell;vertical-align:middle}
			.pmsBox_centerer iframe{width:95%;display:table;margin:0 auto;position:relative}
			.pmsBox_contentWrap{width:100%; height: 100%; margin:0 auto;position:relative}
			.pmsBox_scaleWrap{position:relative;height:100%;width:100%;background-color: #fff;}
			.pmsBox_centerer iframe{position:absolute;top:0;border:0;outline:0;left:0;width:100%;height:100%}
			.pmsBox_closeBtn{width: 40px; height: 40px; z-index:2;position:absolute;right:0; top:0; background: #fff url('https://uyelik.tmgrup.com.tr/c/popupauth/i/close.png') center center no-repeat; cursor: pointer;}
			@media (min-width: 576px) {
				.pmsBox_contentWrap {width: 580px; height: 750px; overflow: hidden;
					box-shadow: 1px 1px 10px rgb(0 0 0 / 37%)!important;
					border-radius: 10px!important;
				}
			}
		`;
		document.head.appendChild(css);
		var boxCode = '<div class="pmsBox_overlay">';
		boxCode +='<div class="pmsBox_centerWrap">';
		boxCode +='<div class="pmsBox_centerer">';

		document.body.insertAdjacentHTML('beforeend', boxCode);

		var htmlBody = document.querySelector('html'),
			dataPopup = document.querySelectorAll('[data-mspopup]'),
			pmsOverlay = document.querySelector('.pmsBox_overlay'),
			pmsCenterer = document.querySelector('.pmsBox_centerer');
		
		htmlBody.classList.add('overlock');
		pmsOverlay.classList.add('show'); 
        var iframeUrl = 'https://uyelik.tmgrup.com.tr/popup/' + page + '/' + this.Config.webSiteId;
        if(page == 'edit')
        {
            iframeUrl += '?auth=' + this.GetCookie('.Auth');
        }
		var creativeCode =  '<div class="pmsBox_contentWrap">';
			creativeCode +=  '<div class="pmsBox_scaleWrap">';
			creativeCode +=  '<div class="pmsBox_closeBtn"></div>';
			creativeCode +=  '<iframe class="pms-frame" src="' + iframeUrl + '" allowtransparency="1" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe>';
			creativeCode +=  '</div>';
			creativeCode +=  '</div>';				
		pmsCenterer.innerHTML =  creativeCode;
		var pmsFrame = document.querySelector('.pms-frame');				
		pmsFrame.addEventListener("click", function(e) {
			e.stopPropagation();		        
		});		
		pmsOverlay.addEventListener("click", function(e) {
			e.preventDefault();			
			var pmsContent = document.querySelector('.pmsBox_contentWrap');
			pmsContent.remove('overlock');
			htmlBody.classList.remove('overlock');
			pmsOverlay.classList.remove('show');			
		});
		
        if(window.TMDAuthentication.EventSetted === false)
        {
            window.TMDAuthentication.EventSetted = true;
		    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
		    var eventer = window[eventMethod];
		    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

		    eventer(messageEvent, function(e) {
			    var key = e.message ? 'message' : 'data';
			    var data = e[key];
			    if(typeof data != 'undefined')
			    {
                    var rememberMe = data.rememberMe != 'undefined' ? data.rememberMe : false;
                    var expireDays = 0;
                    if(rememberMe === true)
                    {
                        expireDays = window.TMDAuthentication.Config.cookieExpireDays;
                    }
				    if(typeof data.auth != 'undefined')
				    {
					    window.TMDAuthentication.SetCookie('.Auth', data.auth, expireDays);
				    }
				    if(typeof data.authDecr != 'undefined')
				    {
					    window.TMDAuthentication.SetCookie('.AuthDecr', data.authDecr, expireDays);
				    }
				    if(typeof data.user != 'undefined')
				    {
                        window.TMDAuthentication.Config.callback(data.user);
					    document.querySelector('.pmsBox_overlay').click();
				    }
			    }
		    },false);
        }
	},
	SetCookie: function(name, value, days) {
        var secure = document.location.protocol == 'https:' ? ';Secure;' : '';
        if(days == 0) {
            document.cookie = name + '=' + escape(value) + '; path=/;SameSite=None;' + secure;
        }
        else{
		    var date = new Date();
		    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		    document.cookie = name + '=' + escape(value) + ';expires=' + date.toGMTString() + '; path=/;SameSite=None;' + secure;
        }
	},
    GetCookie: function(cname)
    {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
	Extend: function extend(a, b){
		var c = {};
		for(var p in a)
		{
			c[p] = (b[p] == null) ? a[p] : b[p];
		}
		return c;
	}
};
window.TMDAuthentication = TMDAuthentication;
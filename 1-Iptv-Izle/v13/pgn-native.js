var PGNN_PREBID_TIMEOUT = 600;
var FAILSAFE_TIMEOUT = 1100;
var PGNNATIVE_NUMBER = 0;

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

//var pgnPrcRange = { "buckets": [{ "precision": 2, "min": 0, "max": 1.00, "increment": 0.01 }, { "precision": 2, "max": 5.00, "increment": 0.1 }, { "precision": 2, "max": 100, "increment": 1 }] };
var pgnPrcRange = {"buckets": [{"precision": 2,"min": 0,"max": 1.00,"increment": 0.01},{"precision":2 , "max": 5.00, "increment": 0.1},{"precision": 2, "max": 100, "increment": 1}]};

var pgnNativeViewedSlots = new Array();
var pgnNativeViewableOffset = 1000;
var pgnnDebugScreenVisible = 0;
var pgnnOutstreamInterval = -1;
var pgnnMBaPathSabah = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native";
var pgnnDBaPathSabah =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native";
var pgnnMSidebarPathSabah = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native_advertorial";
var pgnnDSidebarPathSabah =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native_advertorial";
var pgnnDShwPathSabah = "/31110078,22727463451/sabah/desktop_web/sitegeneli/300x250";
var pgnnMShwPathSabah = "/31110078,22727463451/sabah/mobile_web/sitegeneli/300x250";

var pgnnDBaPathTakvim = "/31110078,22727463451/takvim/desktop_web/sitegeneli/native";
var pgnnMBaPathTakvim = "/31110078,22727463451/takvim/mobile_web/sitegeneli/native";
var pgnnMSidebarPathTakvim = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native_advertorial";
var pgnnDSidebarPathTakvim =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native_advertorial";
var pgnnDShwPathTakvim = "/31110078,22727463451/takvim/desktop_web/sitegeneli/300x250";
var pgnnMShwPathTakvim = "/31110078,22727463451/takvim/mobile_web/sitegeneli/300x250";

var pgnnDBaPathAhaber = "/31110078,22727463451/ahaber/desktop_web/sitegeneli/native";
var pgnnMBaPathAhaber = "/31110078,22727463451/ahaber/mobile_web/sitegeneli/native";
var pgnnMSidebarPathAhaber = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native_advertorial";
var pgnnDSidebarPathAhaber =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native_advertorial";
var pgnnDShwPathAhaber = "/31110078,22727463451/ahaber/desktop_web/sitegeneli/300x250";
var pgnnMShwPathAhaber = "/31110078,22727463451/ahaber/mobile_web/sitegeneli/300x250";

var pgnnMBaPathFotomac = "/31110078,22727463451/fotomac/mobile_web/sitegeneli/native";
var pgnnDBaPathFotomac =  "/31110078,22727463451/fotomac/desktop_web/sitegeneli/native";
var pgnnMSidebarPathFotomac = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native_advertorial";
var pgnnDSidebarPathFotomac =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native_advertorial";
var pgnnDShwPathFotomac = "/31110078,22727463451/fotomac/desktop_web/sitegeneli/300x250";
var pgnnMShwPathFotomac = "/31110078,22727463451/fotomac/mobile_web/sitegeneli/300x250";

var pgnnMBaPathAspor = "/31110078,22727463451/aspor/mobile_web/sitegeneli/native";
var pgnnDBaPathAspor =  "/31110078,22727463451/aspor/desktop_web/sitegeneli/native";
var pgnnMSidebarPathAspor = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native_advertorial";
var pgnnDSidebarPathAspor =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native_advertorial";
var pgnnDShwPathAspor = "/31110078,22727463451/aspor/desktop_web/sitegeneli/300x250";
var pgnnMShwPathAspor = "/31110078,22727463451/aspor/mobile_web/sitegeneli/300x250";

var pgnnMBaPathYeniasir = "/31110078,22727463451/yeniasir/mobile_web/sitegeneli/native";
var pgnnDBaPathYeniasir =  "/31110078,22727463451/yeniasir/desktop_web/sitegeneli/native";
var pgnnMSidebarPathYeniasir = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native_advertorial";
var pgnnDSidebarPathYeniasir =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native_advertorial";
var pgnnDShwPathYeniasir = "/31110078,22727463451/yeniasir/desktop_web/sitegeneli/300x250";
var pgnnMShwPathYeniasir = "/31110078,22727463451/yeniasir/mobile_web/sitegeneli/300x250";

var pgnnMBaPathApara = "/31110078,22727463451/apara/mobile_web/sitegeneli/native";
var pgnnDBaPathApara =  "/31110078,22727463451/apara/desktop_web/sitegeneli/native";
var pgnnMSidebarPathApara = "/31110078,22727463451/sabah/mobile_web/sitegeneli/native_advertorial";
var pgnnDSidebarPathApara =  "/31110078,22727463451/sabah/desktop_web/sitegeneli/native_advertorial";
var pgnnDShwPathApara = "/31110078,22727463451/apara/desktop_web/sitegeneli/300x250";
var pgnnMShwPathApara = "/31110078,22727463451/apara/mobile_web/sitegeneli/300x250";

var usedNewsTitles = new Array();
var dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg";

if (document.location.host.includes("takvim.com.tr")){
    dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg";
}else if (document.location.host.includes("ahaber.com.tr")){
   dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg"
}else if (document.location.host.includes("sabah.com.tr")){
   dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg"
}else if (document.location.host.includes("fotomac.com.tr")){
   dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg"
}else if (document.location.host.includes("apara.com.tr")){
   dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg"
}else if (document.location.host.includes("aspor.com.tr")){
   dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg"
}else if (document.location.host.includes("yeniasir.com.tr")){
   dummyImageSrc = "https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg"
}

var PgnN = (function () {
    'use strict';

    function getQueryStringByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function pgnNLog(message) {
        if (getCookie('pgnndebug') == '1' || getQueryStringByName('pgnnconsole') == '1') {
            console.log("PgnNLog => " + message);
            if (getQueryStringByName('pgnnconsole') == '1') {
                if (document.getElementById('pgnnDebugContainer') == null) {
                    const pgnnDebugContainer = document.createElement('div');
                    pgnnDebugContainer.setAttribute('id', 'pgnnDebugContainer');
                    pgnnDebugContainer.style.position = 'sticky';
                    pgnnDebugContainer.style.backgroundColor = 'red';
                    pgnnDebugContainer.style.padding = '20px';
                    pgnnDebugContainer.style.width = '100%';
                    //pgnnDebugContainer.style.height = '250px';
                    pgnnDebugContainer.style.bottom = '0px';
                    pgnnDebugContainer.style.textAlign = 'center';
                    pgnnDebugContainer.style.zIndex = '9999999999999';
                    document.body.appendChild(pgnnDebugContainer);

                    const pgnnDebugTextArea = document.createElement('textarea');
                    pgnnDebugTextArea.setAttribute('id', 'pgnnDebugTextArea');
                    pgnnDebugTextArea.setAttribute('rows', '15');
                    pgnnDebugTextArea.style.width = '90%';
                    pgnnDebugTextArea.style.backgroundColor = 'white';
                    pgnnDebugTextArea.style.fontSize = '12px';
                    pgnnDebugTextArea.style.fontWeight = 'normal';
                    pgnnDebugContainer.appendChild(pgnnDebugTextArea);
                    pgnnDebugScreenVisible = 1;
                }
            }       
        }

        if (pgnnDebugScreenVisible == 1) {
            document.getElementById('pgnnDebugTextArea').value = document.getElementById('pgnnDebugTextArea').value + "PgnNLog => " + message + '\r\n';
        }
    }

    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function createTargetingKeys(widget,adIds,slotSizeArr,adUnitPath) {
        var returnList = new Array();
        returnList.push({ key: "pgnNativeNumber", val: PGNNATIVE_NUMBER });
        returnList.push({ key: 'kv_invtype', val: 'web,pgnNative' });

        if(adIds!=null && adIds!=undefined){
            for (var x = 0 ; x <adIds.length; x++) {
                returnList.push({ key: "pgnNativeDivId", val: adIds[x] });
            }
        }

        if(widget!=undefined && widget!=null){
            returnList.push({ key: "pgnNativeWidget", val: widget });    
        }

        try {
            if (getCookie('prdCnAudience') != null) {
              let items = JSON.parse(getCookie('prdCnAudience'));
                if (items != null) {
                    var aud_values = new Array();
                    for (const [key, value] of Object.entries(items)) {
                      aud_values.push(key.replace("prd_",""));
                    }
                    returnList.push({key: "prd_audience", val: aud_values});
                }
            }
        }
        catch (err) {
            PgnN.PgnNLog('PgnNative error when creating targeting keys! ' + err.message);
        }
        return returnList;
    }

    function getUserSegments() {
        var returnList = new Array();
        var currentSegmentObj = new Object();
        if (getCookie('prdCnSgv2') != null) {
            let items = JSON.parse(getCookie('prdCnSgv2'));

            if (items != null && items.w != null && items.w.length > 5) {
                let ws = items.w.split(",");
                if (ws != null && ws.length > 0) {
                    for (let i = 0; i < ws.length; i++) {
                        currentSegmentObj[("prd_w_" + ws[i].split("#")[0]).toString()] = (ws[i].split("#")[1]).toString();
                        /*returnList.push(currentSegmentObj);*/
                    }
                }
            }
            if (items != null && items.c != null && items.c.length > 5) {
                let wc = items.c.split(",");
                if (wc != null && wc.length > 0) {
                    for (let i = 0; i < wc.length; i++) {
                        currentSegmentObj[("prd_c_" + wc[i].split("#")[0]).toString()] = (wc[i].split("#")[1]).toString();
                        /*returnList.push(currentSegmentObj);*/
                    }
                }
            }
            if (items != null && items.kc != null && items.kc.length > 5) {
                let wkc = items.kc.split(",");
                if (wkc != null && wkc.length > 0) {
                    for (let i = 0; i < wkc.length; i++) {
                        currentSegmentObj[("prd_kc_" + wkc[i].split("#")[0]).toString()] = (wkc[i].split("#")[1]).toString();
                        let key = "prd_kc_" + wkc[i].split("#")[0];
                        let value = wkc[i].split("#")[1];
                        /*returnList.push(currentSegmentObj);*/
                    }
                }
            }
        }
        returnList.push(currentSegmentObj);
        return returnList;
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    function getOrtb2Values() {
        var obj = {
            site: {
                name: "sabah.com.tr",
                domain: "sabah.com.tr",
                page: window.location.href.toString(),
                ref: window.location.href.toString(),
                /*keywords: "gundem, cumhurbaskani, secim",*/
                cat: ["IAB2"],
                sectioncat: ["IAB2-2"],
                pagecat: ["IAB2-2"],
                content: {
                    data: [{
                        name: "sabah.com.tr",
                        /*ext: { segtax: 7, cids: [ "iris_c73g5jq96mwso4d8" ] },
                        segment: getUserSegments()*/
                    }]
                },
            },
            user: {
                data: [{
                    name: "sabah.com.tr",
                    ext: { segtax: 4 },
                    /*segment: getUserSegments(),*/
                }],
                ext: {
                    /*data: {registered: true, interests: ["cars,sports"]}*/
                }
            }
        };
        return obj;
    }

    function getAdunitPath(widget,unitName,ros) {
        if (widget == "d-ba") {
            if(document.location.host.includes("takvim.com.tr")){
                return pgnnDBaPathTakvim
            }else if (document.location.host.includes("ahaber.com.tr")){
                return pgnnDBaPathAhaber;
            }else if (document.location.host.includes("sabah.com.tr")){
                return pgnnDBaPathSabah;
            }else if (document.location.host.includes("fotomac.com.tr")){
                return pgnnDBaPathFotomac;
            }else if (document.location.host.includes("aspor.com.tr")){
                return pgnnDBaPathAspor;
            }else if (document.location.host.includes("yeniasir.com.tr")){
                return pgnnDBaPathYeniasir;
            }else if (document.location.host.includes("apara.com.tr")){
                return pgnnDBaPathApara;
            }else{
                return pgnnDBaPathSabah;  
            }
            
        } else if (widget == "m-ba") {
            if(document.location.host.includes("takvim.com.tr")){
                var pgnnMBaPathTakvimTemp = pgnnMBaPathTakvim;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathTakvimTemp = pgnnMBaPathTakvimTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathTakvimTemp.replace("//","/");    
            }else if (document.location.host.includes("ahaber.com.tr")){
                var pgnnMBaPathAhaberTemp = pgnnMBaPathAhaber;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathAhaberTemp = pgnnMBaPathAhaberTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathAhaberTemp.replace("//","/"); 
            }else if (document.location.host.includes("sabah.com.tr")){
                var pgnnMBaPathSabahTemp = pgnnMBaPathSabah;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathSabahTemp = pgnnMBaPathSabahTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathSabahTemp.replace("//","/"); 
            }else if (document.location.host.includes("fotomac.com.tr")){
                var pgnnMBaPathFotomacTemp = pgnnMBaPathFotomac;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathFotomacTemp = pgnnMBaPathFotomacTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathFotomacTemp.replace("//","/"); 
            }else if (document.location.host.includes("aspor.com.tr")){
                var pgnnMBaPathAsporTemp = pgnnMBaPathAspor;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathAsporTemp = pgnnMBaPathAsporTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathAsporTemp.replace("//","/"); 
            }else if (document.location.host.includes("yeniasir.com.tr")){
                var pgnnMBaPathYeniasirTemp = pgnnMBaPathYeniasir;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathYeniasirTemp = pgnnMBaPathYeniasirTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathYeniasirTemp.replace("//","/"); 
            }else if (document.location.host.includes("apara.com.tr")){
                var pgnnMBaPathAparaTemp = pgnnMBaPathApara;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathAparaTemp = pgnnMBaPathAparaTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathAparaTemp.replace("//","/"); 
            }else{
                 var pgnnMBaPathSabahTemp = pgnnMBaPathSabah;
                if(unitName != undefined && unitName != "" && ros != undefined && ros != "1")
                   pgnnMBaPathSabahTemp = pgnnMBaPathSabahTemp.replace("native",unitName).replace("sitegeneli",getPathCategory());
                return pgnnMBaPathSabahTemp.replace("//","/"); 
            }
        } else if (widget == "d-sidebar") {
            if(document.location.host.includes("takvim.com.tr")){
                return pgnnDSidebarPathTakvim;
            }else if (document.location.host.includes("ahaber.com.tr")){
                return pgnnDSidebarPathAhaber;
            }else if (document.location.host.includes("sabah.com.tr")){
                return pgnnDSidebarPathSabah;
            }else if (document.location.host.includes("fotomac.com.tr")){
                return pgnnDSidebarPathFotomac;
            }else if (document.location.host.includes("aspor.com.tr")){
                return pgnnDSidebarPathAspor;
            }else if (document.location.host.includes("yeniasir.com.tr")){
                return pgnnDSidebarPathYeniasir;
            }else if (document.location.host.includes("apara.com.tr")){
                return pgnnDSidebarPathApara;
            }else{
                return pgnnDSidebarPathSabah;
            }
            
        } else if (widget == "m-sidebar") {
            if(document.location.host.includes("takvim.com.tr")){
               return pgnnMSidebarPathTakvim;
            }else if (document.location.host.includes("ahaber.com.tr")){
               return pgnnMSidebarPathAhaber;
            }else if (document.location.host.includes("sabah.com.tr")){
               return pgnnMSidebarPathSabah;
            }else if (document.location.host.includes("fotomac.com.tr")){
               return pgnnMSidebarPathFotomac;
            }else if (document.location.host.includes("apara.com.tr")){
               return pgnnMSidebarPathApara;
            }else if (document.location.host.includes("aspor.com.tr")){
               return pgnnMSidebarPathAspor;
            }else if (document.location.host.includes("yeniasir.com.tr")){
               return pgnnMSidebarPathYeniasir;
            }else{
                return pgnnMSidebarPathSabah;
            }
        }
    }

    function initNativeAds(divId) {
        if(pgnNativeViewedSlots.includes(divId)){
            PgnN.PgnNLog("Already worked initNativeAds for divId=" + divId);
        }else{
            pgnNativeViewedSlots.push(divId);
            PgnN.PgnNLog("initNativeAds divId=" + divId);
    
            PGNNATIVE_NUMBER++;
            var itm = document.getElementById(divId);
    
            var formats = itm.getAttribute('pgn-native-f') == null ? "" : itm.getAttribute('pgn-native-f');
            var unitName = itm.getAttribute('pgn-native-unit');
            var ros = itm.getAttribute('pgn-native-ros'); 
            var widgetType = itm.getAttribute('pgn-native-w');
            var scheme =itm.getAttribute('pgn-native-scheme');
            var overridedSlotPath = itm.getAttribute('pgn-native-slot');
            var order = itm.getAttribute('pgn-native-order');
            var nativeOrtbVer = itm.getAttribute('pgn-native-ortb-ver');

            var adunitPath = (overridedSlotPath!=undefined && overridedSlotPath!=null) ? overridedSlotPath : getAdunitPath(widgetType, unitName, ros);
            var widgetObj = createPgnnWidget(divId, widgetType, scheme);
            document.getElementById(divId).innerHTML = widgetObj.content;
            
            if(document.location.host.includes("takvim.com.tr")){
                if(unitName=='custombox_paging_infinite'){
                    //$('<img/>').attr({src:'https://securepubads.g.doubleclick.net/gampad/adx?iu=/31110078/proje/mobile_web/pgn_custombox_galeri_takip&sz=1x1&c=RANDOM&tile=1',height:1,width:1}).appendTo('body');    
                }else if(unitName=='300x250'){
                    //$('<img/>').attr({src:'https://securepubads.g.doubleclick.net/gampad/adx?iu=/31110078/proje/mobile_web/pgn_300x250_galeri_takip&sz=1x1&c=RANDOM&tile=1',height:1,width:1}).appendTo('body');    
                }        
            }
    
            
            //Haberleri getir
            var rssLink = getRssLink(document.location.host);
            
            generateNews(widgetObj.newsIds, rssLink, widgetObj);
    
            makeAdRequest(widgetType, widgetObj.adIds, widgetObj.newsIds, adunitPath, ((order != null && order != undefined) ? order : 1), formats, nativeOrtbVer);    
        }
    }
    
    function getRssLink(domain){
        var rssLink = "https://www.sabah.com.tr/rss/ekonomi.xml";
        if(domain.includes("takvim.com.tr")){
            rssLink = "https://www.takvim.com.tr/rss/most-read";
        }else if (domain.includes("ahaber.com.tr")){
            rssLink = "https://www.ahaber.com.tr/rss/magazin.xml";
        }else if (domain.includes("sabah.com.tr")){
            rssLink = "https://www.sabah.com.tr/rss/ekonomi.xml";
        }else if (domain.includes("fotomac.com.tr")){
            rssLink = "https://www.fotomac.com.tr/rss/most-read";
        }else if (domain.includes("Aspor.com.tr")){
            rssLink = "https://www.aspor.com.tr/rss/anasayfa.xml";
        }else if (domain.includes("Yeniasir.com.tr")){
            rssLink = "https://www.yeniasir.com.tr/rss/most-read";
        }else if (domain.includes("Apara.com.tr")){
            rssLink = "https://www.sabah.com.tr/rss/ekonomi.xml";
        }
        return rssLink;
    }

    function getHbAdunit(widget, adUnitPath, sortOrder, format, nativeOrtbVer) {
        
        var rendererUrl = "";
        var imageSize = [300,300];
      
        if(widget=="d-ba"){
            rendererUrl  = (nativeOrtbVer == "1.1") ? "https://cdn-native.pigeoon.com/v13/nativerenderer-dba-v1-1.js" : "https://cdn-native.pigeoon.com/v13/nativerenderer-dba-v1-2.js";
            imageSize = [300,300]
        }
        else if(widget=="m-ba"){
            rendererUrl  = (nativeOrtbVer == "1.1") ? "https://cdn-native.pigeoon.com/v13/nativerenderer-mba-v1-1.js" : "https://cdn-native.pigeoon.com/v13/nativerenderer-mba-v1-2.js";
            imageSize = [320,200]
        }
        else if(widget=="d-sidebar"){
            rendererUrl  = (nativeOrtbVer == "1.1") ? "https://cdn-native.pigeoon.com/v13/nativerenderer-dsidebar-v1-1.js" : "https://cdn-native.pigeoon.com/v13/nativerenderer-dsidebar-v1-2.js";
            imageSize = [320,200]
        }
        else if(widget=="m-sidebar"){
            rendererUrl  = (nativeOrtbVer == "1.1") ? "https://cdn-native.pigeoon.com/v13/nativerenderer-msidebar-v1-1.js" : "https://cdn-native.pigeoon.com/v13/nativerenderer-msidebar-v1-2.js";
            imageSize = [320,200]
        }

        var criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
        var rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
        var yandexBidObj ={bidder:'yandex', params:{pageId:1819780, impId:1}};
        var adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810492}};
        var ixBidObj = {bidder:'ix', params:{siteId: '939378'}};
        var rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:298742, zoneId:2260336}}; 
        var teadsBidObj = {bidder:'teads', params:{placementId:'176155', pageId:'161494'}};
        var smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 332578, pageId: 1516044, formatId: 84323}};
        var turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:655}};
        var adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};        
        var adfBidObj = {bidder:'adf', params:{mid: 748470}};
        var taboolaBidObj = {bidder:'taboola', params:{tagId: 'takvim_Desktop_Homepage_300x250_1', publisherId:1543648}};

        if(document.location.host.includes("takvim.com.tr")){
            criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
            rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
            yandexBidObj ={bidder:'yandex', params:{pageId:1819780, impId:1}};
            adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810492}};
            ixBidObj = {bidder:'ix', params:{siteId: '939378'}};
            rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:298742, zoneId:2260336}}; 
            teadsBidObj = {bidder:'teads', params:{placementId:'176155', pageId:'161494'}};
            smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 332578, pageId: 1516044, formatId: 84323}};
            turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:655}};
            adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};        
            adfBidObj = {bidder:'adf', params:{mid: 748470}};
            taboolaBidObj = {bidder:'taboola', params:{tagId: 'takvim_Desktop_Homepage_300x250_1', publisherId:1543648}};
        }
        else if(document.location.host.includes("sabah.com.tr")){
            criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
            rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
            yandexBidObj ={bidder:'yandex', params:{pageId:1819775, impId:1}};
            adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810523}};
            ixBidObj = {bidder:'ix', params:{siteId: '939564'}};
            rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:272018, zoneId:3076298}}; 
            teadsBidObj = {bidder:'teads', params:{placementId:'176155', pageId:'161494'}};
            smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 321019, pageId: 1516103, formatId: 125549}};
            turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:564}};
            adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};        
            adfBidObj = {bidder:'adf', params:{mid: 1784153}};
            taboolaBidObj = {bidder:'taboola', params:{tagId: 'sabah_Desktop_Gallery_300x250_1', publisherId:1543647}};   
        }else if(document.location.host.includes("fotomac.com.tr")){
            criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
            rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
            yandexBidObj ={bidder:'yandex', params:{pageId:1819776, impId:38}};
            adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810374}};
            ixBidObj = {bidder:'ix', params:{siteId: '939338'}};
            rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:298702, zoneId:3076826}}; 
            teadsBidObj = {bidder:'teads', params:{placementId:'176152', pageId:'161491'}};
            smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 332534, pageId: 1511659, formatId: 125549}};
            turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:591}};
            adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};  
            adfBidObj = {bidder:'adf', params:{mid: 1784423}};
            taboolaBidObj = {bidder:'taboola', params:{tagId: 'fotomac_Mobile_Gallery_300x250_1', publisherId:1543647}}; 
        }else if(document.location.host.includes("ahaber.com.tr")){
            criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
            rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
            yandexBidObj ={bidder:'yandex', params:{pageId:1819777, impId:39}};
            adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810465}};
            ixBidObj = {bidder:'ix', params:{siteId: '939367'}};
            rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:298732, zoneId:3076830}}; 
            teadsBidObj = {bidder:'teads', params:{placementId:'176154', pageId:'161493'}};
            smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 332567, pageId: 1516014, formatId: 125549}};
            turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:617}};
            adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};  
            adfBidObj = {bidder:'adf', params:{mid: 1784422}};
            taboolaBidObj = {bidder:'taboola', params:{tagId: 'ahaber_Mobile_Gallery_300x250_1', publisherId:1543647}};
        }else if(document.location.host.includes("aspor.com.tr")){
            criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
            rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
            yandexBidObj ={bidder:'yandex', params:{pageId:1819778, impId:38}};
            adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810574}};
            ixBidObj = {bidder:'ix', params:{siteId: '939427'}};
            rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:272018, zoneId:3076298}}; 
            teadsBidObj = {bidder:'teads', params:{placementId:'176160', pageId:'161499'}};
            smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 332570, pageId: 1516092, formatId: 125549}};
            turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:644}};
            adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};   
            adfBidObj = {bidder:'adf', params:{mid: 1784424}};
            taboolaBidObj = {bidder:'taboola', params:{tagId: 'aspor_Mobile_Gallery_300x250_1', publisherId:1543647}};
        }else if(document.location.host.includes("yeniasir.com.tr")){
            criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
            rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
            yandexBidObj ={bidder:'yandex', params:{pageId:1819781, impId:38}};
            adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810336}};
            ixBidObj = {bidder:'ix', params:{siteId: '939311'}};
            rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:298746, zoneId:3076832}}; 
            teadsBidObj = {bidder:'teads', params:{placementId:'176150', pageId:'161489'}};
            smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 332579, pageId: 1509616, formatId: 125549}};
            turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:698}};
            adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};     
            adfBidObj = {bidder:'adf', params:{mid: 1784425}};
            taboolaBidObj = {bidder:'taboola', params:{tagId: 'yeniasir_Mobile_Gallery_300x250_1', publisherId:1543647}};      
        }if(document.location.host.includes("apara.com.tr")){
            criteoBidObj= {bidder: 'criteo',params: {networkId:4458}};
            rtbHouseBidObj= {bidder: 'rtbhouse',params: {region:'prebid-eu',publisherId:'365b81345b61d1a75ytw'}};
            yandexBidObj ={bidder:'yandex', params:{pageId:1819775, impId:1}};
            adtelligentBidObj= {bidder:'adtelligent', params:{aid: 810523}};
            ixBidObj = {bidder:'ix', params:{siteId: '939564'}};
            rubiconBidObj= {bidder:'rubicon', params:{accountId:20686, siteId:272018, zoneId:3076298}}; 
            teadsBidObj = {bidder:'teads', params:{placementId:'176155', pageId:'161494'}};
            smartAdserverBidObj = {bidder:'smartadserver', params:{siteId: 321019, pageId: 1516103, formatId: 125549}};
            turktelekomBidObj = {bidder:'turktelekom', params:{host:'cpm.programattik.com', zoneId:564}};
            adtargetBidObj = {bidder:'adtarget', params:{aid: 842784}};        
            adfBidObj = {bidder:'adf', params:{mid: 1784153}};
            taboolaBidObj = {bidder:'taboola', params:{tagId: 'sabah_Desktop_Gallery_300x250_1', publisherId:1543647}};      
        }


        var bidObjects;
        if(widget=="d-ba"){
            if(sortOrder==1){
                bidObjects = [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==2){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==3){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==4){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==5){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==6){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==7){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==8){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else if(sortOrder==9){
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }else{
                bidObjects =  [criteoBidObj,yandexBidObj,rtbHouseBidObj,rubiconBidObj,adfBidObj];
            }  
        }else if (widget=="m-ba"){
            if(sortOrder==1){
                bidObjects = [criteoBidObj,yandexBidObj,rtbHouseBidObj,adtelligentBidObj,ixBidObj,rubiconBidObj,teadsBidObj,smartAdserverBidObj,adfBidObj,taboolaBidObj,turktelekomBidObj,adtargetBidObj];
            }else if(sortOrder==2){
                bidObjects = [criteoBidObj,yandexBidObj,rtbHouseBidObj,adtelligentBidObj,ixBidObj,rubiconBidObj,teadsBidObj,smartAdserverBidObj,adfBidObj,taboolaBidObj,turktelekomBidObj,adtargetBidObj];
            }else if(sortOrder==3){
                bidObjects = [criteoBidObj,yandexBidObj,rtbHouseBidObj,adtelligentBidObj,ixBidObj,rubiconBidObj,teadsBidObj,smartAdserverBidObj,adfBidObj,taboolaBidObj,turktelekomBidObj,adtargetBidObj];
            }
        }else if (widget=="m-sidebar"){
            if(sortOrder==1){
                bidObjects = [criteoBidObj,yandexBidObj,adtelligentBidObj,ixBidObj,rubiconBidObj,teadsBidObj,smartAdserverBidObj,adfBidObj,taboolaBidObj,turktelekomBidObj,adtargetBidObj];
            }
            else if(sortOrder==2){
                bidObjects = [criteoBidObj,rtbHouseBidObj,adtelligentBidObj,ixBidObj,rubiconBidObj,teadsBidObj,smartAdserverBidObj,adfBidObj,taboolaBidObj,turktelekomBidObj,adtargetBidObj];
            }
        }
        else if (widget=="d-sidebar" ){
            bidObjects = [criteoBidObj,yandexBidObj,rtbHouseBidObj,adtelligentBidObj,ixBidObj,rubiconBidObj,teadsBidObj,smartAdserverBidObj,adfBidObj,taboolaBidObj,turktelekomBidObj,adtargetBidObj];
        }
        
        var mediaTypeBanner = { sizes: [[300, 250]]};
        
        var mediaTypeNative = {
            sendTargetingKeys: false,
            rendererUrl: rendererUrl,
            ortb: {
                ver:"1.2",
                context: 1,      
                plcmttype: 2,    
                privacy: 1,       
                assets: [{
                    id: 1,
                    required: 1,
                    img: {
                            type: 3,
                            w: 300,
                            h: 300,
                        }
                    },
                    {
                        id: 2,
                        required: 1,
                        title: {
                            len: 80,
                        }
                    },
                    {
                        id: 3,
                        required: 0,
                        data: {
                            type: 1
                        }
                    },
                    {
                        id: 4,
                        required: 0,
                        data: {
                            type: 2
                        }
                    },
                    {
                        id: 5,
                        required: 0,
                        data: {
                            type: 6
                        }
                    },
                    {
                        id: 6,
                        required: 0,
                        data: {
                            type: 12
                        }
                    }
                ],
                eventtrackers: [{ 
                    event:1, methods:[1,2]
                }]
            }
        }
        
        if(nativeOrtbVer=="1.1"){
            mediaTypeNative = {
                sendTargetingKeys: false,
                rendererUrl: rendererUrl,
                image: {
                    required: true,
                    sizes: imageSize,
                    sendId: true
                },
                title: {
                    required: false,
                    len: 100,
                    sendId: true
                },
                clickUrl: {
                    required: false,
                    sendId: true
                },
                displayUrl: {
                    required: false,
                    sendId: true
                },
                privacyLink: {
                    required: false,
                    sendId: true
                },
                privacyIcon: {
                    required: false,
                    sendId: true
                },
                body: {
                    required: false,
                    len: 100,
                    sendId: true
                },
                icon: {
                    required: false,
                    sizes: [100, 100],
                    sendId: true
                },
                cta: {
                    required: false,
                    sendId: true
                },
                sponsoredBy: {
                    required: false,
                    sendId: true
                }
            }
        };

        var mediaTypesDba = {native:mediaTypeNative};
        var mediaTypesMba = {native:mediaTypeNative};
        var mediaTypesDSidebar = {native:mediaTypeNative};
        var mediaTypesMSidebar = {native:mediaTypeNative};
        if(widget=="m-ba"){
            if(format=="n"){
                mediaTypesMba = {native:mediaTypeNative};
            }else if(format=="b"){
                mediaTypesMba = {banner:mediaTypeBanner,native:mediaTypeNative};
            } 
        }
        
        var mediaTypes=null;
        if(widget=="d-ba"){
            mediaTypes=mediaTypesDba;
        }else if(widget=="m-ba"){
            mediaTypes=mediaTypesMba;
        }else if (widget=="d-sidebar"){
            mediaTypes=mediaTypesDSidebar;
        }else if (widget=="m-sidebar"){
            mediaTypes=mediaTypesMSidebar;
        }
        
        console.log("adUnitPath.toString():" + adUnitPath.toString());
        var adUnits = [
            {
                code: adUnitPath.toString(),
                mediaTypes: mediaTypes,
                bids: bidObjects
            }
        ];

        return adUnits;
    }
    
    function makeAdRequest(widget, adIds, newsIds, adUnitPath, adUnitOrder, formats, nativeOrtbVer) {
        var hbUnitArray = new Array();
        var gptUnitArray = new Array();

        if(widget=='m-ba'){
            for (let a = 0; a < adIds.length; a++) {
                PgnN.PgnNLog("makeAdRequest for " + adUnitPath + " with divId " + adIds[a]);
                if(adUnitPath.includes("native")){
                    var hbUnit = getHbAdunit(widget, adUnitPath + "_" + (parseInt(adUnitOrder)+a), (parseInt(adUnitOrder)+a), formats.split("|")[a], nativeOrtbVer);
                    hbUnitArray.push(hbUnit);
                }
                else{
                    var hbUnit = getHbAdunit(widget, adUnitPath, (parseInt(adUnitOrder)+a), formats.split("|")[a], nativeOrtbVer);
                    hbUnitArray.push(hbUnit);
                }
            }
        }
        else if(widget=='d-ba'){
            for (let a = 0; a < adIds.length; a++) {
                PgnN.PgnNLog("makeAdRequest for " + adUnitPath + "_" + (parseInt(adUnitOrder)+a) + " with divId " + adIds[a]);
                var hbUnit = getHbAdunit(widget, adUnitPath, (parseInt(adUnitOrder)+a), "n", nativeOrtbVer);
                hbUnitArray.push(hbUnit);
            }
        }
        else if(widget=='m-sidebar'){
            for (let a = 0; a < adIds.length; a++) {
                PgnN.PgnNLog("makeAdRequest for " + adUnitPath + "_" + (parseInt(adUnitOrder)+a) + " with divId " + adIds[a]);
                var hbUnit = getHbAdunit(widget, adUnitPath + "_" + (parseInt(adUnitOrder)+a), (parseInt(adUnitOrder)+a), "n", nativeOrtbVer);
                hbUnitArray.push(hbUnit);
            }
        }
        else if(widget=='d-sidebar'){
            for (let a = 0; a < adIds.length; a++) {
                PgnN.PgnNLog("makeAdRequest for " + adUnitPath + "_" + (parseInt(adUnitOrder)+a) + " with divId " + adIds[a]);
                var hbUnit = getHbAdunit(widget, adUnitPath + "_" + (parseInt(adUnitOrder)+a), (parseInt(adUnitOrder)+a), "n", nativeOrtbVer);
                hbUnitArray.push(hbUnit);
            }
        }

        var slotSizeArr = [['fluid']];
        googletag.cmd.push(function () {
            if(widget=='m-ba'){
                for (let b = 0; b < adIds.length; b++) {
                    if(formats.split("|")[b]=="n"){
                        slotSizeArr = [['fluid']];
                    }else if(formats.split("|")[b]=="b"){
                        slotSizeArr = [['fluid'],[300,250],[320,100],[336,288]];
                    }
                    if(adUnitPath.includes("native")){
                        var slot = googletag.defineSlot(adUnitPath + "_" + (parseInt(adUnitOrder)+b), slotSizeArr, adIds[b]).addService(googletag.pubads());
                        gptUnitArray.push(slot);
                    }
                    else{
                        var slot = googletag.defineSlot(adUnitPath, slotSizeArr, adIds[b]).addService(googletag.pubads());
                        gptUnitArray.push(slot);
                    }
                }
            }
            else if(widget=='d-ba'){
                for (let b = 0; b < adIds.length; b++) {
                    slotSizeArr = [['fluid']];
                    var slot = googletag.defineSlot(adUnitPath + "_" + (parseInt(adUnitOrder)+b), slotSizeArr, adIds[b]).addService(googletag.pubads());
                    gptUnitArray.push(slot);
                }
            }
            else if(widget=='m-sidebar'){
                for (let b = 0; b < adIds.length; b++) {
                    slotSizeArr = [['fluid']];
                    var slot = googletag.defineSlot(adUnitPath + "_" + (parseInt(adUnitOrder)+b), slotSizeArr, adIds[b]).addService(googletag.pubads());
                    gptUnitArray.push(slot);
                }
            }
            else if(widget=='d-sidebar'){
                for (let b = 0; b < adIds.length; b++) {
                    slotSizeArr = [['fluid']];
                    var slot = googletag.defineSlot(adUnitPath + "_" + (parseInt(adUnitOrder)+b), slotSizeArr, adIds[b]).addService(googletag.pubads());
                    gptUnitArray.push(slot);
                }
            }
            
            googletag.cmd.push(function () {
                googletag.pubads().disableInitialLoad();
            });
            
            googletag.pubads().addEventListener('slotRenderEnded',function (event) {
                try{
                    var slot = event.slot;
                    if (adIds.includes(slot.getSlotElementId())) {
                        if(event.isEmpty){
                            var tempArr= new Array();
                            tempArr.push(slot.getSlotElementId());
                            const elements = document.querySelectorAll('.pgnn-ad-element');
                            elements.forEach(box => {
                              box.remove();
                            });
                            
                            if(widget=="d-ba" || widget=="m-ba" || widget=="d-sidebar" || widget=="m-sidebar"){
                                var elem = document.getElementById(slot.getSlotElementId());
                                elem.setAttribute("style","");
                            }
                            
                            var rssLink = getRssLink(document.location.host);
                            generateNews(tempArr, rssLink,widget);
                        }

                        if(!event.isEmpty && widget=="d-ba"){
                            var elem = document.getElementById(slot.getSlotElementId());
                            PgnN.PgnNLog("slotId: " + slot.getSlotElementId() + " | path: " + slot.getAdUnitPath() + " | event.size: " + event.size[0] + "," + event.size[1] + " | creativeId: " + event.sourceAgnosticCreativeId);
                            elem.getElementsByTagName("iframe")[0].style.height="100%";
                            elem.getElementsByTagName("iframe")[0].style.minHeight="285px";
                            elem.getElementsByTagName("iframe")[0].style.minWidth="215px";
                        }

                        if(!event.isEmpty && widget=='m-ba'){
                            var elem = document.getElementById(slot.getSlotElementId());
                            PgnN.PgnNLog("slotId: " + slot.getSlotElementId() + " | path: " + slot.getAdUnitPath() + " | event.size: " + event.size[0] + "," + event.size[1] + " | creativeId: " + event.sourceAgnosticCreativeId);
                            
                            if(event.size[0]==320 && event.size[1]==100){
                                document.getElementById(elem.getAttribute("id")).parentElement.style.height="100px";
                                document.getElementById(elem.getAttribute("id")).parentElement.style.width="320px";
                                document.getElementById(elem.getAttribute("id")).parentElement.style.margin="0 auto";
                            }
                            
                            if(event.size[0]==0 || event.size[0]==1 || event.size[0]==2){
                                PgnN.PgnNLog(slot.getSlotElementId() +" event size width: " + event.size[0]);
                                PgnN.PgnNLog(slot.getSlotElementId() +" event size height: " + event.size[1]);
                                elem.getElementsByTagName("div")[0].style.width=elem.offsetWidth + "px";
                                elem.getElementsByTagName("div")[0].style.height=elem.offsetHeight + "px";
                                elem.getElementsByTagName("iframe")[0].style.width=elem.offsetWidth + "px";
                                elem.getElementsByTagName("iframe")[0].style.height=elem.offsetHeight + "px";
                            
                                if(elem.getElementsByTagName("iframe")[0].getAttribute("width")=="300" || elem.getElementsByTagName("iframe")[0].getAttribute("width")=="336" ){
                                    PgnN.PgnNLog(slot.getSlotElementId() +" event size width: " + event.size[0]);
                                    PgnN.PgnNLog(slot.getSlotElementId() +" event size height: " + event.size[1]);
                                    var calcWidth = elem.getElementsByTagName("iframe")[0].getAttribute("width");
                                    document.getElementById(elem.getAttribute("id")).parentElement.style.width=calcWidth + "px";
                                    document.getElementById(elem.getAttribute("id")).parentElement.style.margin="0 auto";
                                }
                            } 
                            
                            PgnN.PgnNLog('pgnNative SlotElementId:' + event.slot.getSlotElementId() + ' => sizefix!');
                        }

                        if(!event.isEmpty && widget=='d-sidebar'){
                            var elem = document.getElementById(slot.getSlotElementId());
                            PgnN.PgnNLog("slotId: " + slot.getSlotElementId() + " | path: " + slot.getAdUnitPath() + " | event.size: " + event.size[0] + "," + event.size[1] + " | creativeId: " + event.sourceAgnosticCreativeId);
                                                        
                            if(event.size[0]==0 || event.size[0]==1 || event.size[0]==2){
                                PgnN.PgnNLog(slot.getSlotElementId() +" event size width: " + event.size[0]);
                                PgnN.PgnNLog(slot.getSlotElementId() +" event size height: " + event.size[1]);
                                elem.getElementsByTagName("div")[0].style.width=elem.offsetWidth + "px";
                                elem.getElementsByTagName("div")[0].style.minHeight= "80px";
                                elem.getElementsByTagName("iframe")[0].style.width=elem.offsetWidth + "px";
                                elem.getElementsByTagName("iframe")[0].style.minHeight= "80px";
                            } 
                            
                            PgnN.PgnNLog('pgnNative SlotElementId:' + event.slot.getSlotElementId() + ' => sizefix!');
                        }
                    }        
                }catch(exc){
                    PgnN.PgnNLog('pgnNative Error when adjusting sizes!: ' + exc.message);
                }
            });

            googletag.pubads().addEventListener("impressionViewable", (event) => {
                if((getQueryStringByName('pgnnd') == '1')){
                    PgnN.PgnNLog('Impression for slot ', event.slot.getSlotElementId(), ' became viewable.');
                }
            });

            var prdKeys = createTargetingKeys(widget,adIds,slotSizeArr,adUnitPath);

            if (prdKeys.length > 0) {
                for (let s = 0; s < prdKeys.length; s++) {
                    for (let v = 0; v < gptUnitArray.length; v++) {
                        if (!gptUnitArray[v].getTargetingKeys().includes(prdKeys[s].key)) {
                            gptUnitArray[v].setTargeting(prdKeys[s].key, prdKeys[s].val);
                        }
                    }
                }
            }


            for (let y = 0; y < gptUnitArray.length; y++) {
                
                if(widget=="d-ba" && (y==1 || y==4 || y==7)){
                    gptUnitArray[y].setTargeting('allow_adx', "false"); //do not allow adx in the second box
                }

                if(widget=="m-sidebar" && gptUnitArray.length>1 && y==0){
                    gptUnitArray[y].setTargeting('allow_adx', "false"); //do not allow adx in the first box when more than two box available
                }
                
                if (!gptUnitArray[y].getTargetingKeys().includes('pgnNativeSortOrder')) {
                    gptUnitArray[y].setTargeting('pgnNativeSortOrder', y+1);
                }

                if(adUnitPath.split('/').length>0){
                    var kv_sizevalue = adUnitPath.split('/')[adUnitPath.split('/').length-1]
                    
                    if (!gptUnitArray[y].getTargetingKeys().includes('kv_size')) {
                        gptUnitArray[y].setTargeting('kv_size',kv_sizevalue);
                    }
                }
            }

            pbjs.que.push(function () {
                
                pbjs.onEvent('adRenderFailed', function (data) {
                    PgnN.PgnNLog('adRenderFailed: ' + data.adUnitCode + ' => ' + data.adId + ' => ' + data.bidderCode + ' => ' + data.cpm + ' ' + data.currency );
                });
        
                pbjs.onEvent('adRenderSucceeded', function (data) {
                    PgnN.PgnNLog('adRenderSucceed: ' + data.bid.adUnitCode + ' => ' + data.adId + ' => ' + data.bid.bidderCode + ' => ' + data.bid.cpm + ' ' + data.bid.currency );
                });
        
                pbjs.onEvent('bidWon', function (data) {
                    PgnN.PgnNLog('bidWon: ' + data.adUnitCode + ' => ' + data.adId + ' => ' + data.bidderCode + ' => ' + data.cpm + ' ' + data.currency );
                });
                
                pbjs.onEvent('setTargeting', function (data) {
                    PgnN.PgnNLog('setTargeting: ' + data);
                });
        
                pbjs.onEvent('bidResponse', function (data) {
                    PgnN.PgnNLog('bidResponse for ' + data.adUnitCode + ' => ' + data.adId + ' => ' + data.bidderCode + ' => ' + data.cpm + ' ' + data.currency );
                });
        
                pbjs.onEvent('bidderError', function (error) {
                    if(error!=undefined && error.bidderRequest!=undefined && error.bidderRequest.bidderCode!=undefined){
                        PgnN.PgnNLog('bidderError: ' + error.bidderRequest.bidderCode + ' => Status: => ' + error.error.status + ' => Message: ' + error.error.statusText + ' => AuctionId: => ' + error.bidderRequest.auctionId);
                    }
                });
            });
            
            pbjs.que.push(function () {
                pbjs.removeAdUnit();
                for (let b = 0; b < hbUnitArray.length; b++) {
                    pbjs.addAdUnits(hbUnitArray[b]);
                };
                
                pbjs.setConfig({
                    rubicon: {singleRequest: true},
                    debug: (hbDebug && (PgnN.GetCookie('pgnndebug')=='1')),
                    priceGranularity: prcRange,
                    enableSendAllBids: true,
                    pubcid: {enable:true, expInterval: 525600},
                    userSync: {
                        syncEnabled: true,
                        iframeEnabled: true,
                        syncsPerBidder: 3,
                        syncDelay: 3000,
                        filterSettings: {
                            iframe: {
                                bidders: '*',
                                filter: 'include'
                              }
                        },
                        userIds: [{
                                name: "pubCommonId",
                                storage: {type: "cookie", name: "_pubCommonId", expires: 1825}
                            },
                            { 
                                name: "id5id", 
                                params: {partner: 205}, 
                                storage: {type: "html5", name: "id5id", expires: 45, refreshInSeconds: 8*3600}
                            },
                            {
                                name: "unifiedId",
                                params: {
                                    url: "//match.adsrvr.org/track/rid?ttd_pid=owaep76&fmt=json"
                                },
                                storage: {
                                    type: "cookie",
                                    name: "pbjs-unifiedid",
                                    expires: 60                   
                                }
                            },
                            {
                                name: "criteo",
                            },
                            {
                                name: 'teadsId',
                                params: {
                                    pubId: 23360
                                }
                            }
                        ]
                    }
                });
        
                PgnN.PgnNLog("PgnNative Request Timeout: " + PGNN_PREBID_TIMEOUT);
                
                pbjs.requestBids({
                    //ortb2: getOrtb2Values(),
                    bidsBackHandler: function () {
                        googletag.cmd.push(function () {
                            pbjs.que.push(function () {
                                pbjs.setTargetingForGPTAsync();
                                for (let c = 0; c < adIds.length; c++) {
                                    googletag.display(adIds[c]);
                                }
                                googletag.pubads().refresh(gptUnitArray);
                                pgnnInprogress = 0;
                            });
                        });
                    },
                    timeout: PGNN_PREBID_TIMEOUT
                });
            });

            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });
    }

    function initOutstreamAds(divId, placementId) {
        PgnN.PgnNLog("initOutstreamAds divId=" + divId + " ,placementId=" + placementId);
       
        var container = document.getElementById(divId).getElementsByClassName("pgnn-d-outstream-slot-inner")[0];
        if(container!=null && container!=undefined){
            (AdPlayerPro=window.AdPlayerPro||[]).push({id:placementId,after:container,init:bindPlayerEvents});
        }
    }

    function fixPgnOutstreamZindex(top) {
        if (top == 1) {
            if(document.location.host.includes('takvim')){
                document.getElementsByClassName('column-right')[0].style.zIndex=0;
            }
            if (document.getElementById('cornerstick') != null)
                document.getElementById('cornerstick').style.zIndex = 100;
            if (document.getElementsByClassName('pageSkinRight').length > 0)
                document.getElementsByClassName('pageSkinRight')[0].style.zIndex = 99;
            if (document.getElementsByClassName('pageSkinLeft').length > 0)
                document.getElementsByClassName('pageSkinLeft')[0].style.zIndex = 99;
        } else {
            if(document.location.host.includes('takvim')){
                document.getElementsByClassName('column-right')[0].style.zIndex=null;
            }
            if (document.getElementById('cornerstick') != null)
                document.getElementById('cornerstick').style.zIndex = 997888;
            if (document.getElementsByClassName('pageSkinRight').length > 0)
                document.getElementsByClassName('pageSkinRight')[0].style.zIndex = 10004;
            if (document.getElementsByClassName('pageSkinLeft').length > 0)
                document.getElementsByClassName('pageSkinLeft')[0].style.zIndex = 10004;
        }
    }

    function bindPlayerEvents(api) {
        if (api) {
            api.on('AdLoaded', function () {
               PgnN.PgnNLog("PgnPlayer AdLoaded");
            });
            api.on('AdStarted', function () {
                PgnN.PgnNLog("PgnPlayer Ad  started");
                //fixPgnOutstreamZindex(1);
                //pgnnOutstreamInterval = setInterval(PgnOutstreamTick, 100);
                //function PgnOutstreamTick() {
                //    if (api.getAdRemainingTime() > 0) {
                //        fixPgnOutstreamZindex(1);
                //    }
                //}
            });
            api.on('AdVideoComplete', function () {
                //fixPgnOutstreamZindex(0);
                //clearInterval(pgnnOutstreamInterval);
            });
            api.on('AdSkipped', function () {
                //fixPgnOutstreamZindex(0);
                //clearInterval(pgnnOutstreamInterval);
            });
            api.on('AdStopped', function () {

            });
            api.on('AdPlaying', function () {
                //fixPgnOutstreamZindex(1);
            });
        } else {
            PgnN.PgnNLog("PgnPlayer Api Undefined!");
        }
    }

    function createPgnnWidget(divId, widgetType, scheme) {
        var rowItems = new Array();
        var newsItems = new Array();

        var widgetObj = new Object();
        widgetObj.content = "";
        widgetObj.adIds = new Array();
        widgetObj.newsIds = new Array();
        widgetObj.widgetType = widgetType;

        if (widgetType == "d-ba") {
            widgetObj.content += "<div class='pgnn-row pgnn-no-gutters pgnn-justify-content-between pgnn-d-ba-header'>";
            widgetObj.content += "<div class='pgnn-col pgnn-d-ba-header-title'>Sizin icin Sectiklerimiz</div>";
            widgetObj.content += "<div class='pgnn-col pgnn-d-ba-header-brand'>";
            widgetObj.content += "<a class='pgnn-d-ba-header-brand-a' target='_blank'>Native Ads By Turkuvaz Medya</a>";
            widgetObj.content += "</div>";
            widgetObj.content += "</div>";
            //widgetObj.content += "<div class='pgnn-d-outstream-slot' style='padding:10px;'><div class='pgnn-d-outstream-slot-inner'></div></div>";
        }else if (widgetType == "m-ba") {
            widgetObj.content += "<div class='pgnn-row pgnn-no-gutters pgnn-justify-content-center pgnn-m-ba-header'>";
            widgetObj.content += "<div class='pgnn-m-ba-header-title'> Haber devam ediyor ";
            widgetObj.content += "<div style='width: 0;height: 0;border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 10px solid #2f2f2f;font-size: 0;line-height: 0;float: right; margin-left:10px;margin-top:3px'>";
            widgetObj.content +="</div>";
            widgetObj.content +="</div>";
            //widgetObj.content += "<div class='pgnn-col pgnn-m-ba-header-brand'>";
            //widgetObj.content += "<a class='pgnn-m-ba-header-brand-a' target='_blank'>Native Ads By Turkuvaz Medya</a>";
            //widgetObj.content += "</div>";
            widgetObj.content += "</div>";
            widgetObj.content += "<div class='pgnn-d-outstream-slot'><div class='pgnn-d-outstream-slot-inner'></div></div>";
        }
        else if (widgetType=="d-sidebar"){
           
        }
        else if (widgetType=="m-sidebar"){
            
        }

        if (widgetType == "d-ba" || widgetType == "m-ba" || widgetType == "m-sidebar") {
            var scheme = scheme.split("|");
            for (let i = 0; i < scheme.length; i++) {
                rowItems.push(scheme[i].split(",")[0]);
                newsItems.push((scheme[i].split(",")[1]).split("-"));
            }
        }
        else if (widgetType == "d-sidebar") {
            rowItems.push(scheme.split(",")[0]);
            newsItems.push((scheme.split(",")[1]).split("-"));
        }

        for (let k = 0; k < rowItems.length; k++) {
            var tempObj = generateRow(widgetType, rowItems[k], newsItems[k], divId + "_" + k.toString());
            widgetObj.content += tempObj.content;
            tempObj.adIds.forEach(element => widgetObj.adIds.push(element));
            tempObj.newsIds.forEach(element => widgetObj.newsIds.push(element));
        }
        
        return widgetObj;
    }

    function generateRow(widget, cellCount, newsPositions, container) {
        var adIds = new Array();
        var newsIds = new Array();
        var content = "";
        if (widget == "d-ba") {
            content = "<div class='pgnn-row pgnn-no-gutters pgnn-d-ba-row-container'>";
            for (let x = 0; x < cellCount; x++) {
                var idx = container + "_" + x.toString();
                var contentType = newsPositions.includes((x + 1).toString()) ? 1 : 0;
                if (contentType == 0 ? adIds.push(idx) : newsIds.push(idx));
                content += generateCell(widget, cellCount, contentType, idx);
            }
            content += "</div>";
        } 
        else if (widget == "m-ba") {
            content = "<div class='pgnn-row pgnn-no-gutters pgnn-m-ba-row-container'>";
            for (let x = 0; x < cellCount; x++) {
                var idx = container + "_" + x.toString();
                var contentType = newsPositions.includes((x + 1).toString()) ? 1 : 0;
                if (contentType == 0 ? adIds.push(idx) : newsIds.push(idx));
                content += generateCell(widget, cellCount, contentType, idx);
            }
            content += "</div>";
        }
        else if (widget == "m-sidebar") {
            content = "<div class='pgnn-row pgnn-no-gutters'>";
            for (let x = 0; x < cellCount; x++) {
                var idx = container + "_" + x.toString();
                var contentType = newsPositions.includes((x + 1).toString()) ? 1 : 0;
                if (contentType == 0 ? adIds.push(idx) : newsIds.push(idx));
                content += generateCell(widget, cellCount, contentType, idx);
            }
            content +="</div>";
        }
        else if (widget=="d-sidebar"){
            content ="<div class='pgnn-row pgnn-no-gutters'>";
            for (let x = 0; x < cellCount; x++) {
                var idx = container + "_" + x.toString();
                var contentType = newsPositions.includes((x + 1).toString()) ? 1 : 0;
                if (contentType == 0 ? adIds.push(idx) : newsIds.push(idx));
                content += generateCell(widget, cellCount, contentType, idx);
            }
            content +="</div>";
        }

        var returnObj = new Object();
        returnObj.content = content;
        returnObj.adIds = adIds;
        returnObj.newsIds = newsIds;
        return returnObj;
    }

    function generateCell(widget, cellCount, contentType, id) {
        
        if (widget == "d-ba") {
            var content = " <div class='pgnn-col'>";
            if(document.location.host.includes("ahaber.com.tr")){
                var content = " <div class='pgnn-col' style='max-width:212px !important;'>";
            }
            content +="         <div class='pgnn-padding-10 pgnn-d-ba-cell-container' id='" + id + "'>";
            content +=`             <div>
                                        
                                        <div class="pgnn-row pgnn-no-gutters">
                                            <a href='#' class='pgnn-d-ba-a' target='_blank'><img class='pgnn-d-ba-a-img' src='https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg'></a>
                                        </div>

                                        <div class='pgnn-row pgnn-no-gutters'>
                                            <div class='pgnn-row pgnn-no-gutters'>
                                                <div class='pgnn-d-ba-title pgnn-d-ba-row-max-width'>
                                                    <a class='pgnn-d-ba-title-a'href='#' target='_blank' style='color:white;'>Pigeoon Self Native Ads!</a>
                                                </div>
                                            </div>
                                            
                                            <div class='pgnn-row pgnn-no-gutters pgnn-justify-content-between pgnn-d-ba-row-max-width pgnn-ad-element' style='display:none;'>
                                                <div class='pgnn-col-auto pgnn-d-ba-spot'>
                                                    <a class='pgnn-d-ba-spot-a' href='#' target='_blank'></a>
                                                </div>
                                                <div class='pgnn-col-auto pgnn-d-ba-cta pgnn-float-right'>
                                                    <a class='pgnn-d-ba-cta-a'href='#' target='_blank'></a>
                                                </div>
                                            </div> 
                                        </div>

                                    </div>
                                </div>
                            </div>`;
            return content;
        }
        else if (widget == "m-ba") {
            var content = "     <div class='pgnn-col pgnn-text-align-center' id='" + id + "'>";
            content +="             <div class='pgnn-m-ba-col-container'>";
            content += "                <div class='pgnn-row pgnn-no-gutters pgnn-m-ba-row'>";
            content += "                    <a class='pgnn-col pgnn-m-ba-col-a' href='#' target='_blank'>";
            content += "                        <img class='pgnn-m-ba-col-a-img' src = 'https://cdn-native.pigeoon.com/static/turkuvaz/turkuvaz-bg.jpg'>";
            content += "                    </a>";
            content += "                </div>";
            content += "                <div class='pgnn-m-ba-bottom'>";
            content += "                    <div class='pgnn-row pgnn-no-gutters pgnn-m-ba-row'>";
            content += "                        <div class='pgnn-m-ba-title'>";
            content += "                            <a class='pgnn-m-ba-title-a' href='#' target='_blank'></a>";
            content += "                        </div>";
            content += "                    </div>";
            content += "                    <div class='pgnn-row pgnn-no-gutters pgnn-m-ba-row'>";
            content += "                        <div class='pgnn-m-ba-body'>";
            content += "                            <a class='pgnn-m-ba-body-a' href='#' target='_blank'></a>";
            content += "                        </div>";
            content += "                    </div>";
            content += "                    <div class='pgnn-row pgnn-no-gutters pgnn-justify-content-between pgnn-d-ba-row pgnn-ad-element' style='display:none;'>";
            content += "                        <div class='pgnn-col-auto pgnn-m-ba-col-spot'>";
            content += "                            <a class='pgnn-m-ba-col-spot-a' href='#' target='_blank'></a>";
            content += "                        </div>";
            content += "                        <div class='pgnn-col-auto pgnn-m-ba-col-cta'>";
            content += "                            <a class='pgnn-m-ba-col-cta-a'href='#' target='_blank'></a>";
            content += "                        </div>";
            content += "                    </div>";
            content += "                </div>";
            content += "            </div>";
            content += "        </div>";
            return content;

        }
        else if (widget == "m-sidebar") {
            var content = "   <div style='margin: 3px; border:1px solid #ddd; min-height:150px;' class='pgnn-col pgnn-no-gutters' id='" + id + "'>";
            content += "         <div class='pgnn-row pgnn-no-gutters' style='text-align:center;'>";
            content += "            <div class='pgnn-col pgnn-no-gutters' style='margin-top:5px'>";
            content += "               <a href='#' target='_blank' style='text-decoration:none;'>";
            content += "                  <img style='min-width: 150px !important; object-fit: scale-down; height: 100px !important; max-width:initial !important; max-height:initial !important;' src=''/>";
            content += "               </a>";
            content += "            </div>";
            
            content += "            <div class='pgnn-col pgnn-no-gutters' style='text-align: left; padding:5px; min-height:50px'>";
            content += "               <a href='#' target='_blank' style='font-family:Trebuchet MS,Verdana,sans-serif; color:#14233a; font-weight:700; font-size:17px; text-decoration:none; line-height:1em !important;'></a>";
            content += "            </div>";
            content += "         </div>";
            
            content += "         <div class='pgnn-cta .pgnn-ad-element' style='background-color: #14233a; height:25px; padding:5px; text-align:center; '><a href='#' target='_blank' style='font-weight:700; width:100%; color:white; text-decoration:none;font-family:Trebuchet MS,Verdana,sans-serif; font-size:17px;'></a></div>"
            content += "      </div>"
            return content;
        }
        else if (widget == "d-sidebar") {
            var content =   "<div class='pgnn-col pgnn-no-gutters' id='" + id + "'>";
            content +=      "   <div class='pgnn-row pgnn-no-gutters'>";
            content +=      "       <div class='pgnn-no-gutters' style='margin-right: 15px; margin-left:0px;'>";
            content +=      "           <a href='#' target='_blank' style='text-decoration:none;'>";
            content +=      "               <img style='width: 100px;object-fit: cover;' src=''>";
            content +=      "           </a>";
            content +=      "       </div>";             
            content +=      "       <div class='pgnn-col pgnn-no-gutters' style='text-align: left;  position: relative;'>";
            content +=      "           <div class='pgnn-row pgnn-no-gutters' style='padding-right:15px;'>";
            content +=      "               <a href='#' target='_blank' style='color:#14233a; font-weight:700; font-size:14px; text-decoration:none;'></a>";
            content +=      "           </div>";
            content +=      "           <div class='pgnn-row pgnn-no-gutters'>";
            content +=      "               <a href='#' target='_blank' style='color:#14233a; font-size:13px; text-decoration:none;'></a>";
            content +=      "           </div>";
            content +=      "           <div class='pgnn-row pgnn-no-gutters pgnn-ad-element' style='float:right; margin:0 0 5px 0; position:absolute; bottom:0px; right: 0px;'>";
            content +=      "               <a href='#' target='_blank' style='font-family:Trebuchet MS,Verdana,sans-serif; color:blue; font-size:13px; text-decoration:none;'></a>";
            content +=      "           </div>";
            content +=      "       </div>";
            content +=      "   </div>";
            content +=      "</div>";
            return content;
        }
    }

    function generateNews(newsIds, rssLink, widgetObj){
        const RSS_URL = rssLink;
        var newsList= new Array(); 
        fetch(RSS_URL)
          .then(response => response.text())
          .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
          .then(data => {
            const items = data.querySelectorAll("item");
            for(let i=0; i<items.length; i++){
                try{
                    var newsItem = new Object();
                    newsItem.title = items[i].querySelector("title").innerHTML.replace("<![CDATA[", "").replace("]]>", "").replace("Ã¢â‚¬â„¢", "").replace("Ã¢â‚¬Ëœ","").replace("Ã¢â‚¬â„¢","");
                    newsItem.imgSrc = (items[i].querySelector("enclosure")!=null && items[i].querySelector("enclosure")!=undefined)? items[i].querySelector("enclosure").getAttribute("url") : dummyImageSrc;
                    newsItem.link = items[i].querySelector("link").innerHTML.replace("<![CDATA[", "").replace("]]>", "");
                    if(!newsItem.link.includes('?')){
                        newsItem.link = newsItem.link + '?utm_source=pgnNative';
                    }else{
                        newsItem.link = newsItem.link + '&utm_source=pgnNative';
                    }
                    newsList.push(newsItem);
                }catch(err){
                    PgnN.PgnNLog(err);
                }
            }
            
            var currentNewsOrder=0;
            for(let k=0; k<newsIds.length; k++){
                if(usedNewsTitles!=null && usedNewsTitles.length>0){
                    for(let x=0; x<newsList.length; x++){
                        if(usedNewsTitles.includes(newsList[x].title))
                            newsList.splice(x,1);
                    }
                }
                var randomNews = shuffleArray(newsList);
            
                var newsBlock = document.getElementById(newsIds[k]);
                
                if(newsBlock!=null && newsBlock!=undefined){
                    if(widgetObj.widgetType=='m-sidebar' || widgetObj=='m-sidebar'){
                        var titleNew=randomNews[currentNewsOrder].title;
                        if(randomNews[currentNewsOrder].title.length>50){
                            titleNew="";
                            var tempTitle = randomNews[currentNewsOrder].title.substring(0,50).split(" ");
                            for (var z = 0; z < tempTitle.length-1; z++) {
                                titleNew += tempTitle[z] + " ";
                            }
                            titleNew = titleNew + "...";
                        }
                        newsBlock.style.border="1px solid #ddd";
                        newsBlock.getElementsByTagName('a')[0].href = randomNews[currentNewsOrder].link;
                        newsBlock.getElementsByTagName('a')[1].href = randomNews[currentNewsOrder].link;
                        newsBlock.getElementsByTagName('a')[1].innerHTML = titleNew;
                        newsBlock.getElementsByTagName('img')[0].src = randomNews[currentNewsOrder].imgSrc;
                        newsBlock.getElementsByTagName('img')[0].style.maxWidth="";
                        newsBlock.getElementsByClassName('pgnn-cta')[0].remove();
                    }else if(widgetObj.widgetType=='d-sidebar' || widgetObj=='d-sidebar'){
                        var titleNew=randomNews[currentNewsOrder].title;
                        if(randomNews[currentNewsOrder].title.length>50){
                            titleNew="";
                            var tempTitle = randomNews[currentNewsOrder].title.substring(0,100).split(" ");
                            for (var z = 0; z < tempTitle.length-1; z++) {
                                titleNew += tempTitle[z] + " ";
                            }
                            titleNew = titleNew + "...";
                        }
                        newsBlock.style.minHeight='inherit';
                        newsBlock.parentElement.style.minHeight='60px';
                        newsBlock.getElementsByTagName('a')[0].href = randomNews[currentNewsOrder].link;
                        newsBlock.getElementsByTagName('a')[1].href = randomNews[currentNewsOrder].link;
                        newsBlock.getElementsByTagName('a')[1].innerHTML = titleNew;
                        newsBlock.getElementsByTagName('a')[1].parentElement.parentElement.parentElement.style.backgroundColor="white";
                        newsBlock.getElementsByTagName('a')[1].style.color="black";
                        newsBlock.getElementsByTagName('img')[0].src = randomNews[currentNewsOrder].imgSrc;
                        newsBlock.getElementsByTagName('img')[0].style.display='initial';
    
                        if(randomNews[currentNewsOrder].imgSrc!=dummyImageSrc)
                            newsBlock.getElementsByTagName('img')[0].style.objectFit = "cover";   
                    }else{
                        var titleNew=randomNews[currentNewsOrder].title;
                        if(randomNews[currentNewsOrder].title.length>50){
                            titleNew="";
                            var tempTitle = randomNews[currentNewsOrder].title.substring(0,100).split(" ");
                            for (var z = 0; z < tempTitle.length-1; z++) {
                                titleNew += tempTitle[z] + " ";
                            }
                            titleNew = titleNew + "...";
                        }
                        newsBlock.style.minHeight='inherit';
                        newsBlock.parentElement.style.minHeight='inherit';
                        newsBlock.getElementsByTagName('a')[0].href = randomNews[currentNewsOrder].link;
                        newsBlock.getElementsByTagName('a')[1].href = randomNews[currentNewsOrder].link;
                        newsBlock.getElementsByTagName('a')[1].innerHTML = titleNew;
                        newsBlock.getElementsByTagName('a')[1].parentElement.parentElement.parentElement.style.backgroundColor="white";
                        newsBlock.getElementsByTagName('a')[1].style.color="black";
                        newsBlock.getElementsByTagName('img')[0].src = randomNews[currentNewsOrder].imgSrc;
                        newsBlock.getElementsByTagName('img')[0].style.display='initial';
    
                        if(randomNews[currentNewsOrder].imgSrc!=dummyImageSrc)
                            newsBlock.getElementsByTagName('img')[0].style.objectFit = "cover";   
                    }
                    
                    usedNewsTitles.push(randomNews[currentNewsOrder].title);
                }
                currentNewsOrder++;
            }
        });
    }

    function shuffleArray(array) {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      return array;
    }
    
    function loadScript(url, callback) {
      var script = document.createElement( "script" )
      script.type = "text/javascript";
      if(script.readyState) {  // only required for IE <9
        script.onreadystatechange = function() {
          if ( script.readyState === "loaded" || script.readyState === "complete" ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {  //Others
        script.onload = function() {
          callback();
        };
      }
    
      script.src = url;
      document.getElementsByTagName( "head" )[0].appendChild( script );
    }

    function getPathCategory(){
        var result='/sitegeneli';
        var temp = new Array();
        var currentPath = window.location.pathname;
        var i=0;
        if(currentPath == "/")
            return "/anasayfa";

        if (currentPath.includes("/video"))
            return "/webtv";

        for(i=0; i<admList.length; i++){
            var itm = admList[i];
            if(currentPath.includes(itm)){
                temp.push(itm);
            }
        }
        var countTemp=0;
        if(temp.length>0){
            for(i=0; i<temp.length; i++){
                if(temp[i].split('/').length>countTemp){
                    result = temp[i];
                    countTemp=temp[i].split('/').length;
                }
            }
        }
        return result;
    }
    
    return {
        PgnNLog: function (message) {
            return pgnNLog(message);
        },
        GetCookie: function (cookieName) {
            return getCookie(cookieName);
        },
        GenerateRandomString: function (length) {
            return generateRandomString(length);
        },
        GetQueryStringByName: function (name) {
            return getQueryStringByName(name);
        },
        InitNativeAds: function (itm) {
            return initNativeAds(itm);
        },
        InitOutstreamAds: function(divId,placementId){
            return initOutstreamAds(divId,placementId);
        },
        LoadScript: function(url, callback){
            return loadScript(url, callback);
        }
    }
}());


var pgnnInProgress = 0;
document.addEventListener('scroll', (e) => {
    if(pgnnInProgress==0){
        pgnnInprogress = 1;
        var pgnnWidgets = document.querySelectorAll("[class^=pgn-native]");
        for (let k = 0; k < pgnnWidgets.length; k++) {
            if(pgnnWidgets[k].getAttribute("id")==null){
                var slotId = "pgn-native-id-" + PgnN.GenerateRandomString(10);
                pgnnWidgets[k].setAttribute("id", slotId);
                PgnN.PgnNLog("New box identified => " + slotId);
            }
        }
    
        for (let i = 0; i < pgnnWidgets.length; i++) {
            try{
                var pgnLazySlotId = pgnnWidgets[i].getAttribute("id");
                var itm = document.getElementById(pgnLazySlotId);
                if (itm != null && itm.getAttribute("id").includes("pgn-native-") && !pgnNativeViewedSlots.includes(pgnLazySlotId)) {
                    var bounding = itm.getBoundingClientRect();
                    if ((bounding.top - window.innerHeight) < parseInt(pgnNativeViewableOffset)) {
                        PgnN.PgnNLog(pgnLazySlotId + " now visible!");
                        PgnN.PgnNLog(pgnLazySlotId + "ad initialized from SCROLL! BoundingTop:" + bounding.top + " window Inner Height:" + window.innerHeight + " offset:" + pgnNativeViewableOffset + " bTop-Height:" + (bounding.top - window.innerHeight));
                        PgnN.InitNativeAds(pgnLazySlotId);
                    }
                }
            }catch(err){
                PgnN.PgnNLog(err.message);
            }   
        }    
    }
});
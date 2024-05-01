try {
    Object.defineProperties(Array.prototype, {
        count: {
            value: function (value) {
                return this.filter(x => x == value).length;
            }
        }
    });
} catch (e) {

}

var MobileDetect = function () { var e = this; return e.isTablet = null, e.isPhone = null, e.isDesktop = null, e.isAndroid = null, e.isIOS = null, { userAgent: navigator.userAgent.toLowerCase(), phone: function () { return null == e.isPhone && (e.isPhone = /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(this.userAgent)), e.isPhone }, tablet: function () { return null == e.isTablet && (e.isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(this.userAgent)), e.isTablet }, desktop: function () { return null == e.isDesktop && (e.isDesktop = !this.phone() && !this.tablet()), e.isDesktop }, android: function () { return null == e.isAndroid && (e.isAndroid = /(android)/.test(this.userAgent)), e.isAndroid }, IOS: function () { return null == e.isIOS && (e.isIOS = /(iphone|ipod)/.test(this.userAgent) || /(ipad)/.test(this.userAgent)), e.isIOS } } }, md = new MobileDetect; window.deviceInfo = { isMobile: md.phone(), isTablet: md.tablet(), isAndroid: md.android(), isIOS: md.IOS(), isDesktop: md.desktop() };

/*!
* verge 1.9.1+201402130803
* https://github.com/ryanve/verge
* MIT License 2013 Ryan Van Etten
*/
!function (a, b, c) { "undefined" != typeof module && module.exports ? module.exports = c() : a[b] = c() }(this, "verge", function () { function a() { return { width: k(), height: l() } } function b(a, b) { var c = {}; return b = +b || 0, c.width = (c.right = a.right + b) - (c.left = a.left - b), c.height = (c.bottom = a.bottom + b) - (c.top = a.top - b), c } function c(a, c) { return a = a && !a.nodeType ? a[0] : a, a && 1 === a.nodeType ? b(a.getBoundingClientRect(), c) : !1 } function d(b) { b = null == b ? a() : 1 === b.nodeType ? c(b) : b; var d = b.height, e = b.width; return d = "function" == typeof d ? d.call(b) : d, e = "function" == typeof e ? e.call(b) : e, e / d } var e = {}, f = "undefined" != typeof window && window, g = "undefined" != typeof document && document, h = g && g.documentElement, i = f.matchMedia || f.msMatchMedia, j = i ? function (a) { return !!i.call(f, a).matches } : function () { return !1 }, k = e.viewportW = function () { var a = h.clientWidth, b = f.innerWidth; return b > a ? b : a }, l = e.viewportH = function () { var a = h.clientHeight, b = f.innerHeight; return b > a ? b : a }; return e.mq = j, e.matchMedia = i ? function () { return i.apply(f, arguments) } : function () { return {} }, e.viewport = a, e.scrollX = function () { return f.pageXOffset || h.scrollLeft }, e.scrollY = function () { return f.pageYOffset || h.scrollTop }, e.rectangle = c, e.aspect = d, e.inX = function (a, b) { var d = c(a, b); return !!d && d.right >= 0 && d.left <= k() }, e.inY = function (a, b) { var d = c(a, b); return !!d && d.bottom >= 0 && d.top <= l() }, e.inViewport = function (a, b) { var d = c(a, b); return !!d && d.bottom >= 0 && d.right >= 0 && d.top <= l() && d.left <= k() }, e });

$.fn.isOnScreen = function (e) {
    if (this.length) {
        var t = void 0 == e ? 0 : e,
            n = window.innerHeight * t / 100,
            o = {};
        o.top = $(window).scrollTop(), o.bottom = o.top + $(window).height();
        var a = {};
        return a.top = this.offset().top + n, a.bottom = a.top + this.outerHeight() - n, a.top <= o.bottom && a.bottom >= o.top
    }
};

function IsOnScreen(element, nearVal) {
    if (verge) {
        var _value = parseInt(nearVal) || 0;
        return verge.inViewport(element, _value);
    }
    return false;
};

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }

    navigator.clipboard.writeText(text).then(function () {}, function (err) {});
}


function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
    }

    document.body.removeChild(textArea);
}

function TmdGet(requestUrl, callback, responseType, isAsync = true) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl, isAsync);
    xhr.responseType = responseType;
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            if (callback != undefined)
                callback(xhr.response);
        }
    };
    xhr.send();
}

function TmdGetJSON(requestUrl, callback, isAsync = true) {
    TmdGet(requestUrl, callback, 'json', isAsync);
}

function TmdGetHTML(requestUrl, callback, isAsync = true) {
    TmdGet(requestUrl, callback, 'text', isAsync);
}

function TmdPost(requestUrl, callback, responseType, data, contentType = null, isAsync = true) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', requestUrl, isAsync);
    if (contentType)
        xhr.setRequestHeader("Content-Type", contentType);
    xhr.responseType = responseType;
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            if (callback != undefined)
                callback(xhr.response);
        }
    };
    xhr.send(data);
}

function TmdPostJSON(requestUrl, callback, data, isAsync = true) {
    TmdPost(requestUrl, callback, 'json', JSON.stringify(data), "application/json;charset=UTF-8", isAsync);
}

Element.prototype.TmdAfter = function (stringContent) {
    let tempContent = document.createElement('div');
    tempContent.innerHTML = stringContent;
    this.after(tempContent);
    tempContent.outerHTML = tempContent.innerHTML;
};

Element.prototype.TmdAppend = function (stringContent) {
    let tempContent = document.createElement('div');
    tempContent.innerHTML = stringContent;
    this.append(tempContent);
    tempContent.outerHTML = tempContent.innerHTML;
};

Element.prototype.removeChildren = function (elements) {
    if (elements == null)
        throw ({ "InvallidArgumentException": "Argument is null" });
    if (typeof elements[Symbol.iterator] !== 'function')
        throw ({ "InvallidArgumentException": "Argument not a collection" });

    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};

HTMLCollection.prototype.toArray = function () {
    return [].slice.call(this);
};

StyleSheetList.prototype.toArray = function () {
    return [].slice.call(this);
};

NodeList.prototype.toArray = function () {
    return [].slice.call(this);
};

function StringToHTML(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body.children;
}

String.prototype.toCapitalize = function () {
    var splitStr = this.toLowerCase().split(' ');

    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
};

String.prototype.slugify = function (separator = "-") {
    return this
        .toString()
        .replaceAll('ı', 'i')
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
};

var getDayName = function (createdDate, locale) {
    var date = new Date(parseInt(createdDate.replace(/[^0-9 +]/g, '')));

    return date.toLocaleDateString(locale, { weekday: 'long' });
}

var getDate = function (createdDate, seperator = "/") {
    var date = new Date(parseInt(createdDate.replace(/[^0-9 +]/g, '')));

    var dateStr = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + date.getFullYear();
    var dayName = getDayName(createdDate, "tr-TR");

    date = date.toLocaleDateString();

    return date;
};

function PrintPage(elem, id) {
    var img_logo = $(".takvim-logo:first img:first").attr("src");
    var img_value = null, container = null, title_value = null, spot_value = null, content_container = null;

    if (window.location.pathname.startsWith("/galeri")) {
        container = $('.imgListCover[data-gallery-id="' + id + '"]');

        title_value = $(".detail-title", container).text().trim();
        spot_value = $(".detail-spot", container).text().trim();

        content_container = $(".galleryItem", container);
        if (content_container.length == 0)
            content_container = container;
    }
    else if (window.location.pathname.startsWith("/video")) {

        container = $('.container');
        img_value = $(".video-player", container).attr("src");

        title_value = $(".video-detail-title", container).text().trim();
        spot_value = $(".video-detail-spot", container).text().trim();

        content_container = $(".detail-text-content > p", container);
        if (content_container.length == 0)
            content_container = container;
    }
    else {

        container = $('.container[data-article-id="' + id + '"]');
        img_value = $(".detail-big-image:first img:first", container).attr("src");

        title_value = $(".detail-title", container).text().trim();
        spot_value = $(".detail-spot", container).text().trim();

        content_container = $(".detail-text-content > p", container);
        if (content_container.length == 0)
            content_container = container;
    }


    printProcess(img_logo, title_value, img_value, content_container, spot_value);
}

function printProcess(logo, title, image, content_container, spot) {
    var disp_setting = "toolbar=yes,scrollbars=yes,width=770, height=600";
    var docprint = window.open("", "", disp_setting);
    var htmlContent = "";

    const lazyImages = document.querySelectorAll('img');
    for (let i = 0; i < lazyImages.length; i++) {
        if (lazyImages[i].getAttribute('data-src') != null)
            lazyImages[i].src = lazyImages[i].getAttribute('data-src');
    }

    const lazySourceImages = document.querySelectorAll('source');
    for (let i = 0; i < lazySourceImages.length; i++) {
        if (lazySourceImages[i].getAttribute('data-srcset') != null)
            lazySourceImages[i].setAttribute("srcset", lazySourceImages[i].getAttribute('data-srcset'));
    }

    $.each(content_container, function (ix, el) {
        htmlContent += el.outerHTML;
    });

    htmlContent = htmlContent.replace(/<\/?a[^>]*>/g, "").replace(/<\/a>/g, "");

    var printDoc = "";
    printDoc += "<!doctype html>";
    printDoc += "<html class=\"no-js\" lang=\"en-US\">";
    printDoc += "    <head>";
    printDoc += "        <meta charset=\"utf-8\">";
    printDoc += "        <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">";
    printDoc += "        <title>" + title + " - TAKVİM<\/title> ";
    printDoc += "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
    printDoc += "        <style type=\"text\/css\">";
    printDoc += "            body{";
    printDoc += "                font-family: Arial, sans-serif;";
    printDoc += "                font-size: 14px;";
    printDoc += "                line-height: 130%;";
    printDoc += "            }  ";
    printDoc += "            header {";
    printDoc += "                padding-bottom:10px;";
    printDoc += "            }";
    printDoc += "            h1{";
    printDoc += "                line-height: 140%;";
    printDoc += "                font-size:1.8em;";
    printDoc += "            }";
    printDoc += "             h2{";
    printDoc += "                line-height: 120%;";
    printDoc += "                font-size:1.4em;";
    printDoc += "            }";
    printDoc += "        <\/style>";
    printDoc += "    <\/head>";
    printDoc += "    <body onload=\"window.print();\">";
    printDoc += "        <header>";
    printDoc += "            <img src=\"" + logo + "\">";
    printDoc += "        <\/header>";
    printDoc += "        <article>";
    printDoc += "            <h1>" + title + "</h1>";
    printDoc += (image ? "<p style=\"text-align:center\"><img src=\"" + image + "\" \/><\/p>" : "");
    printDoc += (spot ? "<h2>" + spot + "<\/h2>" : "");
    printDoc += htmlContent;
    printDoc += "        <\/article> ";
    printDoc += "    <\/body>";
    printDoc += "<\/html>";

    docprint.document.open();
    docprint.document.write(printDoc);
    docprint.document.close();
    docprint.focus();
};

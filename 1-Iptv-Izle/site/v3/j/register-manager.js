var siteId = '0E497DBB-D79A-4F7A-9BEB-7E6C1BCD7216';
function setLoginInputs() {

    let userInfo = GetUserInfo();
    if (userInfo == null) {
        $('a.footer-sign-up').click(function (e) {
            OpenRegisterUserPopup();
        });
        $('a.footer-login').click(function (e) {
            OpenLogInPopUp();
        });
    }
    else {
        $('a.footer-sign-up').click(function () {
            OpenEditUserPopup();
        });
        $('a.footer-login').attr({ 'href': '/logout' });

        $('a.footer-sign-up').html('<i class="icon-right-open"></i>' + userInfo.nameSurname);
        $('a.footer-login').html('<i class="icon-right-open"></i> Çıkış');
    }
}

function OpenLogInPopUp() {
    window.TMDAuthentication.ShowLoginPopup({
        webSiteId: siteId,
        callback: function (user) {
            document.location.reload();
        },
        cookieExpireDays: 2
    });
}
function OpenRegisterUserPopup() {
    window.TMDAuthentication.ShowRegisterPopup({ webSiteId: siteId });
}
function OpenEditUserPopup() {
    window.TMDAuthentication.ShowEditPopup({ webSiteId: siteId });
}

function GetUserInfo() {
    var cookie = decodeURIComponent(getCookie('.AuthDecr'));
    var cookieVal = '';
    let userInfo = null;
    if (cookie != null) {
        cookieVal = cookie.split('|');
    }

    if (!(cookie == null || cookieVal == null || cookieVal.length < 3)) {
        userInfo = { userId: cookieVal[1], nameSurname: cookieVal[2].replace('+', ' ') }
    }
    return userInfo;
}
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return "";
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }

    return unescape(document.cookie.substring(offset, endstr));
}

$(document).ready(function () {
    setLoginInputs();
});
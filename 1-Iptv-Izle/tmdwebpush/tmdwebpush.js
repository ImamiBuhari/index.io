var __tmdwebpush;

(function () {
    try {
        var app = initializeApp();
        if (!app || !('serviceWorker' in navigator))
            return;

        var fbMessaging;
        var recentNotif;
        loadJsFile("https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js", function () {
            loadJsFile("https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js", function () {
                var firebaseConfig = {
                    apiKey: "AIzaSyD9P16P88n4ErZL4CoHkCc-QagdKEuaXg8",
                    authDomain: "fir-webpush-28ff4.firebaseapp.com",
                    databaseURL: "https://fir-webpush-28ff4.firebaseio.com",
                    projectId: "fir-webpush-28ff4",
                    storageBucket: "fir-webpush-28ff4.appspot.com",
                    messagingSenderId: "994314251369",
                    appId: app.Config.AppId
                };
                firebase.initializeApp(firebaseConfig);

                navigator.serviceWorker.register(app.Config.SWLocation)
                    .then((registration) => {
                        fbMessaging = firebase.messaging();
                        fbMessaging.useServiceWorker(registration);
                        fbMessaging.usePublicVapidKey("BJPDcIBjMara-tULNfglKZSpruuSyolfScgfs0_-C6iDGeBphNQOLqPa4fB6Dykl85UE3-DBGlJv_tiqVX-DF4E");
                        fbMessaging.onTokenRefresh(() => {
                            app.PromptAndSubscribe();
                        });
                        fbMessaging.onMessage((data) => {
                            navigator.serviceWorker.ready.then(registration => {
                                registration.active.postMessage(data);
                            });
                        });
                        __tmdwebpush = { App: app };
                        app.PromptAndSubscribe();
                    });
            });
        });
    }
    catch (ex) { }

    function initializeApp() {
        var app;
        try {
            var appConfigs = [
                {
                    Hosts: ['www.sabah.com.tr', 'm.sabah.com.tr'],
                    AppId: '1:994314251369:web:af273ef5415d9911c846f8',
                    SubscribeApiUrl: 'https://psabah.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=5',
                    Topic: 'sabah-LIVE',
                    Segmentations: [
                        {
                            Tag: 'Ekonomi',
                            UrlFilters: ['/ekonomi', '/apara'],
                            Threshold: 5
                        },
                        {
                            Tag: 'Spor',
                            UrlFilters: ['/spor'],
                            Threshold: 5
                        },
                    ]
                },
                {
                    Hosts: ['www.takvim.com.tr', 'm.takvim.com.tr'],
                    AppId: '1:994314251369:web:16a36708298183d7c846f8',
                    SubscribeApiUrl: 'https://ptakvim.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'takvim-LIVE'
                },
                {
                    Hosts: ['www.fotomac.com.tr', 'm.fotomac.com.tr'],
                    AppId: '1:994314251369:web:308bb06abecdf933c846f8',
                    SubscribeApiUrl: 'https://pfotomac.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=6',
                    Topic: 'fotomac-LIVE'
                },
                {
                    Hosts: ['www.ahaber.com.tr', 'm.ahaber.com.tr'],
                    AppId: '1:994314251369:web:76f25b45b7623642c846f8',
                    SubscribeApiUrl: 'https://pahaber.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'ahaber-LIVE'
                },
                {
                    Hosts: ['www.aspor.com.tr', 'm.aspor.com.tr'],
                    AppId: '1:994314251369:web:373fae1fa7496d95c846f8',
                    SubscribeApiUrl: 'https://paspor.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'aspor-LIVE'
                },
                {
                    Hosts: ['www.fikriyat.com'],
                    AppId: '1:994314251369:web:7dc1a52119845470c846f8',
                    SubscribeApiUrl: 'https://pfikriyat.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'fikriyat-LIVE'
                },
                {
                    Hosts: ['www.atv.com.tr'],
                    AppId: '1:994314251369:web:0697fc5b393552eec846f8',
                    SubscribeApiUrl: 'https://patv.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'atv-LIVE'
                },
                {
                    Hosts: ['www.anews.com.tr'],
                    AppId: '1:994314251369:web:6ac9b345ea04974ec846f8',
                    SubscribeApiUrl: 'https://panews.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'anews-LIVE'
                },
                {
                    Hosts: ['www.yeniasir.com.tr'],
                    AppId: '1:994314251369:web:f76dc7bf278d7c59c846f8',
                    SubscribeApiUrl: 'https://pyeniasir.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'yeniasir-LIVE'
                },
                {
                    Hosts: ['www.apara.com.tr'],
                    AppId: '1:994314251369:web:31651f38a810f029c846f8',
                    SubscribeApiUrl: 'https://papara.tmgrup.com.tr/register',
                    SWLocation: '/webpush-sw.js?v=4',
                    Topic: 'apara-LIVE'
                },
                {
                    Hosts: ['i.tmgrup.com.tr'],
                    AppId: '1:994314251369:web:16a36708298183d7c846f8',
                    SubscribeApiUrl: 'https://ptakvim.tmgrup.com.tr/register',
                    SWLocation: 'https://i.tmgrup.com.tr/tmdwebpush/dev/webpush-sw.js?v=11',
                    Topic: 'tmgrup-APPDEV'
                }
            ];
            var host = document.location.host;
            app = {};
            app.Config = appConfigs.find(a => a.Hosts.indexOf(host.toLowerCase()) > -1);
            app.GetRecentSubscription = function () {
                try {
                    return JSON.parse(window.localStorage.getItem('push-subscription'));
                }
                catch (ex) { }
                return null;
            }
            app.Subscribe = function (token, groupName, force, callback) {
                var subscr = this.GetRecentSubscription();
                if (!force && subscr && subscr.Token == token && subscr.Group == groupName)
                    return false;

                var data = {
                    subscriberId: token,
                    subscriberBrowser: 'chrome',
                    groupName: groupName,
                    isFirebase: true
                };
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: this.Config.SubscribeApiUrl,
                    success: function (data) {
                        if (data == 'OK')
                            window.localStorage.setItem('push-subscription', JSON.stringify({ Token: token, Group: groupName }));

                        if (callback)
                            callback(data);
                    },
                    error: function (err) {
                        if (callback)
                            callback(err);
                    }
                });
                return true;
            }
            app.PromptAndSubscribe = function (groupName, force) {
                fbMessaging.getToken().then((currentToken) => {
                    if (currentToken) {
                        this.Subscribe(currentToken, groupName || this.Config.Topic, force);
                        if (typeof onTmdWebpushPermissionPrompted !== "undefined") {
                            onTmdWebpushPermissionPrompted();
                        }
                    } else {

                    }
                }).catch((err) => {
                });
            }

            if (!app.Config)
                return null;
            try {
                if (app.Config.Segmentations && app.Config.Segmentations.length > 0) {
                    var currentPath = document.location.pathname;
                    getStoredData(function (value) {
                        var storedStatuses = JSON.parse(value || '[]');
                        for (var i = 0; i < app.Config.Segmentations.length; i++) {
                            var segmentation = app.Config.Segmentations[i];
                            if (segmentation && segmentation.UrlFilters) {
                                for (var j = 0; j < segmentation.UrlFilters.length; j++) {
                                    if (currentPath.startsWith(segmentation.UrlFilters[j])) {
                                        var storedStatus = storedStatuses.find(ss => ss.Tag == segmentation.Tag);
                                        if (!storedStatus) {
                                            storedStatus = { Tag: segmentation.Tag, Count: 0, Valid: false, Expire: null };
                                            storedStatuses.push(storedStatus);
                                        }
                                        if (storedStatus.Expire && new Date() >= new Date(storedStatus.Expire)) {
                                            storedStatus.Count = 0;
                                        }
                                        storedStatus.Count++;
                                        storedStatus.Expire = new Date();
                                        storedStatus.Expire.setDate(storedStatus.Expire.getDate() + 20);

                                        if (storedStatus.Count >= segmentation.Threshold)
                                            storedStatus.Valid = true;
                                        else
                                            storedStatus.Valid = false;
                                        break;
                                    }
                                }
                            }
                        }
                        storeData(JSON.stringify(storedStatuses), 0);
                    });
                }
            }
            catch (ex) { }
        }
        catch (ex) { }
        return app;
    }

    function storeData(value) {
        try {
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

            if (indexedDB) {
                var request = indexedDB.open("WebPushSegmentation", 1);
                request.onupgradeneeded = function (event) {
                    var db = request.result;
                    var transaction;
                    var objectStore;
                    try {
                        transaction = db.transaction("Segments", "readwrite");
                    }
                    catch (ex) { }
                    if (transaction)
                        objectStore = transaction.objectStore("Segments");
                    if (!objectStore) {
                        objectStore = db.createObjectStore("Segments", { keyPath: "Key" });
                    }
                    var request2 = objectStore.clear();
                    request2.onsuccess = function (event2) {
                        objectStore.add({ Value: value, Key: "Segments" });
                    };
                }
                request.onsuccess = function (event) {
                    var db = event.target.result;
                    var transaction;
                    var objectStore;
                    try {
                        transaction = db.transaction("Segments", "readwrite");
                    }
                    catch (ex) { }
                    if (transaction)
                        objectStore = transaction.objectStore("Segments");
                    if (objectStore) {
                        var request2 = objectStore.clear();
                        request2.onsuccess = function (event2) {
                            objectStore.add({ Value: value, Key: "Segments" });
                        };
                    }
                }
            }
        }
        catch (ex) { }
    }

    function getStoredData(callback) {
        try {
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            if (indexedDB) {
                var db;
                var request = indexedDB.open("WebPushSegmentation", 1);
                request.onupgradeneeded = function (event) {
                    var db = request.result;
                    var transaction;
                    var objectStore;
                    try {
                        transaction = db.transaction("Segments", "readwrite");
                    }
                    catch (ex) { }
                    if (transaction)
                        objectStore = transaction.objectStore("Segments");
                    if (!objectStore) {
                        objectStore = db.createObjectStore("Segments", { keyPath: "Key" });
                    }
                }
                request.onsuccess = function (event) {
                    db = event.target.result;
                    var transaction;
                    var objectStore;
                    try {
                        transaction = db.transaction("Segments", "readwrite");
                        objectStore = transaction.objectStore("Segments");
                        var request2 = objectStore.get("Segments");
                        request2.onsuccess = function (event2) {
                            callback(request2.result ? request2.result.Value : null);
                        };
                    }
                    catch (ex) {
                        return callback(null);
                    }
                };
                request.onerror = function (event) {
                    return callback(null);
                }
            }
        }
        catch (ex) { return callback(null); }
    }

    function setCookie(cname, cvalue, durationMinutes) {
        var d = new Date();
        d.setTime(d.getTime() + (durationMinutes * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function loadJsFile(path, callback) {
        jQuery.ajax({
            url: path,
            dataType: 'script',
            success: callback,
            async: true,
            cache: true
        });
    }
})();
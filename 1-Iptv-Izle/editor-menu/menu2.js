$(function() {
	try {
		var allowMenu = false;
		var cookie = $.cookie(".AuthDecr");
		if(cookie != null) {
			var cookieItems = cookie.split("|");
			if(cookieItems.length > 5) {
				if(cookieItems[5] != "null")
					allowMenu = true;
			}
        }

        var tmdStatsManager = {
            isAllowed: function () {
                var tmdStatsAllowedUrls = ['https://www.sabah.com.tr', 'http://sabah-staging.dev.tmd', 'https://www.takvim.com.tr', 'http://takvim-staging.dev.tmd', 'https://www.ahaber.com.tr', 'http://ahaber-staging.dev.tmd', 'https://www.fotomac.com.tr', 'http://fotomac-staging.dev.tmd', 'https://www.aspor.com.tr', 'http://aspor-staging.dev.tmd', 'https://www.fikriyat.com', 'http://fikriyat-staging.dev.tmd', 'https://www.yeniasir.com.tr', 'http://yeniasir-staging.dev.tmd'];
                if (tmdStatsAllowedUrls.indexOf(window.location.href.replace(/\/$/, "")) > -1) {
                    return true;
                }
                return false;
            },
            isActive: function () {
                return window.localStorage.getItem('tmdStatViewerActive') == 'true';
            },
            setActiveStatus: function (status) {
                window.localStorage.setItem('tmdStatViewerActive', status);
            },
            reloadTmdStats: function () {
                if (this.isActive()) {
                    if (typeof __tmdstatviewer === 'undefined') {
                        loadJsFile('https://i.tmgrup.com.tr/tmdStatViewer/tmdStatViewer.js?43', function () {
                            if (typeof __tmdstatviewer !== 'undefined')
                                __tmdstatviewer.reloadStats();
                        });
                    }
                    else
                        __tmdstatviewer.reloadStats();
                }
            },
            unloadTmdStats: function () {
                if (typeof __tmdstatviewer !== 'undefined') {
                    __tmdstatviewer.unloadStats();
                }
            }
        }

		if(allowMenu) {
			$.ajax({
                url: "https://i.tmgrup.com.tr/editor-menu/jquery.contextMenu.js",
                crossDomain: true,
                dataType: "script",
                cache: true,
                error: function () { console.log("Editör menüsü yüklenemedi"); },
				success: function() {
					$("head").append('<link rel="stylesheet" type="text/css" href="https://i.tmgrup.com.tr/editor-menu/jquery.contextMenu.css?v2" media="screen" />');
					$("body").append('<img src="https://i.tmgrup.com.tr/editor-menu/img/tools2.png" class="admin-shortcut" />');

                    var items = {
                        "Haber": {
                            "name": "Haber",
                            "icon": "edit",
                            "items": {
                                "HaberEkle": { "name": "Yeni", "icon": "add" },
                                "HaberGuncelle": { "name": "Güncelle", "icon": "edit" },
                                "HaberYorumOnay": { "name": "Yorumları Onayla", "icon": "paste" }
                            }
                        },
                        "Sep1": "---------",
                        "Video": {
                            "name": "Video",
                            "icon": "edit",
                            "items": {
                                "VideoEkle": { "name": "Yeni", "icon": "add" },
                                "VideoGuncelle": { "name": "Güncelle", "icon": "edit" },
                                "VideoYorumOnay": { "name": "Yorumları Onayla", "icon": "paste" }
                            }
                        },
                        "Sep2": "---------",
                        "Album": {
                            "name": "Galeri/Fotohaber",
                            "icon": "edit",
                            "items": {
                                "AlbumEkle": {
                                    "name": "Yeni",
                                    "icon": "add",
                                    "items": {
                                        "AlbumGaleriEkle": { "name": "Galeri", "icon": "add" },
                                        "AlbumFotohaberEkle": { "name": "Fotohaber", "icon": "add" }
                                    }
                                },
                                "AlbumGuncelle": { "name": "Güncelle", "icon": "edit" },
                                "AlbumYorumOnay": { "name": "Yorumları Onayla", "icon": "paste" }
                            }
                        },
                        "Sep3": "---------",
                        "OnbellegiTemizle": { name: "Önbelleği Temizle", "icon": "delete" },
                        "Sep4": "---------",
                        "YonetimPaneli": { name: "Yönetim Paneli", "icon": "add" }
                    };

                    if (tmdStatsManager.isAllowed()) {
                        items["Sep5"] = "---------";
                        items["TmdStats"] = { name: "İstatistikleri Aç/Kapat", "icon": "paste" };
                    }

					$.contextMenu({
						selector: '.admin-shortcut',
						className: 'admin-css-title',
						trigger: 'left',
						items: items,
						callback: function(key, options) {
							var site = window.location.hostname;
							var uri = window.location.href;
							
                            var editorUrl = "http://" + (site == "www.sabah.com.tr" || site == "www.fotomac.com.tr" ? "editor" : "cms") + ".tmgrup.com.tr";
							var editorRedirectUrl = editorUrl + "/v2/Accelerate/SetWebSiteAndRedirectUrl?site=" + uri + "&url="
						
							// HABER
							if(key == "HaberEkle")
								window.open(editorUrl + "/v2/Accelerate/ArticleProcess?type=Yeni&url=" + uri);
							else if(key == "HaberGuncelle")
								window.open(editorUrl + "/v2/Accelerate/ArticleProcess?type=Guncelle&url=" + uri);
							else if(key == "HaberYorumOnay")
								window.open(editorUrl + "/v2/Accelerate/ArticleProcess?type=YorumOnay&url=" + uri);
							
							// VİDEO
							if(key == "VideoEkle")
								window.open(editorUrl + "/v2/Accelerate/VideoProcess?type=Yeni&url=" + uri);
							else if(key == "VideoGuncelle")
								window.open(editorUrl + "/v2/Accelerate/VideoProcess?type=Guncelle&url=" + uri);
							else if(key == "VideoYorumOnay")
								window.open(editorUrl + "/v2/Accelerate/VideoProcess?type=YorumOnay&url=" + uri);
							
							// ALBÜM
                            if (key == "AlbumGaleriEkle")
                                window.open(editorUrl + "/v2/Accelerate/AlbumProcess?type=YeniGaleri&url=" + uri);
                            else if (key == "AlbumFotohaberEkle")
                                window.open(editorUrl + "/v2/Accelerate/AlbumProcess?type=YeniFotohaber&url=" + uri);
                            else if (key == "AlbumGuncelle")
                                window.open(editorUrl + "/v2/Accelerate/AlbumProcess?type=Guncelle&url=" + uri);
                            else if (key == "AlbumYorumOnay")
                                window.open(editorUrl + "/v2/Accelerate/AlbumProcess?type=YorumOnay&url=" + uri);

                            // GENEL
                            else if (key == "OnbellegiTemizle")
                                window.open(editorUrl + "/v2/Accelerate/CacheProcess?url=" + uri);
                            else if (key == "YonetimPaneli")
                                window.open(editorRedirectUrl + "/v2/admin/anasayfa");
                            else if (key == "TmdStats") {
                                var isActive = tmdStatsManager.isActive();
                                tmdStatsManager.setActiveStatus(!isActive);
                                if (!isActive) {
                                    tmdStatsManager.reloadTmdStats();
                                }
                                else {
                                    tmdStatsManager.unloadTmdStats();
                                }
                            }
						}
					});
				}
            });

            var statsLoaded = false;
            if (tmdStatsManager.isAllowed()) {
                if (document.hasFocus()) {
                    tmdStatsManager.reloadTmdStats();
                }
                else {
                    window.onfocus = function () {
                        if (!statsLoaded) {
                            tmdStatsManager.reloadTmdStats();
                            statsLoaded = true;
                        }
                    }
                }
            }
		}
	}
	catch(err) {
		console.log("EditorMenu (" + err.message + ")");
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
});
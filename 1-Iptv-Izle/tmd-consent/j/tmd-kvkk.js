$(function () {
    if ($.cookie) {
        var _isApp = getParameterByName("isapp") != undefined && (getParameterByName("isapp").toLowerCase() == "1" || getParameterByName("isapp").toLowerCase() == "true");

        if (_isApp)
            return;

        var _isEU = $.cookie("tmd_gdpr") != null && $.cookie("tmd_gdpr") != 3;

        if (_isEU)
            return;

        var _cookieName = "tmd_kvkk",
            _cookieValue = getStorage(_cookieName) != null ? getStorage(_cookieName).split(",") : "",
            _virtualPath = "/" + (typeof (_kvkkLang) !== "undefined" ? _kvkkLang : "");

        _cookieValue = !$.isArray(_cookieValue) ? [] : _cookieValue;

		//alert(getStorage(_cookieName));

        if ($.inArray(_virtualPath, _cookieValue) == -1) {
            try {
                $("head").append("<link rel=\"stylesheet\" rel=\"preload\" href=\"https://i.tmgrup.com.tr/tmd-consent/c/tmd-kvkk.css\" as=\"style\" type=\"text/css\" />");

                var _html = "";
                _html += "<div class=\"txt\">";

                // Start - Site ana dili
                if (typeof (_kvkkLang) !== "undefined") {
                    var _innerHtml = "";

                    if (_kvkkLang == "en") {
                        _innerHtml += "Please ";
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#privacyEn\" target=\"_blank\">click</a>";
                        _innerHtml += "to read our informative text prepared pursuant to the Law on the Protection of Personal Data No. 6698 and to get information about the ";
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#cookiesEn\" target=\"_blank\">cookies</a> used on our website in accordance with the relevant legislation.";
                    }
                    else if (_kvkkLang == "de") {
                        _innerHtml += "Bitte ";
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#privacyDe\" target=\"_blank\">klicken</a>";
                        _innerHtml += " Sie hier, um den Aufklärungstext, der gemäß Gesetz Nr. 6698 zum Schutz personenbezogener Daten erstellt wurde, und um Informationen zu ";
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#cookiesDe\" target=\"_blank\">Cookies</a>";
                        _innerHtml += " zu erhalten, die wir in Übereinstimmung mit einschlägigen Gesetzen auf unserer Website verwenden.";
                    }
                    else if (_kvkkLang == "ru") {
                        _innerHtml += "Чтобы прочесть информационный лист, составленное в соответствии Закону №6698 «О защите персональных данных», а также получить информацию ";
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#cookiesRu\" target=\"_blank\">о cookie-файлах</a>";
                        _innerHtml += ", используемых на нашем сайте в соответствии с применимым законодательством";
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#privacyRu\" target=\"_blank\">, нажмите здесь.</a>";
                    }
                    else if (_kvkkLang == "ar") {
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#privacyAr\" target=\"_blank\"> يُرجى النقر هنا</a>";
                        _innerHtml += "لقراءة نص التوعية الذي قمنا بإعداده بما يتوافق مع قانون حماية البيانات الشخصية رقم 6698، وللحصول على معلومات";
                        _innerHtml += "<a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#cookiesAr\" target=\"_blank\">متعلقة بملفات الارتباط </a>";
                        _innerHtml += " المستخدمة في موقعنا بما يتوافق مع التشريعات ذات الصلة";
                    }

                    _html += _innerHtml != "" ? "  <span>" + _innerHtml + "  </span>" : "";
                }
                // End - Site ana dili

                // Start - Default Turkce metin
                _html += "  <span class = 'tr'>";
                _html += "      6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca hazırlanmış aydınlatma metnimizi okumak ve sitemizde ilgili mevzuata uygun olarak kullanılan ";
                _html += "      <a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#cookies\" target=\"_blank\">çerezlerle</a>";
                _html += " ilgili bilgi almak için lütfen ";
                _html += "      <a href=\"" + (typeof (_kvkkLink) === "undefined" ? "/veri-politikasi" : _kvkkLink) + "#privacy\" target=\"_blank\">tıklayınız. </a>";
                _html += "  </span>";
                // End - Default Turkce metin

                _html += "  <span class=\"close\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span>";
                _html += "</div>";

                var _container = $("<div />");
                $(_container).addClass("veriAltBar");
                $(_container).append(_html);

                $("span.close", $(_container)).click(function () {
                    _cookieValue.push(_virtualPath);                   
					
					setStorage(_cookieName, _cookieValue,30);
					
                    $('.stickyLink').css("bottom", "");

                    $(this).parent().parent().remove();
					//alert(getStorage(_cookieName));
                })

                setTimeout(function () {
                    $("body").append($(_container));

                    if ($("span.close", $(_container)).length > 0)
                        $(".stickyLink").css("bottom", $(_container).outerHeight(true));
                }, 2000);
            }
            catch (ex) {
            }
        }
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
	
	
	// ------------------------------------------------------------------------------------------------
	// Bu Javascript yapılan ilk versiyonla jQuery Cookie kütüphanesiyle yapılmış,
	// ancak iPhone safalerilerde bazı sorunlarla karşılaşılmıştı.
	// Buna istinaden localStorage sistemine geçilmiş ve sorunun ortadan kalktığı gözlemlenmiştir.
	// 
	// Normalde expires süresi olmayan localStorage için aşağıdaki şekilde 3 fonksiyon tanımlanmış,
	// expires time olayı etkin hale getirilmiştir.
	//
	// removeStorage => Süresi dolmuş localStorage'ı siler
	// getStorage => Kayıtlı localStorage objesini çeker
	// setStorage => localStorage objesi tanımlar. Expires olarak vereceğimiz değer gün değeridir.	
	// 
	// Süleyman Çetiner - 26.08.2019
	// ------------------------------------------------------------------------------------------------
	
	
	function removeStorage(name) {
		try {
			localStorage.removeItem(name);
			localStorage.removeItem(name + '_expiresIn');
		} catch(e) {
			//console.log('removeStorage: localStorage silinirken hata oluştu => ['+ key + '] from localStorage: ' + JSON.stringify(e) );
			return false;
		}
		return true;
	}
		
	
	function getStorage(key) {

		var now = Date.now();  		
		var expiresIn = localStorage.getItem(key+'_expiresIn');
		if (expiresIn===undefined || expiresIn===null) { expiresIn = 0; }

		if (expiresIn < now) { // süresi dolmuşsa localStorage değerini ve bu değer ile tuttuğumuz expiresIn değerini siliyoruz.
			removeStorage(key);
			return null;
		} else {
			try {
				var value = localStorage.getItem(key);
				return value;
			} catch(e) {
				console.log('getStorage: Error reading key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
				return null;
			}
		}
	}
	
	
	
	function setStorage(key, value, expires) {

		if (expires===undefined || expires===null) {
			expires = 1;  // Eğer expires boş gelirse default olarak 1 gün atıyoruz.
		} else {
			expires = Math.abs(expires); //Gelen expires değeri negatif yani -3, -5 bile gelse biz onu 3, 5 gibi tamsayıya çeviriyoruz.
			
			//Test için yukarıdaki satırı kapatıp aşağıdaki satırı açtığımızda localStorage'ın 20 saniyede silindiğini gözlemledik.
			//expires = 20
		}

		var now = Date.now();  //millisecs since epoch time, lets deal only with integer
		var schedule = now + (expires*24*60*60*1000); 
		try {
			localStorage.setItem(key, value);
			localStorage.setItem(key + '_expiresIn', schedule);
		} catch(e) {
			//console.log('setStorage: localStorage eklenirken hata oluştu => ['+ key + '] in localStorage: ' + JSON.stringify(e) );
			return false;
		}
		return true;
	}
	
});
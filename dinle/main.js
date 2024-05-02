$(function () {
    jQuery.timer = function (interval, callback){var interval = interval || 100;if (!callback)return false;_timer = function (interval, callback) {this.stop = function () {clearInterval(self.id);};this.internalCallback = function () {callback(self);};this.reset = function (val) {if (self.id)clearInterval(self.id);var val = val || 100;this.id = setInterval(this.internalCallback, val);};this.interval = interval;this.id = setInterval(this.internalCallback, this.interval);var self = this;};return new _timer(interval, callback); };

    function trUpperCase(e) {
        if(typeof(e) != "undefined" && e !== null){
            e = e.replace(new RegExp('ğ', 'g'),'Ğ');
            e = e.replace(new RegExp('ü', 'g'),'Ü');
            e = e.replace(new RegExp('ş', 'g'),'Ş');
            e = e.replace(new RegExp('i', 'g'),'İ');
            e = e.replace(new RegExp('ö', 'g'),'Ö');
            e = e.replace(new RegExp('ç', 'g'),'Ç');
            e = e.replace(new RegExp('ı', 'g'),'I');
            e = e.toUpperCase();
        }
        return e;

    };
 
 

})


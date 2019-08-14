!function (a, b, c) {
    "use strict";
    "undefined" != typeof module && module.exports ? module.exports = c() : "function" == typeof define && define.amd ? define(c) : b[a] = c()
}("FcontrolFingerprint", this, function () {
    "use strict";
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        var c;
        if (null == this)throw new TypeError("'this' is null or undefined");
        var d = Object(this), e = d.length >>> 0;
        if (0 === e)return -1;
        var f = +b || 0;
        if (Math.abs(f) === 1 / 0 && (f = 0), f >= e)return -1;
        for (c = Math.max(f >= 0 ? f : e - Math.abs(f), 0); e > c;) {
            if (c in d && d[c] === a)return c;
            c++
        }
        return -1
    });
    var a = function (a) {
        var b = {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf",
            sortPluginsFor: [/palemoon/i]
        };
        this.options = this.extend(a, b), this.nativeForEach = Array.prototype.forEach, this.nativeMap = Array.prototype.map
    };
    return a.prototype = {
        extend: function (a, b) {
            if (null == a)return b;
            for (var c in a)null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
            return b
        }, log: function (a) {
            window.console && console.log(a)
        }, get: function (b) {
            var c = [];
            c = this.userAgentKey(c), c = this.languageKey(c), c = this.colorDepthKey(c), c = this.timezoneOffsetKey(c), c = this.sessionStorageKey(c), c = this.localStorageKey(c), c = this.indexedDbKey(c), c = this.addBehaviorKey(c), c = this.openDatabaseKey(c), c = this.cpuClassKey(c), c = this.platformKey(c), c = this.doNotTrackKey(c), c = this.pluginsKey(c), c = this.canvasKey(c), c = this.webglKey(c), c = this.adBlockKey(c), c = this.hasLiedLanguagesKey(c), c = this.hasLiedResolutionKey(c), c = this.hasLiedOsKey(c), c = this.hasLiedBrowserKey(c), c = this.touchSupportKey(c);
            var d = this;
            this.fontsKey(c, function (c) {
                var e = d.x64hash128(c.join("~~~"), 31), f = new Object, g = new a;
                return f.deviceId = e, f.userAgentKey = g.keyToObject(g.userAgentKey([])), f.languageKey = g.keyToObject(g.languageKey([])), f.timezoneOffsetKey = g.keyToObject(g.timezoneOffsetKey([])), f.cpuClassKey = g.keyToObject(g.cpuClassKey([])), f.platformKey = g.keyToObject(g.platformKey([])), b(f)
            })
        }, userAgentKey: function (a) {
            return this.options.excludeUserAgent || a.push(this.getUserAgent()), a
        }, getUserAgent: function () {
            return navigator.userAgent
        }, languageKey: function (a) {
            return this.options.excludeLanguage || a.push(navigator.language), a
        }, colorDepthKey: function (a) {
            return this.options.excludeColorDepth || a.push(screen.colorDepth), a
        }, screenResolutionKey: function (a) {
            return this.options.excludeScreenResolution ? a : this.getScreenResolution(a)
        }, getScreenResolution: function (a) {
            var b, c;
            return b = this.options.detectScreenOrientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : screen.width + " X " + screen.height, "undefined" != typeof b && a.push(b), screen.availWidth && screen.availHeight && (c = this.options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight] : screen.availHeight + " X " + screen.availWidth), "undefined" != typeof c && a.push(c), a
        }, timezoneOffsetKey: function (a) {
            return this.options.excludeTimezoneOffset || a.push((new Date).getTimezoneOffset()), a
        }, sessionStorageKey: function (a) {
            return !this.options.excludeSessionStorage && this.hasSessionStorage() && a.push("sessionStorageKey"), a
        }, localStorageKey: function (a) {
            return !this.options.excludeSessionStorage && this.hasLocalStorage() && a.push("localStorageKey"), a
        }, indexedDbKey: function (a) {
            return !this.options.excludeIndexedDB && this.hasIndexedDB() && a.push("indexedDbKey"), a
        }, addBehaviorKey: function (a) {
            return document.body && !this.options.excludeAddBehavior && document.body.addBehavior && a.push("addBehaviorKey"), a
        }, openDatabaseKey: function (a) {
            return !this.options.excludeOpenDatabase && window.openDatabase && a.push("openDatabase"), a
        }, cpuClassKey: function (a) {
            return this.options.excludeCpuClass || a.push(this.getNavigatorCpuClass()), a
        }, platformKey: function (a) {
            return this.options.excludePlatform || a.push(this.getNavigatorPlatform()), a
        }, doNotTrackKey: function (a) {
            return this.options.excludeDoNotTrack || a.push(this.getDoNotTrack()), a
        }, canvasKey: function (a) {
            return !this.options.excludeCanvas && this.isCanvasSupported() && a.push(this.getCanvasFp()), a
        }, webglKey: function (a) {
            return this.options.excludeWebGL ? ("undefined" == typeof NODEBUG && this.log("Skipping WebGL fingerprinting per excludeWebGL configuration option"), a) : this.isWebGlSupported() ? (a.push(this.getWebglFp()), a) : ("undefined" == typeof NODEBUG && this.log("Skipping WebGL fingerprinting because it is not supported in this browser"), a)
        }, adBlockKey: function (a) {
            return this.options.excludeAdBlock || a.push(this.getAdBlock()), a
        }, hasLiedLanguagesKey: function (a) {
            return this.options.excludeHasLiedLanguages || a.push(this.getHasLiedLanguages()), a
        }, hasLiedResolutionKey: function (a) {
            return this.options.excludeHasLiedResolution || a.push(this.getHasLiedResolution()), a
        }, hasLiedOsKey: function (a) {
            return this.options.excludeHasLiedOs || a.push(this.getHasLiedOs()), a
        }, hasLiedBrowserKey: function (a) {
            return this.options.excludeHasLiedBrowser || a.push(this.getHasLiedBrowser()), a
        }, fontsKey: function (a, b) {
            return this.options.excludeJsFonts ? this.flashFontsKey(a, b) : this.jsFontsKey(a, b)
        }, flashFontsKey: function (a, b) {
            return this.options.excludeFlashFonts ? ("undefined" == typeof NODEBUG && this.log("Skipping flash fonts detection per excludeFlashFonts configuration option"), b(a)) : this.hasSwfObjectLoaded() ? this.hasMinFlashInstalled() ? "undefined" == typeof this.options.swfPath ? ("undefined" == typeof NODEBUG && this.log("To use Flash fonts detection, you must pass a valid swfPath option, skipping Flash fonts enumeration"), b(a)) : void this.loadSwfAndDetectFonts(function (c) {
                a.push(c.join(";")), b(a)
            }) : ("undefined" == typeof NODEBUG && this.log("Flash is not installed, skipping Flash fonts enumeration"), b(a)) : ("undefined" == typeof NODEBUG && this.log("Swfobject is not detected, Flash fonts enumeration is skipped"), b(a))
        }, jsFontsKey: function (a, b) {
            return setTimeout(function () {
                var c = ["monospace", "sans-serif", "serif"], d = "mmmmmmmmmmlli", e = "72px", f = document.getElementsByTagName("body")[0], g = document.createElement("span");
                g.style.fontSize = e, g.innerHTML = d;
                var h = {}, i = {};
                for (var j in c)g.style.fontFamily = c[j], f.appendChild(g), h[c[j]] = g.offsetWidth, i[c[j]] = g.offsetHeight, f.removeChild(g);
                for (var k = function (a) {
                    var b = !1;
                    for (var d in c) {
                        g.style.fontFamily = a + "," + c[d], f.appendChild(g);
                        var e = g.offsetWidth !== h[c[d]] || g.offsetHeight !== i[c[d]];
                        f.removeChild(g), b = b || e
                    }
                    return b
                }, l = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andale Mono", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Bitstream Vera Sans Mono", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Book Antiqua", "Bookman Old Style", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Calibri", "Californian FB", "Calisto MT", "Calligrapher", "Cambria", "Cambria Math", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Century", "Century Gothic", "Century Schoolbook", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Comic Sans", "Comic Sans MS", "Consolas", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Courier", "Courier New", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "Devanagari Sangam MN", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "Franklin Gothic", "Franklin Gothic Book", "Franklin Gothic Demi", "Franklin Gothic Demi Cond", "Franklin Gothic Heavy", "Franklin Gothic Medium", "Franklin Gothic Medium Cond", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Garamond", "Gautami", "Geeza Pro", "Geneva", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "Georgia", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Helvetica", "Helvetica Neue", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Impact", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Monaco", "Mongolian Baiti", "MONO", "Monotype Corsiva", "MoolBoran", "Mrs Eaves", "MS Gothic", "MS LineDraw", "MS Mincho", "MS Outlook", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS Reference Specialty", "MS Sans Serif", "MS Serif", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "MYRIAD", "MYRIAD PRO", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Palatino", "Palatino Linotype", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tahoma", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Times", "Times New Roman", "Times New Roman PS", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Trebuchet MS", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Verdana", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "Wingdings", "Wingdings 2", "Wingdings 3", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"], m = [], n = 0, o = l.length; o > n; n++)k(l[n]) && m.push(l[n]);
                a.push(m.join(";")), b(a)
            }, 1)
        }, pluginsKey: function (a) {
            return this.options.excludePlugins || (this.isIE() ? a.push(this.getIEPluginsString()) : a.push(this.getRegularPluginsString())), a
        }, getRegularPluginsString: function () {
            for (var a = [], b = 0, c = navigator.plugins.length; c > b; b++)a.push(navigator.plugins[b]);
            return this.pluginsShouldBeSorted() && (a = a.sort(function (a, b) {
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
            })), this.map(a, function (a) {
                var b = this.map(a, function (a) {
                    return [a.type, a.suffixes].join("~")
                }).join(",");
                return [a.name, a.description, b].join("::")
            }, this).join(";")
        }, getIEPluginsString: function () {
            if (window.ActiveXObject) {
                var a = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
                return this.map(a, function (a) {
                    try {
                        return new ActiveXObject(a), a
                    } catch (b) {
                        return null
                    }
                }).join(";")
            }
            return ""
        }, pluginsShouldBeSorted: function () {
            for (var a = !1, b = 0, c = this.options.sortPluginsFor.length; c > b; b++) {
                var d = this.options.sortPluginsFor[b];
                if (navigator.userAgent.match(d)) {
                    a = !0;
                    break
                }
            }
            return a
        }, touchSupportKey: function (a) {
            return this.options.excludeTouchSupport || a.push(this.getTouchSupport()), a
        }, hasSessionStorage: function () {
            try {
                return !!window.sessionStorage
            } catch (a) {
                return !0
            }
        }, hasLocalStorage: function () {
            try {
                return !!window.localStorage
            } catch (a) {
                return !0
            }
        }, hasIndexedDB: function () {
            return !!window.indexedDB
        }, getNavigatorCpuClass: function () {
            return navigator.cpuClass ? "navigatorCpuClass: " + navigator.cpuClass : "navigatorCpuClass: unknown"
        }, getNavigatorPlatform: function () {
            return navigator.platform ? "navigatorPlatform: " + navigator.platform : "navigatorPlatform: unknown"
        }, getDoNotTrack: function () {
            return navigator.doNotTrack ? "doNotTrack: " + navigator.doNotTrack : "doNotTrack: unknown"
        }, getTouchSupport: function () {
            var a = 0, b = !1;
            "undefined" != typeof navigator.maxTouchPoints ? a = navigator.maxTouchPoints : "undefined" != typeof navigator.msMaxTouchPoints && (a = navigator.msMaxTouchPoints);
            try {
                document.createEvent("TouchEvent"), b = !0
            } catch (c) {
            }
            var d = "ontouchstart" in window;
            return [a, b, d]
        }, getCanvasFp: function () {
            var a = [], b = document.createElement("canvas");
            b.width = 2e3, b.height = 200, b.style.display = "inline";
            var c = b.getContext("2d");
            return c.rect(0, 0, 10, 10), c.rect(2, 2, 6, 6), a.push("canvas winding:" + (c.isPointInPath(5, 5, "evenodd") === !1 ? "yes" : "no")), c.textBaseline = "alphabetic", c.fillStyle = "#f60", c.fillRect(125, 1, 62, 20), c.fillStyle = "#069", this.options.dontUseFakeFontInCanvas ? c.font = "11pt Arial" : c.font = "11pt no-real-font-123", c.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15), c.fillStyle = "rgba(102, 204, 0, 0.7)", c.font = "18pt Arial", c.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45), c.globalCompositeOperation = "multiply", c.fillStyle = "rgb(255,0,255)", c.beginPath(), c.arc(50, 50, 50, 0, 2 * Math.PI, !0), c.closePath(), c.fill(), c.fillStyle = "rgb(0,255,255)", c.beginPath(), c.arc(100, 50, 50, 0, 2 * Math.PI, !0), c.closePath(), c.fill(), c.fillStyle = "rgb(255,255,0)", c.beginPath(), c.arc(75, 100, 50, 0, 2 * Math.PI, !0), c.closePath(), c.fill(), c.fillStyle = "rgb(255,0,255)", c.arc(75, 75, 75, 0, 2 * Math.PI, !0), c.arc(75, 75, 25, 0, 2 * Math.PI, !0), c.fill("evenodd"), a.push("canvas fp:" + b.toDataURL()), a.join("~")
        }, getWebglFp: function () {
            var a, b = function (b) {
                return a.clearColor(0, 0, 0, 1), a.enable(a.DEPTH_TEST), a.depthFunc(a.LEQUAL), a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT), "[" + b[0] + ", " + b[1] + "]"
            }, c = function (a) {
                var b, c = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return c ? (b = a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === b && (b = 2), b) : null
            };
            if (a = this.getWebglCanvas(), !a)return null;
            var d = [], e = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}", f = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}", g = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, g);
            var h = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            a.bufferData(a.ARRAY_BUFFER, h, a.STATIC_DRAW), g.itemSize = 3, g.numItems = 3;
            var i = a.createProgram(), j = a.createShader(a.VERTEX_SHADER);
            a.shaderSource(j, e), a.compileShader(j);
            var k = a.createShader(a.FRAGMENT_SHADER);
            return a.shaderSource(k, f), a.compileShader(k), a.attachShader(i, j), a.attachShader(i, k), a.linkProgram(i), a.useProgram(i), i.vertexPosAttrib = a.getAttribLocation(i, "attrVertex"), i.offsetUniform = a.getUniformLocation(i, "uniformOffset"), a.enableVertexAttribArray(i.vertexPosArray), a.vertexAttribPointer(i.vertexPosAttrib, g.itemSize, a.FLOAT, !1, 0, 0), a.uniform2f(i.offsetUniform, 1, 1), a.drawArrays(a.TRIANGLE_STRIP, 0, g.numItems), null != a.canvas && d.push(a.canvas.toDataURL()), d.push("extensions:" + a.getSupportedExtensions().join(";")), d.push("webgl aliased line width range:" + b(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE))), d.push("webgl aliased point size range:" + b(a.getParameter(a.ALIASED_POINT_SIZE_RANGE))), d.push("webgl alpha bits:" + a.getParameter(a.ALPHA_BITS)), d.push("webgl antialiasing:" + (a.getContextAttributes().antialias ? "yes" : "no")), d.push("webgl blue bits:" + a.getParameter(a.BLUE_BITS)), d.push("webgl depth bits:" + a.getParameter(a.DEPTH_BITS)), d.push("webgl green bits:" + a.getParameter(a.GREEN_BITS)), d.push("webgl max anisotropy:" + c(a)), d.push("webgl max combined texture image units:" + a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), d.push("webgl max cube map texture size:" + a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE)), d.push("webgl max fragment uniform vectors:" + a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS)), d.push("webgl max render buffer size:" + a.getParameter(a.MAX_RENDERBUFFER_SIZE)), d.push("webgl max texture image units:" + a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS)), d.push("webgl max texture size:" + a.getParameter(a.MAX_TEXTURE_SIZE)), d.push("webgl max varying vectors:" + a.getParameter(a.MAX_VARYING_VECTORS)), d.push("webgl max vertex attribs:" + a.getParameter(a.MAX_VERTEX_ATTRIBS)), d.push("webgl max vertex texture image units:" + a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), d.push("webgl max vertex uniform vectors:" + a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS)), d.push("webgl max viewport dims:" + b(a.getParameter(a.MAX_VIEWPORT_DIMS))), d.push("webgl red bits:" + a.getParameter(a.RED_BITS)), d.push("webgl renderer:" + a.getParameter(a.RENDERER)), d.push("webgl shading language version:" + a.getParameter(a.SHADING_LANGUAGE_VERSION)), d.push("webgl stencil bits:" + a.getParameter(a.STENCIL_BITS)), d.push("webgl vendor:" + a.getParameter(a.VENDOR)), d.push("webgl version:" + a.getParameter(a.VERSION)), a.getShaderPrecisionFormat ? (d.push("webgl vertex shader high float precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).precision), d.push("webgl vertex shader high float precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).rangeMin), d.push("webgl vertex shader high float precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).rangeMax), d.push("webgl vertex shader medium float precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).precision), d.push("webgl vertex shader medium float precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).rangeMin), d.push("webgl vertex shader medium float precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).rangeMax), d.push("webgl vertex shader low float precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT).precision), d.push("webgl vertex shader low float precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT).rangeMin), d.push("webgl vertex shader low float precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT).rangeMax), d.push("webgl fragment shader high float precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).precision), d.push("webgl fragment shader high float precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).rangeMin), d.push("webgl fragment shader high float precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).rangeMax), d.push("webgl fragment shader medium float precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).precision), d.push("webgl fragment shader medium float precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).rangeMin), d.push("webgl fragment shader medium float precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).rangeMax), d.push("webgl fragment shader low float precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT).precision), d.push("webgl fragment shader low float precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT).rangeMin), d.push("webgl fragment shader low float precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT).rangeMax), d.push("webgl vertex shader high int precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT).precision), d.push("webgl vertex shader high int precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT).rangeMin), d.push("webgl vertex shader high int precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT).rangeMax), d.push("webgl vertex shader medium int precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT).precision), d.push("webgl vertex shader medium int precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT).rangeMin), d.push("webgl vertex shader medium int precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT).rangeMax), d.push("webgl vertex shader low int precision:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT).precision), d.push("webgl vertex shader low int precision rangeMin:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT).rangeMin), d.push("webgl vertex shader low int precision rangeMax:" + a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT).rangeMax), d.push("webgl fragment shader high int precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT).precision), d.push("webgl fragment shader high int precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT).rangeMin), d.push("webgl fragment shader high int precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT).rangeMax), d.push("webgl fragment shader medium int precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT).precision), d.push("webgl fragment shader medium int precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT).rangeMin), d.push("webgl fragment shader medium int precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT).rangeMax), d.push("webgl fragment shader low int precision:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT).precision), d.push("webgl fragment shader low int precision rangeMin:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT).rangeMin), d.push("webgl fragment shader low int precision rangeMax:" + a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT).rangeMax), d.join("~")) : ("undefined" == typeof NODEBUG && this.log("WebGL fingerprinting is incomplete, because your browser does not support getShaderPrecisionFormat"), d.join("~"))
        }, getAdBlock: function () {
            var a = document.createElement("div");
            return a.setAttribute("id", "ads"), document.body.appendChild(a), document.getElementById("ads") ? !1 : !0
        }, getHasLiedLanguages: function () {
            if ("undefined" != typeof navigator.languages)try {
                var a = navigator.languages[0].substr(0, 2);
                if (a !== navigator.language.substr(0, 2))return !0
            } catch (b) {
                return !0
            }
            return !1
        }, getHasLiedResolution: function () {
            return screen.width < screen.availWidth ? !0 : screen.height < screen.availHeight ? !0 : !1
        }, getHasLiedOs: function () {
            var d, a = navigator.userAgent.toLowerCase(), b = navigator.oscpu, c = navigator.platform.toLowerCase();
            d = a.indexOf("windows phone") >= 0 ? "Windows Phone" : a.indexOf("win") >= 0 ? "Windows" : a.indexOf("android") >= 0 ? "Android" : a.indexOf("linux") >= 0 ? "Linux" : a.indexOf("iphone") >= 0 || a.indexOf("ipad") >= 0 ? "iOS" : a.indexOf("mac") >= 0 ? "Mac" : "Other";
            var e;
            if (e = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? !0 : !1, e && "Windows Phone" !== d && "Android" !== d && "iOS" !== d && "Other" !== d)return !0;
            if ("undefined" != typeof b) {
                if (b = b.toLowerCase(), b.indexOf("win") >= 0 && "Windows" !== d && "Windows Phone" !== d)return !0;
                if (b.indexOf("linux") >= 0 && "Linux" !== d && "Android" !== d)return !0;
                if (b.indexOf("mac") >= 0 && "Mac" !== d && "iOS" !== d)return !0;
                if (0 === b.indexOf("win") && 0 === b.indexOf("linux") && b.indexOf("mac") >= 0 && "other" !== d)return !0
            }
            return c.indexOf("win") >= 0 && "Windows" !== d && "Windows Phone" !== d ? !0 : (c.indexOf("linux") >= 0 || c.indexOf("android") >= 0 || c.indexOf("pike") >= 0) && "Linux" !== d && "Android" !== d ? !0 : (c.indexOf("mac") >= 0 || c.indexOf("ipad") >= 0 || c.indexOf("ipod") >= 0 || c.indexOf("iphone") >= 0) && "Mac" !== d && "iOS" !== d ? !0 : 0 === c.indexOf("win") && 0 === c.indexOf("linux") && c.indexOf("mac") >= 0 && "other" !== d ? !0 : "undefined" == typeof navigator.plugins && "Windows" !== d && "Windows Phone" !== d ? !0 : !1
        }, getHasLiedBrowser: function () {
            var c, a = navigator.userAgent.toLowerCase(), b = navigator.productSub;
            if (c = a.indexOf("firefox") >= 0 ? "Firefox" : a.indexOf("opera") >= 0 || a.indexOf("opr") >= 0 ? "Opera" : a.indexOf("chrome") >= 0 ? "Chrome" : a.indexOf("safari") >= 0 ? "Safari" : a.indexOf("trident") >= 0 ? "Internet Explorer" : "Other", ("Chrome" === c || "Safari" === c || "Opera" === c) && "20030107" !== b)return !0;
            var d = eval.toString().length;
            if (37 === d && "Safari" !== c && "Firefox" !== c && "Other" !== c)return !0;
            if (39 === d && "Internet Explorer" !== c && "Other" !== c)return !0;
            if (33 === d && "Chrome" !== c && "Opera" !== c && "Other" !== c)return !0;
            var e;
            try {
                throw"a"
            } catch (f) {
                try {
                    f.toSource(), e = !0
                } catch (g) {
                    e = !1
                }
            }
            return e && "Firefox" !== c && "Other" !== c ? !0 : !1
        }, isCanvasSupported: function () {
            var a = document.createElement("canvas");
            return !(!a.getContext || !a.getContext("2d"))
        }, isWebGlSupported: function () {
            if (!this.isCanvasSupported())return !1;
            var b, a = document.createElement("canvas");
            try {
                b = a.getContext && (a.getContext("webgl") || a.getContext("experimental-webgl"))
            } catch (c) {
                b = !1
            }
            return !!window.WebGLRenderingContext && !!b
        }, isIE: function () {
            return "Microsoft Internet Explorer" === navigator.appName ? !0 : "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
        }, hasSwfObjectLoaded: function () {
            return "undefined" != typeof window.swfobject
        }, hasMinFlashInstalled: function () {
            return swfobject.hasFlashPlayerVersion("9.0.0")
        }, addFlashDivNode: function () {
            var a = document.createElement("div");
            a.setAttribute("id", this.options.swfContainerId), document.body.appendChild(a)
        }, loadSwfAndDetectFonts: function (a) {
            var b = "___fp_swf_loaded";
            window[b] = function (b) {
                a(b)
            };
            var c = this.options.swfContainerId;
            this.addFlashDivNode();
            var d = {onReady: b}, e = {allowScriptAccess: "always", menu: "false"};
            swfobject.embedSWF(this.options.swfPath, c, "1", "1", "9.0.0", !1, d, e, {})
        }, getWebglCanvas: function () {
            var a = document.createElement("canvas"), b = null;
            try {
                b = a.getContext("webgl") || a.getContext("experimental-webgl")
            } catch (c) {
            }
            return b || (b = null), b
        }, each: function (a, b, c) {
            if (null !== a)if (this.nativeForEach && a.forEach === this.nativeForEach)a.forEach(b, c); else if (a.length === +a.length) {
                for (var d = 0, e = a.length; e > d; d++)if (b.call(c, a[d], d, a) === {})return
            } else for (var f in a)if (a.hasOwnProperty(f) && b.call(c, a[f], f, a) === {})return
        }, map: function (a, b, c) {
            var d = [];
            return null == a ? d : this.nativeMap && a.map === this.nativeMap ? a.map(b, c) : (this.each(a, function (a, e, f) {
                d[d.length] = b.call(c, a, e, f)
            }), d)
        }, x64Add: function (a, b) {
            a = [a[0] >>> 16, 65535 & a[0], a[1] >>> 16, 65535 & a[1]], b = [b[0] >>> 16, 65535 & b[0], b[1] >>> 16, 65535 & b[1]];
            var c = [0, 0, 0, 0];
            return c[3] += a[3] + b[3], c[2] += c[3] >>> 16, c[3] &= 65535, c[2] += a[2] + b[2], c[1] += c[2] >>> 16, c[2] &= 65535, c[1] += a[1] + b[1], c[0] += c[1] >>> 16, c[1] &= 65535, c[0] += a[0] + b[0], c[0] &= 65535, [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        }, x64Multiply: function (a, b) {
            a = [a[0] >>> 16, 65535 & a[0], a[1] >>> 16, 65535 & a[1]], b = [b[0] >>> 16, 65535 & b[0], b[1] >>> 16, 65535 & b[1]];
            var c = [0, 0, 0, 0];
            return c[3] += a[3] * b[3], c[2] += c[3] >>> 16, c[3] &= 65535, c[2] += a[2] * b[3], c[1] += c[2] >>> 16, c[2] &= 65535, c[2] += a[3] * b[2], c[1] += c[2] >>> 16, c[2] &= 65535, c[1] += a[1] * b[3], c[0] += c[1] >>> 16, c[1] &= 65535, c[1] += a[2] * b[2], c[0] += c[1] >>> 16, c[1] &= 65535, c[1] += a[3] * b[1], c[0] += c[1] >>> 16, c[1] &= 65535, c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0], c[0] &= 65535, [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        }, x64Rotl: function (a, b) {
            return b %= 64, 32 === b ? [a[1], a[0]] : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b] : (b -= 32, [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b])
        }, x64LeftShift: function (a, b) {
            return b %= 64, 0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0]
        }, x64Xor: function (a, b) {
            return [a[0] ^ b[0], a[1] ^ b[1]]
        }, x64Fmix: function (a) {
            return a = this.x64Xor(a, [0, a[0] >>> 1]), a = this.x64Multiply(a, [4283543511, 3981806797]), a = this.x64Xor(a, [0, a[0] >>> 1]), a = this.x64Multiply(a, [3301882366, 444984403]), a = this.x64Xor(a, [0, a[0] >>> 1])
        }, x64hash128: function (a, b) {
            a = a || "", b = b || 0;
            for (var c = a.length % 16, d = a.length - c, e = [0, b], f = [0, b], g = [0, 0], h = [0, 0], i = [2277735313, 289559509], j = [1291169091, 658871167], k = 0; d > k; k += 16)g = [255 & a.charCodeAt(k + 4) | (255 & a.charCodeAt(k + 5)) << 8 | (255 & a.charCodeAt(k + 6)) << 16 | (255 & a.charCodeAt(k + 7)) << 24, 255 & a.charCodeAt(k) | (255 & a.charCodeAt(k + 1)) << 8 | (255 & a.charCodeAt(k + 2)) << 16 | (255 & a.charCodeAt(k + 3)) << 24], h = [255 & a.charCodeAt(k + 12) | (255 & a.charCodeAt(k + 13)) << 8 | (255 & a.charCodeAt(k + 14)) << 16 | (255 & a.charCodeAt(k + 15)) << 24, 255 & a.charCodeAt(k + 8) | (255 & a.charCodeAt(k + 9)) << 8 | (255 & a.charCodeAt(k + 10)) << 16 | (255 & a.charCodeAt(k + 11)) << 24], g = this.x64Multiply(g, i), g = this.x64Rotl(g, 31), g = this.x64Multiply(g, j), e = this.x64Xor(e, g), e = this.x64Rotl(e, 27), e = this.x64Add(e, f), e = this.x64Add(this.x64Multiply(e, [0, 5]), [0, 1390208809]), h = this.x64Multiply(h, j), h = this.x64Rotl(h, 33), h = this.x64Multiply(h, i), f = this.x64Xor(f, h), f = this.x64Rotl(f, 31), f = this.x64Add(f, e), f = this.x64Add(this.x64Multiply(f, [0, 5]), [0, 944331445]);
            switch (g = [0, 0], h = [0, 0], c) {
                case 15:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 14)], 48));
                case 14:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 13)], 40));
                case 13:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 12)], 32));
                case 12:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 11)], 24));
                case 11:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 10)], 16));
                case 10:
                    h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 9)], 8));
                case 9:
                    h = this.x64Xor(h, [0, a.charCodeAt(k + 8)]), h = this.x64Multiply(h, j), h = this.x64Rotl(h, 33), h = this.x64Multiply(h, i), f = this.x64Xor(f, h);
                case 8:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 7)], 56));
                case 7:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 6)], 48));
                case 6:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 5)], 40));
                case 5:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 4)], 32));
                case 4:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 3)], 24));
                case 3:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 2)], 16));
                case 2:
                    g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 1)], 8));
                case 1:
                    g = this.x64Xor(g, [0, a.charCodeAt(k)]), g = this.x64Multiply(g, i), g = this.x64Rotl(g, 31), g = this.x64Multiply(g, j), e = this.x64Xor(e, g)
            }
            return e = this.x64Xor(e, [0, a.length]), f = this.x64Xor(f, [0, a.length]), e = this.x64Add(e, f), f = this.x64Add(f, e), e = this.x64Fmix(e), f = this.x64Fmix(f), e = this.x64Add(e, f), f = this.x64Add(f, e), ("00000000" + (e[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (e[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[1] >>> 0).toString(16)).slice(-8)
        }, keyToObject: function (a, b) {
            return 1 == a.length ? a[0] : a.length >= 2 ? a : null
        }, send: function (a, b) {
            this.get(function (c) {
                var d = window.location.host, e = window.location.href, f = {
                    deviceId: c.deviceId,
                    userAgent: c.userAgentKey,
                    timezoneOffsetKey: c.timezoneOffsetKey,
                    cpuClassKey: c.cpuClassKey,
                    languageKey: c.languageKey,
                    dominio: d,
                    url: e,
                    keyUser: a,
                    sessionId: b,
                    platformKey: c.platformKey
                };
                jQuery.ajax({
                    url: "http://hmlg.fcontrol.com.br:8080/fcontrol/fingerprint/",
                    type: "POST",
                    data: JSON.stringify(f),
                    async: true,
                    dataType: "json",
                    contentType: "application/json",
                    headers: {
                        "Access-Control-Allow-Origin": "http://hmlg.fcontrol.com.br:8080/fcontrol/fingerprint/",
                        contentType: "application/json",
                        dataType: "json"
                    }
                })
            })
        }
    }, a.VERSION = "0.1.0", a
});
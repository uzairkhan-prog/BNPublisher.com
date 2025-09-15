/*!
 * Copyright © 2017 Vantiv. ALL RIGHTS RESERVED.
 * eProtect Java Script API Version: 1.4
 * Includes eProtect-api3.js
 * http://www.vantiv.com/
 */
;
var VantiveProtectPpStatsReporter = function () {
    var b = 0; var c = 3; var a = 0; return {
        reportMethodInvocation: function (e) {
            b++; if (b > c) {
                return
            } e = encodeURIComponent(e); var d = this.getUriEncodedStack(new Error()); var f = "https://request.eprotect.vantivcnp.com"; var g = "errorHandler=PUBLIC_API_CALL&errorStack=" + d + "&errorMessage=" + e;
            setTimeout(function () { try { getJSON(f + "/eProtect/ppstats?" + g + "&jsoncallback=?", function (i) { }) } catch (h) { } }, 0)
        }, report3rdPartyError: function (d) {
            this.reportError(d, "3RD_PARTY_ERROR")
        }, reportIframeClientError: function (d) { this.reportError(d, "CLIENT_ERROR") }, reportError: function (h, d) {
            a++; if (a > c) { return } var f = encodeURIComponent(h);
            f = this.removeNonStandardCharacters(f); var e = "https://request.eprotect.vantivcnp.com"; var i = "errorHandler=" + d; var g = this.getUriEncodedStack(h);
            f += encodeURIComponent(" ") + g; if (f.length > 3000) { f = f.substr(0, 3000) } i += "&errorStack=" + f; setTimeout(function () {
                try {
                    getJSON(e + "/eProtect/ppstats?" + i + "&jsoncallback=?", function (k) { })
                } catch (j) { }
            }, 0)
        }, removeNonStandardCharacters: function (e) {
            var d = decodeURIComponent(e); d = d.replace(/(\r\n|\n|\r)/g, " "); return encodeURIComponent(d)
        }, executeActionAndReportError: function (f) { try { f() } catch (e) { try { this.reportIframeClientError(e) } catch (d) { } throw e } }, getUriEncodedStack: function (f) {
            var d = "";
            if (f.stack) {
                d = f.stack; if (d.length > 2000) { d = d.substr(0, 2000) } try {
                    var g = encodeURIComponent(d); g = this.removeNonStandardCharacters(d);
                    d = g
                } catch (e) { }
            } return d
        }, reportIframeLoadedTime: function (d, f) {
            var e = "https://request.eprotect.vantivcnp.com"; setTimeout(function () {
                try {
                    getJSON(e + "/eProtect/ppstats?loadTime=" + d + "&paypageId=" + f + "&jsoncallback=?", function (h) { })
                } catch (g) { }
            }, 0)
        }
    }
}; function getJSON(c, e) {
    var a = "JS" + Math.floor(Math.pow(10, 20) + Math.random() * (Math.pow(10, 21) - Math.pow(10, 20) - 1)) + "_" + new Date().getTime(), b = document.createElement("script"), d = document.getElementsByTagName("head")[0] || document.documentElement;
    window[a] = function (f) { d.removeChild(b); e && e(f) }; b.src = c.replace("jsoncallback=?", "jsoncallback=" + a); d.appendChild(b)
} var myVantivEProtectReporterForPpStats = new VantiveProtectPpStatsReporter();
var eProtect = function () {
    var b = { modulus: "d52fe6856f81e7d22589885d92e60cbd6b0f651b54a4a1bcab54ffc181cede7d91bf2983a825674c916e2a356365a3d63a918118f9822fb535dabbade9f17518d6f142b8613d1784f9ed02ef1947311249f7c9ba07d10b7e18212a2f20ae13ca924704b226b8f51b76f3aed69cd5f949fed48acf6e1491e298157530ba41d6ab841178e658983f5ae5199a74f5d64f22073790ffda7699f45692768bd5f8a127cd1aedb967641b16f4fe4d734c194bae46086f5c8cc81e94a1b9b3a753d4b1da1cc5c271eb6807ae78f684ddc6bc4dd4443224d2c6353bc8702508a46612fb873f24d3e212120afee0c0bcac546e02674ce4237dd0b4967fa11208f9fc5c5995", exponent: "10001", keyId: "26407200018", visaCheckoutApiKey: "YIVDE0GZEE18VM6BFYIS218dbXdWD-42bCYl0m0KPUxgix_qE", visaCheckoutEncryptionKey: "GOR4DEIB9H0A0FYVZQJC14N4-6kbAF8FZi58EWWIMcv0IkSPQ" };
    var a = { primaryUrl: "https://request.eprotect.vantivcnp.com", secondaryUrl: "https://secondary.eprotect.vantivcnp.com", primaryTimeout: 5000 };
    return {
        getUrl: function () { return a.primaryUrl }, sendToEprotect: function (ak, V, S, P, A, X) {
            function aA(aP) {
                var aI = 0; var aG; var aT;
                var aS; var aN; var aO; try {
                    if (window.crypto && window.crypto.getRandomValues) {
                        aG = new Int8Array(aP.length); window.crypto.getRandomValues(aG);
                        for (aT = 0; aT < aG.length; ++aT) {
                            while (aG[aT] == 0) { aN = new Int8Array(1); window.crypto.getRandomValues(aN); aG[aT] = aN[0] } aP[aI++] = aG[aT]
                        }
                    } else {
                        if (window.msCrypto && window.msCrypto.getRandomValues) {
                            aG = new Int8Array(aP.length); window.msCrypto.getRandomValues(aG);
                            for (aT = 0; aT < aG.length; ++aT) {
                                while (aG[aT] == 0) { aN = new Int8Array(1); window.msCrypto.getRandomValues(aN); aG[aT] = aN[0] } aP[aI++] = aG[aT]
                            }
                        } else {
                            aS = sjcl.random.randomWords((aP.length / 4) + 1, 0); var aL = 0; while (aI < aS.length) {
                                var aJ = aS[aI++]; var aQ = aJ >> 0 & 255; var aR = aJ >> 8 & 255;
                                var aF = aJ >> 16 & 255; var aK = aJ >> 24 & 255; while (aQ == 0 || aR == 0 || aF == 0 || aK == 0) {
                                    aO = new Array(); aO = sjcl.random.randomWords(1, 0); aJ = aO[0];
                                    aQ = aJ >> 0 & 255; aR = aJ >> 8 & 255; aF = aJ >> 16 & 255; aK = aJ >> 24 & 255
                                } if (aL < aP.length) { aP[aL++] = aQ } if (aL < aP.length) { aP[aL++] = aR } if (aL < aP.length) {
                                    aP[aL++] = aF
                                } if (aL < aP.length) { aP[aL++] = aK }
                            }
                        }
                    }
                } catch (aM) {
                    for (aT = 0; aT < aP.length; ++aT) {
                        var aH = Math.floor((Math.random() * 255) + 1); while (aH == 0) {
                            aH = Math.floor((Math.random() * 255) + 1)
                        } aP[aI++] = aH
                    }
                } return 1
            }
            /*!
                         * Copyright (c) 2003-2005  Tom Wu
                         * All Rights Reserved.
                         *
                         * Permission is hereby granted, free of charge, to any person obtaining
                         * a copy of this software and associated documentation files (the
                         * "Software"), to deal in the Software without restriction, including
                         * without limitation the rights to use, copy, modify, merge, publish,
                         * distribute, sublicense, and/or sell copies of the Software, and to
                         * permit persons to whom the Software is furnished to do so, subject to
                         * the following conditions:
                         *
                         * The above copyright notice and this permission notice shall be
                         * included in all copies or substantial portions of the Software.
                         *
                         * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
                         * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
                         * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                         *
                         * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
                         * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
                         * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
                         * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
                         * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
                         *
                         * In addition, the following condition applies:
                         *
                         * All redistributions must retain an intact copy of this copyright notice
                         * and disclaimer.
                         */
            ;
            function g(aG, aF) { return new ax(aG, aF) } function am(aH, aI) {
                var aF = ""; var aG = 0; while (aG + aI < aH.length) {
                    aF += aH.substring(aG, aG + aI) + "\n";
                    aG += aI
                } return aF + aH.substring(aG, aH.length)
            } function q(aF) {
                if (aF < 16) { return "0" + aF.toString(16) } else {
                    return aF.toString(16)
                }
            } function aj(aI, aL) {
                if (aL < aI.length + 11) { throw "Message too long for RSA" } var aK = new Array(); var aH = aI.length - 1; while (aH >= 0 && aL > 0) {
                    var aJ = aI.charCodeAt(aH--);
                    if (aJ < 128) { aK[--aL] = aJ } else {
                        if ((aJ > 127) && (aJ < 2048)) { aK[--aL] = (aJ & 63) | 128; aK[--aL] = (aJ >> 6) | 192 } else {
                            aK[--aL] = (aJ & 63) | 128; aK[--aL] = ((aJ >> 6) & 63) | 128;
                            aK[--aL] = (aJ >> 12) | 224
                        }
                    }
                } aK[--aL] = 0; var aG = new ag(); var aF = new Array(aL - 2); aG.nextBytes(aF); aH = 0; while (aL > 2) {
                    aK[--aL] = aF[aH];
                    aH++
                } aK[--aL] = 2; aK[--aL] = 0; return new ax(aK)
            } function I() {
                this.n = null; this.e = 0; this.d = null; this.p = null; this.q = null; this.dmp1 = null;
                this.dmq1 = null; this.coeff = null
            } function n(aG, aF) {
                if (aG != null && aF != null && aG.length > 0 && aF.length > 0) {
                    this.n = g(aG, 16); this.e = parseInt(aF, 16)
                } else { throw "Error setting public key" }
            } function Y(aF) { return aF.modPowInt(this.e, this.n) } function o(aH) {
                var aF = aj(aH, (this.n.bitLength() + 7) >> 3);
                if (aF == null) { return null } var aI = this.doPublic(aF); if (aI == null) { return null } var aG = aI.toString(16); if ((aG.length & 1) == 0) {
                    return aG
                } else { return "0" + aG }
            } I.prototype.doPublic = Y; I.prototype.setPublic = n; I.prototype.encrypt = o; var aB; var ao = 244837814094590; var ab = ((ao & 16777215) == 15715070);
            function ax(aG, aF, aH) {
                if (aG != null) {
                    if ("number" == typeof aG) { this.fromNumber(aG, aF, aH) } else {
                        if (aF == null && "string" != typeof aG) {
                            this.fromString(aG, 256)
                        } else { this.fromString(aG, aF) }
                    }
                }
            } function h() { return new ax(null) } function c(aJ, aF, aG, aI, aL, aK) {
                while (--aK >= 0) {
                    var aH = aF * this[aJ++] + aG[aI] + aL;
                    aL = Math.floor(aH / 67108864); aG[aI++] = aH & 67108863
                } return aL
            } function aD(aJ, aO, aP, aI, aM, aF) {
                var aL = aO & 32767, aN = aO >> 15; while (--aF >= 0) {
                    var aH = this[aJ] & 32767;
                    var aK = this[aJ++] >> 15; var aG = aN * aH + aK * aL; aH = aL * aH + ((aG & 32767) << 15) + aP[aI] + (aM & 1073741823); aM = (aH >>> 30) + (aG >>> 15) + aN * aK + (aM >>> 30);
                    aP[aI++] = aH & 1073741823
                } return aM
            } function aC(aJ, aO, aP, aI, aM, aF) {
                var aL = aO & 16383, aN = aO >> 14; while (--aF >= 0) {
                    var aH = this[aJ] & 16383;
                    var aK = this[aJ++] >> 14; var aG = aN * aH + aK * aL; aH = aL * aH + ((aG & 16383) << 14) + aP[aI] + aM; aM = (aH >> 28) + (aG >> 14) + aN * aK; aP[aI++] = aH & 268435455
                } return aM
            } if (ab && (navigator.appName == "Microsoft Internet Explorer")) { ax.prototype.am = aD; aB = 30 } else {
                if (ab && (navigator.appName != "Netscape")) {
                    ax.prototype.am = c;
                    aB = 26
                } else { ax.prototype.am = aC; aB = 28 }
            } ax.prototype.DB = aB; ax.prototype.DM = ((1 << aB) - 1); ax.prototype.DV = (1 << aB); var ad = 52; ax.prototype.FV = Math.pow(2, ad);
            ax.prototype.F1 = ad - aB; ax.prototype.F2 = 2 * aB - ad; var ai = "0123456789abcdefghijklmnopqrstuvwxyz"; var al = new Array(); var av, t; av = "0".charCodeAt(0);
            for (t = 0; t <= 9; ++t) { al[av++] = t } av = "a".charCodeAt(0); for (t = 10; t < 36; ++t) { al[av++] = t } av = "A".charCodeAt(0); for (t = 10; t < 36; ++t) {
                al[av++] = t
            } function aE(aF) { return ai.charAt(aF) } function y(aG, aF) { var aH = al[aG.charCodeAt(aF)]; return (aH == null) ? -1 : aH } function aa(aG) {
                for (var aF = this.t - 1;
                    aF >= 0; --aF) { aG[aF] = this[aF] } aG.t = this.t; aG.s = this.s
            } function m(aF) {
                this.t = 1; this.s = (aF < 0) ? -1 : 0; if (aF > 0) { this[0] = aF } else {
                    if (aF < -1) {
                        this[0] = aF + DV
                    } else { this.t = 0 }
                }
            } function e(aF) { var aG = h(); aG.fromInt(aF); return aG } function u(aL, aG) {
                var aI; if (aG == 16) { aI = 4 } else {
                    if (aG == 8) {
                        aI = 3
                    } else { if (aG == 256) { aI = 8 } else { if (aG == 2) { aI = 1 } else { if (aG == 32) { aI = 5 } else { if (aG == 4) { aI = 2 } else { this.fromRadix(aL, aG); return } } } } }
                } this.t = 0;
                this.s = 0; var aK = aL.length, aH = false, aJ = 0; while (--aK >= 0) {
                    var aF = (aI == 8) ? aL[aK] & 255 : y(aL, aK); if (aF < 0) {
                        if (aL.charAt(aK) == "-") {
                            aH = true
                        } continue
                    } aH = false; if (aJ == 0) { this[this.t++] = aF } else {
                        if (aJ + aI > this.DB) {
                            this[this.t - 1] |= (aF & ((1 << (this.DB - aJ)) - 1)) << aJ; this[this.t++] = (aF >> (this.DB - aJ))
                        } else { this[this.t - 1] |= aF << aJ }
                    } aJ += aI; if (aJ >= this.DB) { aJ -= this.DB }
                } if (aI == 8 && (aL[0] & 128) != 0) {
                    this.s = -1; if (aJ > 0) {
                        this[this.t - 1] |= ((1 << (this.DB - aJ)) - 1) << aJ
                    }
                } this.clamp(); if (aH) { ax.ZERO.subTo(this, this) }
            } function L() {
                var aF = this.s & this.DM; while (this.t > 0 && this[this.t - 1] == aF) {
                    --this.t
                }
            } function p(aG) {
                if (this.s < 0) { return "-" + this.negate().toString(aG) } var aH; if (aG == 16) { aH = 4 } else {
                    if (aG == 8) { aH = 3 } else {
                        if (aG == 2) {
                            aH = 1
                        } else { if (aG == 32) { aH = 5 } else { if (aG == 4) { aH = 2 } else { return this.toRadix(aG) } } }
                    }
                } var aJ = (1 << aH) - 1, aM, aF = false, aK = "", aI = this.t; var aL = this.DB - (aI * this.DB) % aH;
                if (aI-- > 0) {
                    if (aL < this.DB && (aM = this[aI] >> aL) > 0) { aF = true; aK = aE(aM) } while (aI >= 0) {
                        if (aL < aH) {
                            aM = (this[aI] & ((1 << aL) - 1)) << (aH - aL);
                            aM |= this[--aI] >> (aL += this.DB - aH)
                        } else { aM = (this[aI] >> (aL -= aH)) & aJ; if (aL <= 0) { aL += this.DB; --aI } } if (aM > 0) { aF = true } if (aF) {
                            aK += aE(aM)
                        }
                    }
                } return aF ? aK : "0"
            } function O() { var aF = h(); ax.ZERO.subTo(this, aF); return aF } function ar() {
                return (this.s < 0) ? this.negate() : this
            } function E(aF) {
                var aH = this.s - aF.s; if (aH != 0) { return aH } var aG = this.t; aH = aG - aF.t; if (aH != 0) { return aH } while (--aG >= 0) {
                    if ((aH = this[aG] - aF[aG]) != 0) {
                        return aH
                    }
                } return 0
            } function j(aF) {
                var aH = 1, aG; if ((aG = aF >>> 16) != 0) { aF = aG; aH += 16 } if ((aG = aF >> 8) != 0) { aF = aG; aH += 8 } if ((aG = aF >> 4) != 0) {
                    aF = aG;
                    aH += 4
                } if ((aG = aF >> 2) != 0) { aF = aG; aH += 2 } if ((aG = aF >> 1) != 0) { aF = aG; aH += 1 } return aH
            } function s() {
                if (this.t <= 0) { return 0 } return this.DB * (this.t - 1) + j(this[this.t - 1] ^ (this.s & this.DM))
            } function aw(aH, aG) {
                var aF; for (aF = this.t - 1; aF >= 0; --aF) { aG[aF + aH] = this[aF] } for (aF = aH - 1; aF >= 0; --aF) { aG[aF] = 0 } aG.t = this.t + aH;
                aG.s = this.s
            } function Z(aH, aG) { for (var aF = aH; aF < this.t; ++aF) { aG[aF - aH] = this[aF] } aG.t = Math.max(this.t - aH, 0); aG.s = this.s } function r(aM, aI) {
                var aG = aM % this.DB;
                var aF = this.DB - aG; var aK = (1 << aF) - 1; var aJ = Math.floor(aM / this.DB), aL = (this.s << aG) & this.DM, aH; for (aH = this.t - 1; aH >= 0; --aH) {
                    aI[aH + aJ + 1] = (this[aH] >> aF) | aL;
                    aL = (this[aH] & aK) << aG
                } for (aH = aJ - 1; aH >= 0; --aH) { aI[aH] = 0 } aI[aJ] = aL; aI.t = this.t + aJ + 1; aI.s = this.s; aI.clamp()
            } function k(aL, aI) {
                aI.s = this.s;
                var aJ = Math.floor(aL / this.DB); if (aJ >= this.t) { aI.t = 0; return } var aG = aL % this.DB; var aF = this.DB - aG; var aK = (1 << aG) - 1; aI[0] = this[aJ] >> aG;
                for (var aH = aJ + 1; aH < this.t; ++aH) { aI[aH - aJ - 1] |= (this[aH] & aK) << aF; aI[aH - aJ] = this[aH] >> aG } if (aG > 0) {
                    aI[this.t - aJ - 1] |= (this.s & aK) << aF
                } aI.t = this.t - aJ; aI.clamp()
            } function ae(aG, aI) {
                var aH = 0, aJ = 0, aF = Math.min(aG.t, this.t); while (aH < aF) {
                    aJ += this[aH] - aG[aH]; aI[aH++] = aJ & this.DM;
                    aJ >>= this.DB
                } if (aG.t < this.t) { aJ -= aG.s; while (aH < this.t) { aJ += this[aH]; aI[aH++] = aJ & this.DM; aJ >>= this.DB } aJ += this.s } else {
                    aJ += this.s;
                    while (aH < aG.t) { aJ -= aG[aH]; aI[aH++] = aJ & this.DM; aJ >>= this.DB } aJ -= aG.s
                } aI.s = (aJ < 0) ? -1 : 0; if (aJ < -1) { aI[aH++] = this.DV + aJ } else {
                    if (aJ > 0) {
                        aI[aH++] = aJ
                    }
                } aI.t = aH; aI.clamp()
            } function C(aG, aI) {
                var aF = this.abs(), aJ = aG.abs(); var aH = aF.t; aI.t = aH + aJ.t; while (--aH >= 0) { aI[aH] = 0 } for (aH = 0;
                    aH < aJ.t; ++aH) { aI[aH + aF.t] = aF.am(0, aJ[aH], aI, aH, 0, aF.t) } aI.s = 0; aI.clamp(); if (this.s != aG.s) { ax.ZERO.subTo(aI, aI) }
            } function N(aH) {
                var aF = this.abs();
                var aG = aH.t = 2 * aF.t; while (--aG >= 0) { aH[aG] = 0 } for (aG = 0; aG < aF.t - 1; ++aG) {
                    var aI = aF.am(aG, aF[aG], aH, 2 * aG, 0, 1); if ((aH[aG + aF.t] += aF.am(aG + 1, 2 * aF[aG], aH, 2 * aG + 1, aI, aF.t - aG - 1)) >= aF.DV) {
                        aH[aG + aF.t] -= aF.DV;
                        aH[aG + aF.t + 1] = 1
                    }
                } if (aH.t > 0) { aH[aH.t - 1] += aF.am(aG, aF[aG], aH, 2 * aG, 0, 1) } aH.s = 0; aH.clamp()
            } function D(aO, aL, aK) {
                var aU = aO.abs();
                if (aU.t <= 0) { return } var aM = this.abs(); if (aM.t < aU.t) { if (aL != null) { aL.fromInt(0) } if (aK != null) { this.copyTo(aK) } return } if (aK == null) {
                    aK = h()
                } var aI = h(), aF = this.s, aN = aO.s; var aT = this.DB - j(aU[aU.t - 1]); if (aT > 0) { aU.lShiftTo(aT, aI); aM.lShiftTo(aT, aK) } else {
                    aU.copyTo(aI);
                    aM.copyTo(aK)
                } var aQ = aI.t; var aG = aI[aQ - 1]; if (aG == 0) { return } var aP = aG * (1 << this.F1) + ((aQ > 1) ? aI[aQ - 2] >> this.F2 : 0); var aX = this.FV / aP, aW = (1 << this.F1) / aP, aV = 1 << this.F2;
                var aS = aK.t, aR = aS - aQ, aJ = (aL == null) ? h() : aL; aI.dlShiftTo(aR, aJ); if (aK.compareTo(aJ) >= 0) { aK[aK.t++] = 1; aK.subTo(aJ, aK) } ax.ONE.dlShiftTo(aQ, aJ);
                aJ.subTo(aI, aI); while (aI.t < aQ) { aI[aI.t++] = 0 } while (--aR >= 0) {
                    var aH = (aK[--aS] == aG) ? this.DM : Math.floor(aK[aS] * aX + (aK[aS - 1] + aV) * aW);
                    if ((aK[aS] += aI.am(0, aH, aK, aR, 0, aQ)) < aH) { aI.dlShiftTo(aR, aJ); aK.subTo(aJ, aK); while (aK[aS] < --aH) { aK.subTo(aJ, aK) } }
                } if (aL != null) {
                    aK.drShiftTo(aQ, aL);
                    if (aF != aN) { ax.ZERO.subTo(aL, aL) }
                } aK.t = aQ; aK.clamp(); if (aT > 0) { aK.rShiftTo(aT, aK) } if (aF < 0) { ax.ZERO.subTo(aK, aK) }
            } function K(aF) {
                var aG = h();
                this.abs().divRemTo(aF, null, aG); if (this.s < 0 && aG.compareTo(ax.ZERO) > 0) { aF.subTo(aG, aG) } return aG
            } function H(aF) { this.m = aF } function U(aF) {
                if (aF.s < 0 || aF.compareTo(this.m) >= 0) {
                    return aF.mod(this.m)
                } else { return aF }
            } function aq(aF) { return aF } function G(aF) { aF.divRemTo(this.m, null, aF) } function F(aF, aH, aG) {
                aF.multiplyTo(aH, aG);
                this.reduce(aG)
            } function az(aF, aG) { aF.squareTo(aG); this.reduce(aG) } H.prototype.convert = U; H.prototype.revert = aq; H.prototype.reduce = G;
            H.prototype.mulTo = F; H.prototype.sqrTo = az; function z() {
                if (this.t < 1) { return 0 } var aF = this[0]; if ((aF & 1) == 0) { return 0 } var aG = aF & 3;
                aG = (aG * (2 - (aF & 15) * aG)) & 15; aG = (aG * (2 - (aF & 255) * aG)) & 255; aG = (aG * (2 - (((aF & 65535) * aG) & 65535))) & 65535; aG = (aG * (2 - aF * aG % this.DV)) % this.DV;
                return (aG > 0) ? this.DV - aG : -aG
            } function f(aF) {
                this.m = aF; this.mp = aF.invDigit(); this.mpl = this.mp & 32767; this.mph = this.mp >> 15; this.um = (1 << (aF.DB - 15)) - 1;
                this.mt2 = 2 * aF.t
            } function ap(aF) {
                var aG = h(); aF.abs().dlShiftTo(this.m.t, aG); aG.divRemTo(this.m, null, aG); if (aF.s < 0 && aG.compareTo(ax.ZERO) > 0) {
                    this.m.subTo(aG, aG)
                } return aG
            } function ay(aF) { var aG = h(); aF.copyTo(aG); this.reduce(aG); return aG } function M(aF) {
                while (aF.t <= this.mt2) {
                    aF[aF.t++] = 0
                } for (var aH = 0; aH < this.m.t; ++aH) {
                    var aG = aF[aH] & 32767; var aI = (aG * this.mpl + (((aG * this.mph + (aF[aH] >> 15) * this.mpl) & this.um) << 15)) & aF.DM;
                    aG = aH + this.m.t; aF[aG] += this.m.am(0, aI, aF, aH, 0, this.m.t); while (aF[aG] >= aF.DV) { aF[aG] -= aF.DV; aF[++aG]++ }
                } aF.clamp(); aF.drShiftTo(this.m.t, aF);
                if (aF.compareTo(this.m) >= 0) { aF.subTo(this.m, aF) }
            } function at(aF, aG) { aF.squareTo(aG); this.reduce(aG) } function x(aF, aH, aG) {
                aF.multiplyTo(aH, aG);
                this.reduce(aG)
            } f.prototype.convert = ap; f.prototype.revert = ay; f.prototype.reduce = M; f.prototype.mulTo = x; f.prototype.sqrTo = at;
            function i() { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0 } function w(aK, aL) {
                if (aK > 4294967295 || aK < 1) { return ax.ONE } var aJ = h(), aF = h(), aI = aL.convert(this), aH = j(aK) - 1;
                aI.copyTo(aJ); while (--aH >= 0) { aL.sqrTo(aJ, aF); if ((aK & (1 << aH)) > 0) { aL.mulTo(aF, aI, aJ) } else { var aG = aJ; aJ = aF; aF = aG } } return aL.revert(aJ)
            } function au(aG, aF) { var aH; if (aG < 256 || aF.isEven()) { aH = new H(aF) } else { aH = new f(aF) } return this.exp(aG, aH) } ax.prototype.copyTo = aa;
            ax.prototype.fromInt = m; ax.prototype.fromString = u; ax.prototype.clamp = L; ax.prototype.dlShiftTo = aw; ax.prototype.drShiftTo = Z;
            ax.prototype.lShiftTo = r; ax.prototype.rShiftTo = k; ax.prototype.subTo = ae; ax.prototype.multiplyTo = C; ax.prototype.squareTo = N; ax.prototype.divRemTo = D;
            ax.prototype.invDigit = z; ax.prototype.isEven = i; ax.prototype.exp = w; ax.prototype.toString = p; ax.prototype.negate = O; ax.prototype.abs = ar;
            ax.prototype.compareTo = E; ax.prototype.bitLength = s; ax.prototype.mod = K; ax.prototype.modPowInt = au; ax.ZERO = e(0); ax.ONE = e(1); function ag() { } ag.prototype.nextBytes = aA;
            var ac = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var W = "="; function ah(aH) {
                var aG; var aI; var aF = "";
                for (aG = 0; aG + 3 <= aH.length; aG += 3) { aI = parseInt(aH.substring(aG, aG + 3), 16); aF += ac.charAt(aI >> 6) + ac.charAt(aI & 63) } if (aG + 1 == aH.length) {
                    aI = parseInt(aH.substring(aG, aG + 1), 16);
                    aF += ac.charAt(aI << 2)
                } else {
                    if (aG + 2 == aH.length) {
                        aI = parseInt(aH.substring(aG, aG + 2), 16); aF += ac.charAt(aI >> 2) + ac.charAt((aI & 3) << 4)
                    }
                } while ((aF.length & 3) > 0) { aF += W } return aF
            } function d(aJ) {
                var aH = ""; var aI; var aF = 0; var aG; for (aI = 0; aI < aJ.length; ++aI) {
                    if (aJ.charAt(aI) == W) {
                        break
                    } v = ac.indexOf(aJ.charAt(aI)); if (v < 0) { continue } if (aF == 0) { aH += aE(v >> 2); aG = v & 3; aF = 1 } else {
                        if (aF == 1) {
                            aH += aE((aG << 2) | (v >> 4)); aG = v & 15;
                            aF = 2
                        } else { if (aF == 2) { aH += aE(aG); aH += aE(v >> 2); aG = v & 3; aF = 3 } else { aH += aE((aG << 2) | (v >> 4)); aH += aE(v & 15); aF = 0 } }
                    }
                } if (aF == 1) {
                    aH += aE(aG << 2)
                } return aH
            } function T(aI) {
                var aH = d(aI); var aG; var aF = new Array(); for (aG = 0; 2 * aG < aH.length; ++aG) {
                    aF[aG] = parseInt(aH.substring(2 * aG, 2 * aG + 2), 16)
                } return aF
            } if (!ak.checkoutCombinedMode) { an(ak, V, S, P, A, X) } else {
                finalResponse = {}; if (S !== P || S !== A || P !== A) {
                    throw "successCallback and errorCallback and timeoutCallback must be the same in checkoutCombinedMode"
                } var af = V.pin; var l = V.accountNum; var R = function (aF) { V.accountNum = l; finalResponse.pinResponse = aF; S(finalResponse) }; var B = function () {
                    var aF = { timeout: true };
                    R(aF)
                }; var J = function (aF) {
                    finalResponse.panResponse = aF; delete V.accountNum; V.pin = af; ak.checkoutPinMode = true; an(ak, V, R, R, B, X)
                }; var Q = function () { var aF = { timeout: true }; J(aF) }; delete V.pin; ak.checkoutCombinedMode = false; an(ak, V, J, J, Q, X)
            } function an(aJ, bi, a6, bp, bj, bq) {
                var a1 = 13;
                var aR = 19; var aU = null; var aO = null; var a3 = true; var aX = false; var a0 = { ACCOUNT_NUM: 0, APPLE_PAY: 1, VISA_CHECKOUT: 2, CHECKOUT_ID: 3, CHECKOUT_PIN: 4 };
                try {
                    var aY = new Date().getTime(); var aT = 0; var ba = 0; var bf = null; var bn = null; var bh = a9(bq); be(aJ); setTimeout(aL, 10); a7(); var bw = null;
                    var a5 = null; var a8 = null; var aP = null; var bm; var bu; var bb
                } catch (bt) { bc(bt) } function bs(bx) {
                    var by; if (bf.length > 5000) {
                        throw new Error("Request URI is too long.  Length is " + bf.length + " characters")
                    } if (bx) { by = a.primaryUrl + "/eProtect/paypage?" + bf + "&targetServer=primary&jsoncallback=?"; getJSON(by, function (bz) { aO = bz }) } else {
                        by = a.secondaryUrl + "/eProtect/paypage?" + bf + "&targetServer=secondary&jsoncallback=?";
                        getJSON(by, function (bz) { aU = bz })
                    }
                } function bv(bA, bL, bK, bG, bB) {
                    try {
                        var bH = new Date(); var bI = bH.getTime(); var bF = bI - bA; var bN = 0;
                        if (bK) { bN = bK } var bE = encodeURIComponent(bG.paypageId); var bJ = encodeURIComponent(bG.reportGroup); var bz = encodeURIComponent(bG.orderId);
                        var bC = encodeURIComponent(bG.id); var by; var bM = "secondary"; if (bB) { by = a.primaryUrl; bM = "primary" } else { by = a.secondaryUrl } var bx = "paypageId=" + bE + "&responseTime=" + bF + "&responseCode=" + bL + "&tzOffset=" + bH.getTimezoneOffset() + "&timeout=" + bN;
                        bx += "&reportGroup=" + bJ + "&txnId=" + bC + "&orderId=" + bz + "&startTime=" + aY + "&targetServer=" + bM; setTimeout(function () {
                            try {
                                getJSON(by + "/eProtect/ppstats?" + bx + "&jsoncallback=?", function (bP) { })
                            } catch (bO) { }
                        }, 0)
                    } catch (bD) { }
                } function be(bx) {
                    if (bx !== undefined && bx.url != undefined && bx.url != null && bx.url.length > 0) {
                        a.primaryUrl = bx.url;
                        if (bx.secondaryUrl != undefined && bx.secondaryUrl != null && bx.secondaryUrl.length > 0) { a.secondaryUrl = bx.secondaryUrl }
                    } a3 = true; if ((bh > 0 && bh <= a.primaryTimeout) || (a.secondaryUrl == undefined || a.secondaryUrl == null || a.secondaryUrl.length == 0)) {
                        a3 = false
                    }
                } function aL() {
                    try {
                        aT = new Date().getTime() - aY; if (bn != null) { aQ(bn); return } if (bh > 0 && aT > bh) { aX = true } if (a3) {
                            switch (ba) {
                                case 0: break;
                                case 1: if (aO != null) { bv(aY, aO.response, bh, aJ, true); if (aO.response == "889") { ba = 3; bs(false) } else { aN(aO); return } } else {
                                    if (aT > a.primaryTimeout) {
                                        ba = 2;
                                        bs(false)
                                    }
                                } break; case 2: if (aO != null) { bv(aY, aO.response, bh, aJ, true); if (aO.response == "889") { ba = 3 } else { aN(aO); return } } else {
                                    if (aU != null) {
                                        bv(aY, aU.response, bh, aJ, false);
                                        if (aU.response != "887" && aU.response != "889") { aN(aU); return } else { ba = 4 }
                                    }
                                } break; case 3: if (aU != null) {
                                    bv(aY, aU.response, bh, aJ, false);
                                    if (aU.response == "887") { aN(aO) } else { aN(aU) } return
                                } else { if (aX) { aN(aO); return } } break; case 4: if (aO != null) {
                                    bv(aY, aO.response, bh, aJ, true);
                                    aN(aO); return
                                } else { if (aX) { if (aU.response == "887") { bd() } else { aN(aU) } return } } break; default: break
                            }
                        } else {
                            if (aO != null) {
                                bv(aY, aO.response, bq, aJ, true);
                                aN(aO); return
                            }
                        } if (aX) { if (ba == 0) { bv(aY, "900", bh, aJ, true) } else { bv(aY, "901", bh, aJ, true) } bd() } else {
                            setTimeout(arguments.callee, 10)
                        }
                    } catch (bx) { bc(bx); if (bn != null) { aN(bn); return } }
                } function bc(bC) {
                    try {
                        var bE = encodeURIComponent("GLOBAL_TRY_CATCH"); var bB = encodeURIComponent(0);
                        var by = encodeURIComponent(0); var bF = encodeURIComponent("A"); var bK = encodeURIComponent("NOT_A_STRING"); if (typeof bC === "object") {
                            try {
                                if (typeof bC.message === "undefined") {
                                    bF = "undefined"
                                } else { if (typeof bC.message === "string") { bF = bC.message; if (bF.length > 1024) { bF = bF.substr(0, 1024) } } else { bF = "NOT_A_STRING" } }
                            } catch (bG) {
                                bF = "UNABLE_TO_GET_ERROR_FROM_OBJECT"
                            } finally { bF = encodeURIComponent(bF) } try {
                                if (typeof bC.stack === "undefined") {
                                    bB = encodeURIComponent("UNDEFINED"); by = encodeURIComponent("UNDEFINED");
                                    bK = encodeURIComponent("UNDEFINED")
                                } else {
                                    if (typeof bC.stack === "string") {
                                        bK = bC.stack; if (bK.length > 3072) {
                                            bK = bK.substr(0, 3072)
                                        } var bD = /.*?eProtect-api.*?\.js:(\d+):(\d+)/.exec(bK); bK = encodeURIComponent(bK); if (!/^\d+$/.test(bD[1])) { bB = "NaN" } else {
                                            if (!/^\d{0,6}$/.test(bD[1])) {
                                                bB = "TOO_BIG"
                                            } else { bB = bD[1] }
                                        } bB = encodeURIComponent(bB); if (!/^\d+$/.test(bD[2])) { by = "NaN" } else {
                                            if (!/^\d{0,6}$/.test(bD[2])) {
                                                by = "TOO_BIG"
                                            } else { by = bD[2] }
                                        } by = encodeURIComponent(by)
                                    }
                                }
                            } catch (bG) {
                                bB = encodeURIComponent("EXCEPTION"); by = encodeURIComponent("EXCEPTION");
                                if (bK.length > 2000) { bK = bK.substr(0, 2000) } bK = encodeURIComponent(bK)
                            }
                        } else {
                            if (typeof bC === "string") {
                                if (bC.length > 1024) {
                                    bC = bC.substr(0, 1024)
                                } bF = encodeURIComponent(bC)
                            }
                        } if (typeof aJ === "object") {
                            try {
                                var bI = "undefined"; if (typeof aJ.paypageId === "undefined") {
                                    bI = "undefined"
                                } else { if (typeof aJ.paypageId === "string") { bI = aJ.paypageId; if (bI.length > 50) { bI = bI.substr(0, 50) } } else { bI = "NOT_A_STRING" } }
                            } catch (bG) {
                                bI = "UNABLE_TO_GET_PAYPAGE_ID"
                            } finally { bI = encodeURIComponent(bI) } var bA = "undefined"; try {
                                if (typeof aJ.orderId === "undefined") { bA = "undefined" } else {
                                    if (typeof aJ.orderId === "string") {
                                        bA = aJ.orderId;
                                        if (bA.length > 32) { bA = bA.substr(0, 32) }
                                    } else { bA = "NOT_A_STRING" }
                                }
                            } catch (bG) { bA = "UNABLE_TO_GET_ORDER_ID" } finally {
                                bA = encodeURIComponent(bA)
                            } var bz = "undefined"; try {
                                if (typeof aJ.reportGroup === "undefined") { bz = "undefined" } else {
                                    if (typeof aJ.reportGroup === "string") {
                                        bz = aJ.reportGroup;
                                        if (bz.length > 32) { bz = bz.substr(0, 32) }
                                    } else { bz = "NOT_A_STRING" }
                                }
                            } catch (bG) { bz = "UNABLE_TO_GET_REPORT_GROUP" } finally {
                                bz = encodeURIComponent(bz)
                            }
                        } bF = myVantivEProtectReporterForPpStats.removeNonStandardCharacters(bF); bK = myVantivEProtectReporterForPpStats.removeNonStandardCharacters(bK);
                        var bx = "errorHandler=" + bE + "&columnNumber=" + by + "&errorMessage=" + bF + "&lineNumber=" + bB + "&paypageId=" + bI + "&orderId=" + bA + "&reportGroup=" + bz + "&errorStack=" + bK;
                        var bJ = "https://request.eprotect.vantivcnp.com/eProtect/ppstats?" + bx + "&jsoncallback=?"; setTimeout(function () {
                            try {
                                getJSON(bJ, function (bM) { })
                            } catch (bL) { }
                        }, 0)
                    } catch (bH) { } finally { a2("889", bC) }
                } function aI() {
                    return bu === a0.ACCOUNT_NUM || bu === a0.CHECKOUT_ID || bu === a0.CHECKOUT_PIN
                } function a7() {
                    if (bi === undefined) { return a2("889", "Missing litleFormFields") } if (aJ === undefined) {
                        return a2("889", "Missing litleRequest")
                    } if (bi.paypageRegistrationId) { bi.paypageRegistrationId.value = "" } if (bi.bin) { bi.bin.value = "" } if (aJ.firstEight === undefined) {
                        aJ.firstEight = false
                    } bu = a0.ACCOUNT_NUM; if (aJ.applepay !== undefined) {
                        if (aJ.applepay.data !== undefined && aJ.applepay.signature !== undefined && aJ.applepay.version !== undefined && aJ.applepay.header.ephemeralPublicKey !== undefined && aJ.applepay.header.publicKeyHash !== undefined && aJ.applepay.header.transactionId !== undefined) {
                            bu = a0.APPLE_PAY
                        } else { return a2("889", "Missing ApplePay elements") }
                    } else {
                        if (aJ.checkoutIdMode !== undefined && aJ.checkoutIdMode) {
                            bu = a0.CHECKOUT_ID
                        } else {
                            if (aJ.visaCheckout !== undefined) {
                                if (aJ.visaCheckout.vInitRequest.apikey !== undefined && aJ.visaCheckout.encPaymentData !== undefined && aJ.visaCheckout.encKey !== undefined && aJ.visaCheckout.callid !== undefined) {
                                    bu = a0.VISA_CHECKOUT
                                } else { return a2("889", "Missing VisaCheckout elements") }
                            } else {
                                if (aJ.checkoutPinMode !== undefined && aJ.checkoutPinMode) {
                                    bu = a0.CHECKOUT_PIN
                                }
                            }
                        }
                    } if (bu === a0.CHECKOUT_ID) {
                        if (bi.checkoutId) { bi.checkoutId.value = "" } bb = typeof (bi.cvv2) != undefined && bi.cvv2 != null; if (bb) {
                            if (bi.cvv2.value === undefined) {
                                throw "Parameter cvv2.value is undefined"
                            } var bB = bi.cvv2.value; bB = bk(bB)
                        } else { return a2("889", "Missing cvv2") } bM = br(bB); if (bM != "870") { return a2(bM) } try {
                            var bC = new I();
                            var bN = bC.setPublic(b.modulus, b.exponent); var bG = bC.encrypt(bB)
                        } catch (bQ) {
                            myVantivEProtectReporterForPpStats.report3rdPartyError(bQ);
                            return a2("875")
                        } if (bG) { var bH = ah(bG); var bF = encodeURIComponent(bH) } else { return a2("875") }
                    } else {
                        if (bu === a0.ACCOUNT_NUM) {
                            try {
                                aW("accountNum", bi.accountNum, bg, aH)
                            } catch (bQ) { return a2("889", bQ) } if (bi.accountNum.value === undefined) { throw "Parameter accountNum.value is undefined" } bm = bi.accountNum.value;
                            bm = bk(bm); bb = typeof (bi.cvv2) != undefined && bi.cvv2 != null; if (bb) {
                                if (bi.cvv2.value === undefined) {
                                    throw "Parameter cvv2.value is undefined"
                                } var bB = bi.cvv2.value; bB = bk(bB)
                            } if (aJ.pciNonSensitive === undefined) { aJ.pciNonSensitive = false } var bM = aK(bm, aJ.pciNonSensitive, aJ.minPanLength, aJ.maxPanLength);
                            if (bM != "870") { return a2(bM) } if (bb) { bM = br(bB); if (bM != "870") { return a2(bM) } } var bD = typeof (bi.expYear) != undefined && bi.expYear != null;
                            var bx = ""; if (bD) { var bP = bi.expYear; bx = bP.options[bP.selectedIndex].text; bM = aS(bx); if (bM != "870") { return a2(bM) } } var bA = typeof (bi.expMonth) != undefined && bi.expMonth != null;
                            if (bA) { var bL = bi.expMonth; var by = bL.options[bL.selectedIndex].value; bM = aZ(by, bx); if (bM != "870") { return a2(bM) } } try {
                                var bC = new I();
                                var bN = bC.setPublic(b.modulus, b.exponent); var bz = bC.encrypt(bm); if (bb) { var bG = bC.encrypt(bB) }
                            } catch (bQ) {
                                myVantivEProtectReporterForPpStats.report3rdPartyError(bQ);
                                return a2("875")
                            } if (bz) { var bK = ah(bz); var bO = encodeURIComponent(bK); if (bb) { var bH = ah(bG); var bF = encodeURIComponent(bH) } } else {
                                return a2("875")
                            }
                        } else {
                            if (bu === a0.CHECKOUT_PIN) {
                                if (bi.pinCheckoutId) { bi.pinCheckoutId.value = "" } if (typeof (bi.pin) != undefined && bi.pin != null) {
                                    if (bi.pin.value === undefined) {
                                        throw "Parameter pin.value is undefined"
                                    } var bE = bi.pin.value; bE = bk(bE)
                                } else { return a2("893", "PIN num missing or too short") } if (bE.length <= 0) {
                                    return a2("893", "PIN num missing or too short")
                                } var bI = bl(bE)
                            }
                        }
                    } try { aW("paypageId", aJ.paypageId, bg, aH, bo); aW("reportGroup", aJ.reportGroup, bg, aH); aW("id", aJ.id, bg, aH) } catch (bQ) {
                        return a2("889", bQ)
                    } bw = encodeURIComponent(aJ.paypageId); a5 = encodeURIComponent(aJ.reportGroup); a8 = encodeURIComponent(aJ.orderId); aP = encodeURIComponent(aJ.id);
                    bf = "paypageId=" + bw + "&reportGroup=" + a5 + "&id=" + aP + "&orderId=" + a8; if (bu === a0.ACCOUNT_NUM) {
                        var bJ = encodeURIComponent(aJ.pciNonSensitive);
                        bf += "&encryptedAccount=" + bO + "&pciNonSensitive=" + bJ
                    } if (bu === a0.APPLE_PAY) {
                        bf += "&applepay.data=" + encodeURIComponent(aJ.applepay.data);
                        bf += "&applepay.signature=" + encodeURIComponent(aJ.applepay.signature); bf += "&applepay.version=" + encodeURIComponent(aJ.applepay.version);
                        bf += "&applepay.header.ephemeralPublicKey=" + encodeURIComponent(aJ.applepay.header.ephemeralPublicKey); bf += "&applepay.header.publicKeyHash=" + encodeURIComponent(aJ.applepay.header.publicKeyHash);
                        bf += "&applepay.header.transactionId=" + encodeURIComponent(aJ.applepay.header.transactionId); if (aJ.applepay.header.applicationData !== undefined) {
                            bf += "&applepay.header.applicationData=" + encodeURIComponent(aJ.applepay.header.applicationData)
                        }
                    } if (bu === a0.VISA_CHECKOUT) {
                        bf += "&visaCheckout.encPaymentData=" + encodeURIComponent(aJ.visaCheckout.encPaymentData); bf += "&visaCheckout.encKey=" + encodeURIComponent(aJ.visaCheckout.encKey);
                        bf += "&visaCheckout.apiKey=" + encodeURIComponent(aJ.visaCheckout.vInitRequest.apikey); if (aJ.visaCheckout.vInitRequest.encryptionKey) {
                            bf += "&visaCheckout.encryptionKey=" + encodeURIComponent(aJ.visaCheckout.vInitRequest.encryptionKey)
                        } bf += "&visaCheckout.callid=" + encodeURIComponent(aJ.visaCheckout.callid)
                    } if (bb) { bf += "&encryptedCvv=" + bF } if (bu === a0.CHECKOUT_ID) {
                        bf += "&checkoutIdMode=true"
                    } if (bu === a0.CHECKOUT_PIN) { bf += "&encryptedPin=" + bI } if (aI()) { bf += "&publicKeyId=" + b.keyId } if (aJ.firstEight) {
                        bf += "&firstEight=true"
                    } bf += "&requestType=eProtect"; ba = 1; bs(true)
                } function aF(bz, bx) {
                    if (bz === undefined) { return bx } if (typeof bz === "number" && isFinite(bz) && Math.floor(bz) === bz) {
                        return bz
                    } if (typeof bz === "string") { var by = /^[0-9]+$/.test(bz); if (by) { return parseInt(bz) } } return bx
                } function a9(by) {
                    if (by != undefined) {
                        if (typeof by == "number") {
                            return by
                        } else { if (typeof by == "string") { var bx = /^[0-9]+$/.test(by); if (bx) { return parseInt(by) } return 15000 } }
                    } return 0
                } function a4(bz) {
                    if (bu === a0.CHECKOUT_ID) {
                        if (bi.checkoutId) {
                            bi.checkoutId.value = bz.checkoutId
                        }
                    } else {
                        if (bu === a0.ACCOUNT_NUM) {
                            var bA = bk(bm); bi.accountNum.value = aV(bm); if (aJ.firstEight && bA.length >= 8) {
                                bz.firstEight = bA.substring(0, 8)
                            } else { bz.firstSix = bA.substring(0, 6); bz.lastFour = bA.substring(bA.length - 4, bA.length) } if (bi.extraAccountNums) {
                                for (var by in bi.extraAccountNums) {
                                    var bx = bi.extraAccountNums[by];
                                    if (bx.value === undefined) { throw "Parameter extraAccountNums[" + by + "].value is undefined" } bx.value = aV(bk(bx.value))
                                }
                            }
                        } if (bi.bin) {
                            bi.bin.value = bz.bin
                        } if (bi.paypageRegistrationId) { bi.paypageRegistrationId.value = bz.paypageRegistrationId }
                    } if (bu === a0.ACCOUNT_NUM || bu === a0.CHECKOUT_ID) {
                        if (bb) {
                            bi.cvv2.value = "000"
                        }
                    } if (bu === a0.CHECKOUT_PIN) {
                        if (bi.pinCheckoutId) { bi.pinCheckoutId.value = bz.pinCheckoutId } if (bi.pin) {
                            bi.pin.value = bi.pin.value.replace(/./g, "X")
                        }
                    } if (a6 === undefined) { throw "successCallback undefined" } if (typeof a6 !== "function") { throw "successCallback not a function" } a6(bz)
                } function aQ(bx) {
                    if (bp === undefined) { throw "errorCallback undefined" } if (typeof bp !== "function") {
                        throw "errorCallback not a function"
                    } bp(bx)
                } function bd() { bj() } function aN(bx) { if (bx.response == "870") { a4(bx) } else { aQ(bx) } return } function aV(bx) {
                    if (!bx) {
                        return bx
                    } bx = bx.substring(0, bx.length - 4).replace(/./g, "X").concat(bx.substring(bx.length - 4)); return bx
                } function aG(bx) {
                    bx = (bx + "").split("").reverse();
                    if (!bx.length) { return false } var bz = 0, by; for (by = 0; by < bx.length; by++) {
                        bx[by] = parseInt(bx[by]); bz += by % 2 ? 2 * bx[by] - (bx[by] > 4 ? 9 : 0) : bx[by]
                    } return (bz % 10) == 0
                } function aK(bA, by, bx, bz) {
                    bx = aF(bx, a1); bz = aF(bz, aR); if (bA.length < bx) { return "872" } else {
                        if (bA.length > bz) {
                            return "873"
                        } else { if (!bA.match(/^[0-9]+$/)) { return "874" } else { if (!by && !aG(bA)) { return "871" } else { return "870" } } }
                    }
                } function br(bx) {
                    if (bx.length < 3) {
                        return "882"
                    } else { if (bx.length > 4) { return "883" } else { if (!bx.match(/^\d\d\d\d?$/)) { return "881" } else { return "870" } } }
                } function aS(bz) {
                    if (bz == "") {
                        return "886"
                    } var bx = new Date(); var by = bx.getFullYear(); if (parseInt(bz) < by) { return "886" } else { return "870" }
                } function aZ(bB, bA) {
                    if (bB == "" || bA == "") {
                        return "886"
                    } var bx = new Date(); var by = bx.getFullYear(); var bz = bx.getMonth() + 1; if (by == parseInt(bA) && bz > parseInt(bB)) { return "886" } else {
                        return "870"
                    }
                } function aM(bx) { if (bx.length > 0) { return "870" } else { return } } function aW() {
                    var by = arguments[0]; var bz = arguments[1]; if (bz === undefined) {
                        throw "Parameter " + by + " is undefined"
                    } for (var bx = 2; bx < arguments.length; bx++) { arguments[bx](by, bz) }
                } function bg(bx, by) {
                    if (by.length == 0) {
                        throw "Parameter " + bx + " is required"
                    }
                } function aH(bx, by) { if (by.length > 1024) { throw "Parameter " + bx + " is too long.  Length is " + by.length } } function bo(bx, by) {
                    if (!by.match(/^[0-9a-zA-Z]+$/)) {
                        throw "Parameter " + bx + " with value " + by + " is not alphanumeric"
                    }
                } function a2(bB, bA) {
                    var bC = { response: null, message: null }; var by = { "870": "Success", "871": "Account number not mod10", "872": "Account number too short", "873": "Account number too long", "874": "Account number not numeric", "875": "Unable to encrypt field", "876": "Account number invalid", "877": "Invalid paypage registration id", "878": "Expired paypage registration id", "879": "Merchant is not authorized for Paypage", "880": "Report Group Invalid", "881": "Card validation num not numeric", "882": "Card validation num too short", "883": "Card validation num too long", "884": "PayFrame HTML failed to load", "885": "PayFrame CSS failed to load", "886": "Expiration date invalid", "887": "Secondary PayPage request for non-Vantiv token merchant", "888": "Paypage Signature Verification Failed", "889": "Failure" };
                    function bx(bD) { return bD < 10 ? "0" + bD : bD } function bz(bD) {
                        return bD.getUTCFullYear() + "-" + bx(bD.getUTCMonth() + 1) + "-" + bx(bD.getUTCDate()) + "T" + bx(bD.getUTCHours()) + ":" + bx(bD.getUTCMinutes()) + ":" + bx(bD.getUTCSeconds())
                    } bC.response = bB; if (bA == undefined) { bC.message = by[bB] } else { bC.message = bA } bC.responseTime = bz(new Date()); if (aJ !== undefined) {
                        bC.reportGroup = aJ.reportGroup;
                        bC.id = aJ.id; bC.orderId = aJ.orderId
                    } bn = bC
                } function bk(bx) { return bx.replace(/[ -]/gi, "") } function bl(bx) {
                    try {
                        var bA = new I();
                        var bz = bA.setPublic(b.modulus, b.exponent); var bB = bA.encrypt(bx)
                    } catch (bD) {
                        myVantivEProtectReporterForPpStats.report3rdPartyError(bD);
                        return a2("875")
                    } if (bB) { var by = ah(bB); var bC = encodeURIComponent(by) } else { return a2("875") } return bC
                }
            }
        }, getVisaCheckoutApiKey: function () {
            return b.visaCheckoutApiKey
        }, getVisaCheckoutEncryptionKey: function () { return b.visaCheckoutEncryptionKey }
    }
};
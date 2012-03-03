if (!exports)
    var exports = {};

(function() {
    var RE_VOWELS = "[aiueo]";
    var RE_CONSONANTS = "[bcdfghjklpqrstvwxyz]";
    var KATA2HEPBURN = {
	"ア":"a",     "イ":"i",     "ウ":"u",     "エ":"e",     "オ":"o",
	"ァ":"xa",    "ィ":"xi",    "ゥ":"xu",    "ェ":"xe",    "ォ":"xo",
	"カ":"ka",    "キ":"ki",    "ク":"ku",    "ケ":"ke",    "コ":"ko",
	"ガ":"ga",    "ギ":"gi",    "グ":"gu",    "ゲ":"ge",    "ゴ":"go",
	"キャ":"kya",               "キュ":"kyu",               "キョ":"kyo",
	"ギャ":"gya",               "ギュ":"gyu",               "ギョ":"gyo",
	"サ":"sa",    "シ":"shi",   "ス":"su",    "セ":"se",    "ソ":"so",
	"ザ":"za",    "ジ":"ji",    "ズ":"zu",    "ゼ":"ze",    "ゾ":"zo",
	"シャ":"sha",               "シュ":"shu",               "ショ":"sho",
	"ジャ":"ja",                "ジュ":"ju",  "ジェ":"jie", "ジョ":"jo",
	"タ":"ta",    "チ":"chi",   "ツ":"tsu",   "テ":"te",    "ト":"to",
	              "ティ":"tei", "トゥ":"tu",
	"ダ":"da",    "ディ":"dei", "ドゥ":"du",  "デ":"de",    "ド":"do",
	              "ヂ":"ji",    "ヅ":"zu",
	"チャ":"cha",               "チュ":"chu", "チェ":"chie","チョ":"cho",
	"ヂャ":"dha",               "ヂュ":"dhu", "ヂェ":"dhe", "ヂョ":"dho",
	"デュ":"deyu",
	"ナ":"na",    "ニ":"ni",    "ヌ":"nu",    "ネ":"ne",    "ノ":"no",
	"ニャ":"nya",               "ニュ":"nyu",               "ニョ":"nyo",
	"ハ":"ha",    "ヒ":"hi",    "フ":"fu",    "ヘ":"he",    "ホ":"ho",
	"ヒャ":"hya",               "ヒュ":"hyu",               "ヒョ":"hyo",
	"バ":"ba",    "ビ":"bi",    "ブ":"bu",    "ベ":"be",    "ボ":"bo",
	"ビャ":"hya",               "ビュ":"hyu",               "ビョ":"hyo",
	"パ":"pa",    "ピ":"pi",    "プ":"pu",    "ぺ":"pe",    "ポ":"po",
	"ピャ":"pya",               "ピュ":"pyu",               "ピョ":"pyo",
	"ファ":"fua", "フィ":"fui",               "フェ":"fue", "フォ":"fuo",
	"マ":"ma",    "ミ":"mi",    "ム":"mu",    "メ":"me",    "モ":"mo",
	"ミャ":"mya",               "ミュ":"myu",               "ミョ":"myo",
	"ヤ":"ya",                  "ユ":"yu",                  "ヨ":"yo",
	"ャ":"xya",                 "ュ":"xyu",                 "ョ":"xyo",
	"ラ":"ra",    "リ":"ri",    "ル":"ru",    "レ":"re",    "ロ":"ro",
	"リャ":"rya",               "リュ":"ryu",               "リョ":"ryo",
	"ワ":"wa",   "ヰ":"wi",                   "ヱ":"we",    "ヲ":"wo",
	"ヴァ":"bu", "ヴィ":"bui",  "ヴ":"bu",    "ヴェ":"bue", "ヴォ":"buo", 
	"ン":"n"
    };
    
    var RE_KANA2HEPBURN = (function() {
	var keys = [];
	for (var key in KATA2HEPBURN) {
	    keys.push(key);
	}
	keys.sort(function(a,b) { return b.length - a.length});
	return new RegExp("(?:" + keys.join("|") + ")", "igm");
    })();

    var kana2romaji = function (str) {
	// step 1
	str = str.replace(RE_KANA2HEPBURN, function(s) {
	    return KATA2HEPBURN[s];
	});
	// step2; ッta -> ta
	str = str.replace(new RegExp("[ッ](" + RE_CONSONANTS + ")", "igm"), function(whole, s) {
	    return s + s;
	});
	// step3; oー -> oo
	str = str.replace(new RegExp("(" + RE_VOWELS +")ー", "igm"), function(whole, s) {
	    return s + s;
	});
	// step4; ou, oo -> o, aa -> a, ii -> i, uu -> u ee-> e
	str = str.replace(/(aa|ii|uu|ee|ou|oo)/igm, function(whole, s) {
	    return s.substring(0,1);
	});
	// step5; nb, np, nm -> mb, mp, mm
	str = str.replace(/n([bpm])/igm, function(whole, s) {
	    return "m" + s;
	});
	return str;
    };

    exports.kana2romaji = kana2romaji;
})();

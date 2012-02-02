if (!exports)
	var exports = {};

(function() {
	var RE_VOWELS = "[aiueo]";
	var RE_CONSONANTS = "[bcdfghjklpqrstvwxyz]";
	var KATA2HEPBURN = {
		"ア":"a",  "イ":"i",   "ウ":"u",   "エ":"e",  "オ":"o",
		"ァ":"xa", "ィ":"xi",  "ゥ":"xu",  "ェ":"xe", "ォ":"xo",
		"カ":"ka", "キ":"ki",  "ク":"ku",  "ケ":"ke", "コ":"ko",
		"ガ":"ga", "ギ":"gi", "グ":"gu", "ゲ":"ge", "ゴ":"go",
		"キャ":"kya"        , "キュ":"kyu",           "キョ":"kyo",
		"サ":"sa", "シ":"shi", "ス":"su",  "セ":"se", "ソ":"so",
		"ザ":"za", "ジ":"ji", "ズ":"zu", "ゼ":"ze", "ゾ":"zo",
		"シャ":"sha",          "シュ":"shu",         "ショ":"sho",
		"ジャ":"ja",           "ジュ":"ju",          "ジョ":"jo",
		"タ":"ta", "チ":"chi", "ツ":"tsu", "テ":"te", "ト":"to",
		           "ティ":"ti", "トゥ":"tu",
		"ダ":"da", "ディ":"di", "ドゥ":"du", "デ":"de", "ド":"do",
		           "ヂ":"dhi", "ヅ":"dhu",
		"チャ":"cha",          "チュ":"chu", "チェ":"che", "チョ":"cho",
		"ヂャ":"dha",          "ヂュ":"dhu", "ヂェ":"dhe", "ヂョ":"dho",
		"ナ":"na", "ニ":"ni",  "ヌ":"nu",  "ネ":"ne", "ノ":"no",
		"ハ":"ha", "ヒ":"hi",  "フ":"fu",  "ヘ":"he", "ホ":"ho",
		"ヒャ":"hya",
		"バ":"ba", "ビ":"bi", "ブ":"bu", "ベ":"be", "ボ":"bo",
		"ビャ":"bya",
		"パ":"pa", "ピ":"pi", "プ":"pu", "ぺ":"pe", "ポ":"po",
		"ピャ":"pya",
		"ファ":"fa", "フィ":"fi",          "フェ":"fe", "フォ":"fo",
		"マ":"ma", "ミ":"mi",  "ム":"mu",  "メ":"me", "モ":"mo",
		"ヤ":"ya", "ユ":"yu",  "ヨ":"yo",
		"ャ":"xya", "ュ":"xyu",  "ョ":"xyo",
		"ラ":"ra", "リ":"ri", "ル":"ru", "レ":"re", "ロ":"ro",
		"リャ":"rya",         "リュ":"ryu",         "リョ":"ryo",
		"ワ":"wa", "ヰ":"wi",            "ヱ":"we", "ヲ":"wo",
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

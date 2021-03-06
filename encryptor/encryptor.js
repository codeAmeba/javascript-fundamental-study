function Encryptor() {
  var obj = {};
  return obj;
}

var N_ALPHABET = 26;
var extraCharactors = [
  ',', '.', '?', '!', '%', '#', "'", '&', '$', '@', ':', '/'
];

obj.chars = [];
for (var c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
  obj.chars.push(String.fromCharCode(c));
}
for (var c = 'A'.charCodeAt(0); c <= 'Z'.charCodeAt(0); c++) {
  obj.chars.push(String.fromCharCode(c));
}
for (var d = 0; d <= 9; d++) {
  obj.chars.push(d.toString());
}
for (var j = 0; j < extraCharactors.length; j++) {
  obj.chars.push(extraCharactors[j]);
}

obj.nchars = obj.chars.length;

obj.numberOf = function(ch) {
  var code = ch.charCodeAt(0);
  if (code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)) {
    return code - 'a'.charCodeAt(0);
  } else if (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)) {
    return N_ALPHABET + code - 'A'.charCodeAt(0);
  } else if (code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0)) {
    return 2 * N_ALPHABET + code - '0'.charCodeAt(0);
  } else {
    for (var k = 0; k < extraCharactors.length; k++) {
      if (ch === extraCharactors[k]) {
        return 2 * N_ALPHABET + 10 + k;
      }
    }
    return null;
  }
};

obj.shift = function(ch, n) {
  var num = this.numberOf(ch);
  if (num === null) return ch;
  num = (num + n + this.nchars) % this.nchars;
  return this.chars[num];
};

obj.encrypt = function(text, keyword, encription) {
  var cipherText = '';
  var nkey = keyword.length;
  for (var i = 0, ikey = 0; i < text.length; i++, ikey++) {
    ikey %= nkey;
    var nshift = this.numberOf(keyword[ikey]);
    if (!encription) nshift *= -1;
    cipherText += this.shift(text[i], nshift);
  }
  return cipherText;
};


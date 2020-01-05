["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/labs/useragent/util.js"],"~:js","goog.provide(\"goog.labs.userAgent.util\");\ngoog.require(\"goog.string.internal\");\n/**\n * @private\n * @return {string}\n */\ngoog.labs.userAgent.util.getNativeUserAgentString_ = function() {\n  var navigator = goog.labs.userAgent.util.getNavigator_();\n  if (navigator) {\n    var userAgent = navigator.userAgent;\n    if (userAgent) {\n      return userAgent;\n    }\n  }\n  return \"\";\n};\n/**\n * @private\n * @return {Navigator}\n */\ngoog.labs.userAgent.util.getNavigator_ = function() {\n  return goog.global.navigator;\n};\n/** @private @type {string} */ goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();\n/**\n * @param {?string=} opt_userAgent\n */\ngoog.labs.userAgent.util.setUserAgent = function(opt_userAgent) {\n  goog.labs.userAgent.util.userAgent_ = opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();\n};\n/**\n * @return {string}\n */\ngoog.labs.userAgent.util.getUserAgent = function() {\n  return goog.labs.userAgent.util.userAgent_;\n};\n/**\n * @param {string} str\n * @return {boolean}\n */\ngoog.labs.userAgent.util.matchUserAgent = function(str) {\n  var userAgent = goog.labs.userAgent.util.getUserAgent();\n  return goog.string.internal.contains(userAgent, str);\n};\n/**\n * @param {string} str\n * @return {boolean}\n */\ngoog.labs.userAgent.util.matchUserAgentIgnoreCase = function(str) {\n  var userAgent = goog.labs.userAgent.util.getUserAgent();\n  return goog.string.internal.caseInsensitiveContains(userAgent, str);\n};\n/**\n * @param {string} userAgent\n * @return {!Array<!Array<string>>}\n */\ngoog.labs.userAgent.util.extractVersionTuples = function(userAgent) {\n  var versionRegExp = new RegExp(\"(\\\\w[\\\\w ]+)\" + \"/\" + \"([^\\\\s]+)\" + \"\\\\s*\" + \"(?:\\\\((.*?)\\\\))?\", \"g\");\n  var data = [];\n  var match;\n  while (match = versionRegExp.exec(userAgent)) {\n    data.push([match[1], match[2], match[3] || undefined]);\n  }\n  return data;\n};\n","~:source","// Copyright 2013 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Utilities used by goog.labs.userAgent tools. These functions\n * should not be used outside of goog.labs.userAgent.*.\n *\n * @author nnaze@google.com (Nathan Naze)\n */\n\ngoog.provide('goog.labs.userAgent.util');\n\ngoog.require('goog.string.internal');\n\n\n/**\n * Gets the native userAgent string from navigator if it exists.\n * If navigator or navigator.userAgent string is missing, returns an empty\n * string.\n * @return {string}\n * @private\n */\ngoog.labs.userAgent.util.getNativeUserAgentString_ = function() {\n  var navigator = goog.labs.userAgent.util.getNavigator_();\n  if (navigator) {\n    var userAgent = navigator.userAgent;\n    if (userAgent) {\n      return userAgent;\n    }\n  }\n  return '';\n};\n\n\n/**\n * Getter for the native navigator.\n * This is a separate function so it can be stubbed out in testing.\n * @return {Navigator}\n * @private\n */\ngoog.labs.userAgent.util.getNavigator_ = function() {\n  return goog.global.navigator;\n};\n\n\n/**\n * A possible override for applications which wish to not check\n * navigator.userAgent but use a specified value for detection instead.\n * @private {string}\n */\ngoog.labs.userAgent.util.userAgent_ =\n    goog.labs.userAgent.util.getNativeUserAgentString_();\n\n\n/**\n * Applications may override browser detection on the built in\n * navigator.userAgent object by setting this string. Set to null to use the\n * browser object instead.\n * @param {?string=} opt_userAgent The User-Agent override.\n */\ngoog.labs.userAgent.util.setUserAgent = function(opt_userAgent) {\n  goog.labs.userAgent.util.userAgent_ =\n      opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();\n};\n\n\n/**\n * @return {string} The user agent string.\n */\ngoog.labs.userAgent.util.getUserAgent = function() {\n  return goog.labs.userAgent.util.userAgent_;\n};\n\n\n/**\n * @param {string} str\n * @return {boolean} Whether the user agent contains the given string.\n */\ngoog.labs.userAgent.util.matchUserAgent = function(str) {\n  var userAgent = goog.labs.userAgent.util.getUserAgent();\n  return goog.string.internal.contains(userAgent, str);\n};\n\n\n/**\n * @param {string} str\n * @return {boolean} Whether the user agent contains the given string, ignoring\n *     case.\n */\ngoog.labs.userAgent.util.matchUserAgentIgnoreCase = function(str) {\n  var userAgent = goog.labs.userAgent.util.getUserAgent();\n  return goog.string.internal.caseInsensitiveContains(userAgent, str);\n};\n\n\n/**\n * Parses the user agent into tuples for each section.\n * @param {string} userAgent\n * @return {!Array<!Array<string>>} Tuples of key, version, and the contents\n *     of the parenthetical.\n */\ngoog.labs.userAgent.util.extractVersionTuples = function(userAgent) {\n  // Matches each section of a user agent string.\n  // Example UA:\n  // Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us)\n  // AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405\n  // This has three version tuples: Mozilla, AppleWebKit, and Mobile.\n\n  var versionRegExp = new RegExp(\n      // Key. Note that a key may have a space.\n      // (i.e. 'Mobile Safari' in 'Mobile Safari/5.0')\n      '(\\\\w[\\\\w ]+)' +\n\n          '/' +                // slash\n          '([^\\\\s]+)' +        // version (i.e. '5.0b')\n          '\\\\s*' +             // whitespace\n          '(?:\\\\((.*?)\\\\))?',  // parenthetical info. parentheses not matched.\n      'g');\n\n  var data = [];\n  var match;\n\n  // Iterate and collect the version tuples.  Each iteration will be the\n  // next regex match.\n  while (match = versionRegExp.exec(userAgent)) {\n    data.push([\n      match[1],  // key\n      match[2],  // value\n      // || undefined as this is not undefined in IE7 and IE8\n      match[3] || undefined  // info\n    ]);\n  }\n\n  return data;\n};\n","~:compiled-at",1578145490874,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.labs.useragent.util.js\",\n\"lineCount\":66,\n\"mappings\":\"AAqBAA,IAAAC,QAAA,CAAa,0BAAb,CAAA;AAEAD,IAAAE,QAAA,CAAa,sBAAb,CAAA;AAUA;;;;AAAAF,IAAAG,KAAAC,UAAAC,KAAAC,0BAAA,GAAqDC,QAAQ,EAAG;AAC9D,MAAIC,YAAYR,IAAAG,KAAAC,UAAAC,KAAAI,cAAA,EAAhB;AACA,MAAID,SAAJ,CAAe;AACb,QAAIJ,YAAYI,SAAAJ,UAAhB;AACA,QAAIA,SAAJ;AACE,aAAOA,SAAP;AADF;AAFa;AAMf,SAAO,EAAP;AAR8D,CAAhE;AAkBA;;;;AAAAJ,IAAAG,KAAAC,UAAAC,KAAAI,cAAA,GAAyCC,QAAQ,EAAG;AAClD,SAAOV,IAAAW,OAAAH,UAAP;AADkD,CAApD;AAUA,+BAAAR,IAAAG,KAAAC,UAAAC,KAAAO,WAAA,GACIZ,IAAAG,KAAAC,UAAAC,KAAAC,0BAAA,EADJ;AAUA;;;AAAAN,IAAAG,KAAAC,UAAAC,KAAAQ,aAAA,GAAwCC,QAAQ,CAACC,aAAD,CAAgB;AAC9Df,MAAAG,KAAAC,UAAAC,KAAAO,WAAA,GACIG,aADJ,IACqBf,IAAAG,KAAAC,UAAAC,KAAAC,0BAAA,EADrB;AAD8D,CAAhE;AASA;;;AAAAN,IAAAG,KAAAC,UAAAC,KAAAW,aAAA,GAAwCC,QAAQ,EAAG;AACjD,SAAOjB,IAAAG,KAAAC,UAAAC,KAAAO,WAAP;AADiD,CAAnD;AASA;;;;AAAAZ,IAAAG,KAAAC,UAAAC,KAAAa,eAAA,GAA0CC,QAAQ,CAACC,GAAD,CAAM;AACtD,MAAIhB,YAAYJ,IAAAG,KAAAC,UAAAC,KAAAW,aAAA,EAAhB;AACA,SAAOhB,IAAAqB,OAAAC,SAAAC,SAAA,CAA8BnB,SAA9B,EAAyCgB,GAAzC,CAAP;AAFsD,CAAxD;AAWA;;;;AAAApB,IAAAG,KAAAC,UAAAC,KAAAmB,yBAAA,GAAoDC,QAAQ,CAACL,GAAD,CAAM;AAChE,MAAIhB,YAAYJ,IAAAG,KAAAC,UAAAC,KAAAW,aAAA,EAAhB;AACA,SAAOhB,IAAAqB,OAAAC,SAAAI,wBAAA,CAA6CtB,SAA7C,EAAwDgB,GAAxD,CAAP;AAFgE,CAAlE;AAYA;;;;AAAApB,IAAAG,KAAAC,UAAAC,KAAAsB,qBAAA,GAAgDC,QAAQ,CAACxB,SAAD,CAAY;AAOlE,MAAIyB,gBAAgB,IAAIC,MAAJ,CAGhB,cAHgB,GAKZ,GALY,GAMZ,WANY,GAOZ,MAPY,GAQZ,kBARY,EAShB,GATgB,CAApB;AAWA,MAAIC,OAAO,EAAX;AACA,MAAIC,KAAJ;AAIA,SAAOA,KAAP,GAAeH,aAAAI,KAAA,CAAmB7B,SAAnB,CAAf;AACE2B,QAAAG,KAAA,CAAU,CACRF,KAAA,CAAM,CAAN,CADQ,EAERA,KAAA,CAAM,CAAN,CAFQ,EAIRA,KAAA,CAAM,CAAN,CAJQ,IAIIG,SAJJ,CAAV,CAAA;AADF;AASA,SAAOJ,IAAP;AAhCkE,CAApE;;\",\n\"sources\":[\"goog/labs/useragent/util.js\"],\n\"sourcesContent\":[\"// Copyright 2013 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Utilities used by goog.labs.userAgent tools. These functions\\n * should not be used outside of goog.labs.userAgent.*.\\n *\\n * @author nnaze@google.com (Nathan Naze)\\n */\\n\\ngoog.provide('goog.labs.userAgent.util');\\n\\ngoog.require('goog.string.internal');\\n\\n\\n/**\\n * Gets the native userAgent string from navigator if it exists.\\n * If navigator or navigator.userAgent string is missing, returns an empty\\n * string.\\n * @return {string}\\n * @private\\n */\\ngoog.labs.userAgent.util.getNativeUserAgentString_ = function() {\\n  var navigator = goog.labs.userAgent.util.getNavigator_();\\n  if (navigator) {\\n    var userAgent = navigator.userAgent;\\n    if (userAgent) {\\n      return userAgent;\\n    }\\n  }\\n  return '';\\n};\\n\\n\\n/**\\n * Getter for the native navigator.\\n * This is a separate function so it can be stubbed out in testing.\\n * @return {Navigator}\\n * @private\\n */\\ngoog.labs.userAgent.util.getNavigator_ = function() {\\n  return goog.global.navigator;\\n};\\n\\n\\n/**\\n * A possible override for applications which wish to not check\\n * navigator.userAgent but use a specified value for detection instead.\\n * @private {string}\\n */\\ngoog.labs.userAgent.util.userAgent_ =\\n    goog.labs.userAgent.util.getNativeUserAgentString_();\\n\\n\\n/**\\n * Applications may override browser detection on the built in\\n * navigator.userAgent object by setting this string. Set to null to use the\\n * browser object instead.\\n * @param {?string=} opt_userAgent The User-Agent override.\\n */\\ngoog.labs.userAgent.util.setUserAgent = function(opt_userAgent) {\\n  goog.labs.userAgent.util.userAgent_ =\\n      opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();\\n};\\n\\n\\n/**\\n * @return {string} The user agent string.\\n */\\ngoog.labs.userAgent.util.getUserAgent = function() {\\n  return goog.labs.userAgent.util.userAgent_;\\n};\\n\\n\\n/**\\n * @param {string} str\\n * @return {boolean} Whether the user agent contains the given string.\\n */\\ngoog.labs.userAgent.util.matchUserAgent = function(str) {\\n  var userAgent = goog.labs.userAgent.util.getUserAgent();\\n  return goog.string.internal.contains(userAgent, str);\\n};\\n\\n\\n/**\\n * @param {string} str\\n * @return {boolean} Whether the user agent contains the given string, ignoring\\n *     case.\\n */\\ngoog.labs.userAgent.util.matchUserAgentIgnoreCase = function(str) {\\n  var userAgent = goog.labs.userAgent.util.getUserAgent();\\n  return goog.string.internal.caseInsensitiveContains(userAgent, str);\\n};\\n\\n\\n/**\\n * Parses the user agent into tuples for each section.\\n * @param {string} userAgent\\n * @return {!Array<!Array<string>>} Tuples of key, version, and the contents\\n *     of the parenthetical.\\n */\\ngoog.labs.userAgent.util.extractVersionTuples = function(userAgent) {\\n  // Matches each section of a user agent string.\\n  // Example UA:\\n  // Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us)\\n  // AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405\\n  // This has three version tuples: Mozilla, AppleWebKit, and Mobile.\\n\\n  var versionRegExp = new RegExp(\\n      // Key. Note that a key may have a space.\\n      // (i.e. 'Mobile Safari' in 'Mobile Safari/5.0')\\n      '(\\\\\\\\w[\\\\\\\\w ]+)' +\\n\\n          '/' +                // slash\\n          '([^\\\\\\\\s]+)' +        // version (i.e. '5.0b')\\n          '\\\\\\\\s*' +             // whitespace\\n          '(?:\\\\\\\\((.*?)\\\\\\\\))?',  // parenthetical info. parentheses not matched.\\n      'g');\\n\\n  var data = [];\\n  var match;\\n\\n  // Iterate and collect the version tuples.  Each iteration will be the\\n  // next regex match.\\n  while (match = versionRegExp.exec(userAgent)) {\\n    data.push([\\n      match[1],  // key\\n      match[2],  // value\\n      // || undefined as this is not undefined in IE7 and IE8\\n      match[3] || undefined  // info\\n    ]);\\n  }\\n\\n  return data;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"labs\",\"userAgent\",\"util\",\"getNativeUserAgentString_\",\"goog.labs.userAgent.util.getNativeUserAgentString_\",\"navigator\",\"getNavigator_\",\"goog.labs.userAgent.util.getNavigator_\",\"global\",\"userAgent_\",\"setUserAgent\",\"goog.labs.userAgent.util.setUserAgent\",\"opt_userAgent\",\"getUserAgent\",\"goog.labs.userAgent.util.getUserAgent\",\"matchUserAgent\",\"goog.labs.userAgent.util.matchUserAgent\",\"str\",\"string\",\"internal\",\"contains\",\"matchUserAgentIgnoreCase\",\"goog.labs.userAgent.util.matchUserAgentIgnoreCase\",\"caseInsensitiveContains\",\"extractVersionTuples\",\"goog.labs.userAgent.util.extractVersionTuples\",\"versionRegExp\",\"RegExp\",\"data\",\"match\",\"exec\",\"push\",\"undefined\"]\n}\n"]
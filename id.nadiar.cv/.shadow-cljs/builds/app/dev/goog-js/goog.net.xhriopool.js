["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/net/xhriopool.js"],"~:js","goog.provide(\"goog.net.XhrIoPool\");\ngoog.require(\"goog.net.XhrIo\");\ngoog.require(\"goog.structs.PriorityPool\");\n/**\n * @constructor\n * @extends {goog.structs.PriorityPool}\n * @param {goog.structs.Map=} opt_headers\n * @param {number=} opt_minCount\n * @param {number=} opt_maxCount\n * @param {boolean=} opt_withCredentials\n */\ngoog.net.XhrIoPool = function(opt_headers, opt_minCount, opt_maxCount, opt_withCredentials) {\n  /** @private @type {(goog.structs.Map|undefined)} */ this.headers_ = opt_headers;\n  /** @private @type {boolean} */ this.withCredentials_ = !!opt_withCredentials;\n  goog.structs.PriorityPool.call(this, opt_minCount, opt_maxCount);\n};\ngoog.inherits(goog.net.XhrIoPool, goog.structs.PriorityPool);\n/**\n * @return {!goog.net.XhrIo}\n * @override\n */\ngoog.net.XhrIoPool.prototype.createObject = function() {\n  var xhrIo = new goog.net.XhrIo;\n  var headers = this.headers_;\n  if (headers) {\n    headers.forEach(function(value, key) {\n      xhrIo.headers.set(key, value);\n    });\n  }\n  if (this.withCredentials_) {\n    xhrIo.setWithCredentials(true);\n  }\n  return xhrIo;\n};\n/**\n * @param {Object} obj\n * @return {boolean}\n * @override\n */\ngoog.net.XhrIoPool.prototype.objectCanBeReused = function(obj) {\n  var xhr = /** @type {goog.net.XhrIo} */ (obj);\n  return !xhr.isDisposed() && !xhr.isActive();\n};\n","~:source","// Copyright 2006 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Creates a pool of XhrIo objects to use. This allows multiple\n * XhrIo objects to be grouped together and requests will use next available\n * XhrIo object.\n *\n */\n\ngoog.provide('goog.net.XhrIoPool');\n\ngoog.require('goog.net.XhrIo');\ngoog.require('goog.structs.PriorityPool');\n\n\n\n/**\n * A pool of XhrIo objects.\n * @param {goog.structs.Map=} opt_headers Map of default headers to add to every\n *     request.\n * @param {number=} opt_minCount Minimum number of objects (Default: 0).\n * @param {number=} opt_maxCount Maximum number of objects (Default: 10).\n * @param {boolean=} opt_withCredentials Add credentials to every request\n *     (Default: false).\n * @constructor\n * @extends {goog.structs.PriorityPool}\n */\ngoog.net.XhrIoPool = function(\n    opt_headers, opt_minCount, opt_maxCount, opt_withCredentials) {\n  /**\n   * Map of default headers to add to every request.\n   * @type {goog.structs.Map|undefined}\n   * @private\n   */\n  this.headers_ = opt_headers;\n\n  /**\n   * Whether a \"credentialed\" requests are to be sent (ones that is aware of\n   * cookies and authentication). This is applicable only for cross-domain\n   * requests and more recent browsers that support this part of the HTTP Access\n   * Control standard.\n   *\n   * @see http://www.w3.org/TR/XMLHttpRequest/#the-withcredentials-attribute\n   *\n   * @private {boolean}\n   */\n  this.withCredentials_ = !!opt_withCredentials;\n\n  // Must break convention of putting the super-class's constructor first. This\n  // is because the super-class constructor calls adjustForMinMax, which calls\n  // this class' createObject. In this class's implementation, it assumes that\n  // there is a headers_, and will lack those if not yet present.\n  goog.structs.PriorityPool.call(this, opt_minCount, opt_maxCount);\n};\ngoog.inherits(goog.net.XhrIoPool, goog.structs.PriorityPool);\n\n\n/**\n * Creates an instance of an XhrIo object to use in the pool.\n * @return {!goog.net.XhrIo} The created object.\n * @override\n */\ngoog.net.XhrIoPool.prototype.createObject = function() {\n  var xhrIo = new goog.net.XhrIo();\n  var headers = this.headers_;\n  if (headers) {\n    headers.forEach(function(value, key) { xhrIo.headers.set(key, value); });\n  }\n  if (this.withCredentials_) {\n    xhrIo.setWithCredentials(true);\n  }\n  return xhrIo;\n};\n\n\n/**\n * Determine if an object has become unusable and should not be used.\n * @param {Object} obj The object to test.\n * @return {boolean} Whether the object can be reused, which is true if the\n *     object is not disposed and not active.\n * @override\n */\ngoog.net.XhrIoPool.prototype.objectCanBeReused = function(obj) {\n  // An active XhrIo object should never be used.\n  var xhr = /** @type {goog.net.XhrIo} */ (obj);\n  return !xhr.isDisposed() && !xhr.isActive();\n};\n","~:compiled-at",1578145491398,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.net.xhriopool.js\",\n\"lineCount\":44,\n\"mappings\":\"AAqBAA,IAAAC,QAAA,CAAa,oBAAb,CAAA;AAEAD,IAAAE,QAAA,CAAa,gBAAb,CAAA;AACAF,IAAAE,QAAA,CAAa,2BAAb,CAAA;AAeA;;;;;;;;AAAAF,IAAAG,IAAAC,UAAA,GAAqBC,QAAQ,CACzBC,WADyB,EACZC,YADY,EACEC,YADF,EACgBC,mBADhB,CACqC;AAMhE,uDAAA,IAAAC,SAAA,GAAgBJ,WAAhB;AAYA,kCAAA,IAAAK,iBAAA,GAAwB,CAAC,CAACF,mBAA1B;AAMAT,MAAAY,QAAAC,aAAAC,KAAA,CAA+B,IAA/B,EAAqCP,YAArC,EAAmDC,YAAnD,CAAA;AAxBgE,CADlE;AA2BAR,IAAAe,SAAA,CAAcf,IAAAG,IAAAC,UAAd,EAAkCJ,IAAAY,QAAAC,aAAlC,CAAA;AAQA;;;;AAAAb,IAAAG,IAAAC,UAAAY,UAAAC,aAAA,GAA4CC,QAAQ,EAAG;AACrD,MAAIC,QAAQ,IAAInB,IAAAG,IAAAiB,MAAhB;AACA,MAAIC,UAAU,IAAAX,SAAd;AACA,MAAIW,OAAJ;AACEA,WAAAC,QAAA,CAAgB,QAAQ,CAACC,KAAD,EAAQC,GAAR,CAAa;AAAEL,WAAAE,QAAAI,IAAA,CAAkBD,GAAlB,EAAuBD,KAAvB,CAAA;AAAF,KAArC,CAAA;AADF;AAGA,MAAI,IAAAZ,iBAAJ;AACEQ,SAAAO,mBAAA,CAAyB,IAAzB,CAAA;AADF;AAGA,SAAOP,KAAP;AATqD,CAAvD;AAoBA;;;;;AAAAnB,IAAAG,IAAAC,UAAAY,UAAAW,kBAAA,GAAiDC,QAAQ,CAACC,GAAD,CAAM;AAE7D,MAAIC,oCAAoC,CAACD,GAAD,CAAxC;AACA,SAAO,CAACC,GAAAC,WAAA,EAAR,IAA4B,CAACD,GAAAE,SAAA,EAA7B;AAH6D,CAA/D;;\",\n\"sources\":[\"goog/net/xhriopool.js\"],\n\"sourcesContent\":[\"// Copyright 2006 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Creates a pool of XhrIo objects to use. This allows multiple\\n * XhrIo objects to be grouped together and requests will use next available\\n * XhrIo object.\\n *\\n */\\n\\ngoog.provide('goog.net.XhrIoPool');\\n\\ngoog.require('goog.net.XhrIo');\\ngoog.require('goog.structs.PriorityPool');\\n\\n\\n\\n/**\\n * A pool of XhrIo objects.\\n * @param {goog.structs.Map=} opt_headers Map of default headers to add to every\\n *     request.\\n * @param {number=} opt_minCount Minimum number of objects (Default: 0).\\n * @param {number=} opt_maxCount Maximum number of objects (Default: 10).\\n * @param {boolean=} opt_withCredentials Add credentials to every request\\n *     (Default: false).\\n * @constructor\\n * @extends {goog.structs.PriorityPool}\\n */\\ngoog.net.XhrIoPool = function(\\n    opt_headers, opt_minCount, opt_maxCount, opt_withCredentials) {\\n  /**\\n   * Map of default headers to add to every request.\\n   * @type {goog.structs.Map|undefined}\\n   * @private\\n   */\\n  this.headers_ = opt_headers;\\n\\n  /**\\n   * Whether a \\\"credentialed\\\" requests are to be sent (ones that is aware of\\n   * cookies and authentication). This is applicable only for cross-domain\\n   * requests and more recent browsers that support this part of the HTTP Access\\n   * Control standard.\\n   *\\n   * @see http://www.w3.org/TR/XMLHttpRequest/#the-withcredentials-attribute\\n   *\\n   * @private {boolean}\\n   */\\n  this.withCredentials_ = !!opt_withCredentials;\\n\\n  // Must break convention of putting the super-class's constructor first. This\\n  // is because the super-class constructor calls adjustForMinMax, which calls\\n  // this class' createObject. In this class's implementation, it assumes that\\n  // there is a headers_, and will lack those if not yet present.\\n  goog.structs.PriorityPool.call(this, opt_minCount, opt_maxCount);\\n};\\ngoog.inherits(goog.net.XhrIoPool, goog.structs.PriorityPool);\\n\\n\\n/**\\n * Creates an instance of an XhrIo object to use in the pool.\\n * @return {!goog.net.XhrIo} The created object.\\n * @override\\n */\\ngoog.net.XhrIoPool.prototype.createObject = function() {\\n  var xhrIo = new goog.net.XhrIo();\\n  var headers = this.headers_;\\n  if (headers) {\\n    headers.forEach(function(value, key) { xhrIo.headers.set(key, value); });\\n  }\\n  if (this.withCredentials_) {\\n    xhrIo.setWithCredentials(true);\\n  }\\n  return xhrIo;\\n};\\n\\n\\n/**\\n * Determine if an object has become unusable and should not be used.\\n * @param {Object} obj The object to test.\\n * @return {boolean} Whether the object can be reused, which is true if the\\n *     object is not disposed and not active.\\n * @override\\n */\\ngoog.net.XhrIoPool.prototype.objectCanBeReused = function(obj) {\\n  // An active XhrIo object should never be used.\\n  var xhr = /** @type {goog.net.XhrIo} */ (obj);\\n  return !xhr.isDisposed() && !xhr.isActive();\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"net\",\"XhrIoPool\",\"goog.net.XhrIoPool\",\"opt_headers\",\"opt_minCount\",\"opt_maxCount\",\"opt_withCredentials\",\"headers_\",\"withCredentials_\",\"structs\",\"PriorityPool\",\"call\",\"inherits\",\"prototype\",\"createObject\",\"goog.net.XhrIoPool.prototype.createObject\",\"xhrIo\",\"XhrIo\",\"headers\",\"forEach\",\"value\",\"key\",\"set\",\"setWithCredentials\",\"objectCanBeReused\",\"goog.net.XhrIoPool.prototype.objectCanBeReused\",\"obj\",\"xhr\",\"isDisposed\",\"isActive\"]\n}\n"]
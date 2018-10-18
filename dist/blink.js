!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),i(n(5)).default.config();var o=function(e){function t(t){var n=e.call(this,t)||this;return n.name="ConfigNotSetError",n}return r(t,e),t}(Error),u=function(){function e(){}return e.getRequiredConfig=function(e){if(process.env[e])return process.env[e];throw new o(e)},e.getOptionalConfig=function(e,t){try{return this.getRequiredConfig(e)}catch(e){if("ConfigNotSetError"===e.name&&t)return t;throw e}},Object.defineProperty(e,"PUSHER_APPID",{get:function(){return this.getRequiredConfig("PUSHER_APPID")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"PUSHER_KEY",{get:function(){return this.getRequiredConfig("PUSHER_KEY")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"PUSHER_SECRET",{get:function(){return this.getRequiredConfig("PUSHER_SECRET")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"PUSHER_CLUSTER",{get:function(){return this.getRequiredConfig("PUSHER_CLUSTER")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"PUSHER_BLINK_CHANNEL",{get:function(){return"blink"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"PORT",{get:function(){return parseInt(this.getOptionalConfig("PORT","5000"))},enumerable:!0,configurable:!0}),Object.defineProperty(e,"PASSWORD_HASH",{get:function(){return this.getRequiredConfig("PASSWORD_HASH")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"JWT_SECRET",{get:function(){return this.getRequiredConfig("JWT_SECRET")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"BLINK_TIMEOUT",{get:function(){return parseInt(this.getOptionalConfig("BLINK_TIMEOUT","30"))},enumerable:!0,configurable:!0}),e}();t.default=u},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(6)),o=r(n(7)),u=r(n(8)),f=r(n(0)),c=r(n(2)),s=r(n(9)),a=function(){function e(){}return e.createPusherClient=function(){return new u.default(f.default.PUSHER_KEY,{cluster:f.default.PUSHER_CLUSTER,encrypted:!0})},e.createPusherServer=function(){return new o.default({appId:f.default.PUSHER_APPID,key:f.default.PUSHER_KEY,secret:f.default.PUSHER_SECRET,encrypted:!0,cluster:f.default.PUSHER_CLUSTER})},e.createBlink1=function(){return new i.default},e.createMessageReceiver=function(){return new c.default},e.createMessageSender=function(){return new s.default},e}();t.default=a},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(0)),o=r(n(1)),u=function(){function e(){this.pusher=o.default.createPusherClient(),this.channel=this.pusher.subscribe(i.default.PUSHER_BLINK_CHANNEL),this.pusher.connection.bind("error",function(e){console.error("Pusher: connection error",e)})}return e.prototype.bind=function(e,t){this.channel.bind(e,t)},e.prototype.disconnect=function(){this.pusher.disconnect()},e}();t.default=u},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(2)),o=r(n(10));(new(function(){function e(){this.messageReceiver=new i.default,this.blink=new o.default}return e.prototype.run=function(){this.messageReceiver.bind("blink",this.blink.processMessage.bind(this.blink))},e}())).run()},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("node-blink1")},function(e,t){e.exports=require("pusher")},function(e,t){e.exports=require("pusher-js")},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(0)),o=r(n(1)),u=function(){function e(){this.pusherServer=o.default.createPusherServer()}return e.prototype.trigger=function(e,t){this.pusherServer.trigger(i.default.PUSHER_BLINK_CHANNEL,e,t)},e.prototype.subscriberConnected=function(e){this.pusherServer.get({path:"/channels/"+i.default.PUSHER_BLINK_CHANNEL,params:{}},function(t,n,r){if(t)e(!1);else if(200===r.statusCode){var i=JSON.parse(r.body);e(i.occupied)}else console.error(t),e(!1)})},e}();t.default=u},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(3)),o=r(n(11)),u=n(12),f=r(n(0)),c=r(n(1)),s=function(){function e(){var e=this;this.handleTimeout=i.default.debounce(function(){try{e.blink1.off()}catch(e){}},1e3*f.default.BLINK_TIMEOUT);try{this.blink1=c.default.createBlink1()}catch(e){console.error(e.message)}}return e.prototype.processMessage=function(e){switch(e.type){case u.MessageType.BlinkOff:this.off();break;case u.MessageType.BlinkSetColor:this.setColor(e.color)}},e.prototype.close=function(){this.handleTimeout.cancel();try{this.blink1.close()}catch(e){}},e.prototype.off=function(){var e=this;this.run(function(){e.blink1.off()})},e.prototype.setColor=function(e){var t=this,n=o.default(e).toRgb();this.run(function(){t.blink1.fadeToRGB(500,n.r,n.g,n.b)})},e.prototype.run=function(e){try{e()}catch(t){try{this.blink1=c.default.createBlink1(),e()}catch(e){console.error(e.message)}}this.handleTimeout()},e}();t.default=s},function(e,t){e.exports=require("tinycolor2")},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i,o=r(n(3));!function(e){e[e.BlinkOff=0]="BlinkOff",e[e.BlinkSetColor=1]="BlinkSetColor"}(i=t.MessageType||(t.MessageType={}));var u=function(){return function(){this.type=i.BlinkOff}}();t.BlinkOffMessage=u;var f=function(){return function(e){this.type=i.BlinkSetColor,this.color=e}}();t.BlinkSetColorMessage=f,t.isValidMessage=function(e){if(!o.default.isObjectLike(e))return!1;switch(e.type){case i.BlinkOff:return!0;case i.BlinkSetColor:return function(e){return!!o.default.isString(e)&&/^#[0-9a-f]{6}$/i.test(e)}(e.color);default:return!1}}}]);
//# sourceMappingURL=blink.js.map
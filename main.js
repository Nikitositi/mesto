(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=e.baseUrl,this._headers=e.headers}var n,r;return n=t,(r=[{key:"_rendering",value:function(e,t){e.textContent=!0===t?"Сохранение...":"Сохранить"}},{key:"_checkResponseStatus",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getData",value:function(e){return fetch(this._url+e,{method:"GET",headers:this._headers}).then(this._checkResponseStatus)}},{key:"patchProfile",value:function(e,t){return this._rendering(t,!0),fetch(this._url+"/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then(this._checkResponseStatus)}},{key:"addNewCard",value:function(e,t){return this._rendering(t,!0),fetch(this._url+"/cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._checkResponseStatus)}},{key:"deleteCard",value:function(e){return console.log(this._url+"/cards/"+e),fetch(this._url+"/cards/"+e,{method:"DELETE",headers:this._headers}).then(this._checkResponseStatus)}},{key:"handleCard",value:function(e,t){return this._method=!0===t?"PUT":"DELETE",console.log("/cards/likes/"+e),fetch(this._url+"/cards/likes/"+e,{method:this._method,headers:this._headers}).then(this._checkResponseStatus)}},{key:"updateAvatar",value:function(e,t){return this._rendering(t,!0),fetch(this._url+"/users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatarlink})}).then(this._checkResponseStatus)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o){var i=t.data,a=t.handleCardClick,u=t.handleCardDelete;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=i.name,this._link=i.link,this._data=i,this._likesLength=i.likes.length,this._id=i._id,this._ownerId=i.owner._id,this._userId=r,this._handleCardDelete=u,this._handleLike=n,this._cardSelector=o,this._handleCardClick=a}var t,r;return t=e,(r=[{key:"_verifyOwner",value:function(){var e=this;this._ownerId===this._userId&&this._elementDeleteButton.classList.add("button_owner"),this._data.likes.forEach((function(t){t._id===e._userId&&e._elementLikeButton.classList.add("button_active")}))}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".cards__item").cloneNode(!0)}},{key:"deleteCard",value:function(){this._element.remove(),this._element=null}},{key:"craftCard",value:function(){return this._element=this._getTemplate(),this._elementTitle=this._element.querySelector(".cards__title"),this._elementImage=this._element.querySelector(".cards__image"),this._elementDeleteButton=this._element.querySelector(".button_type_delete"),this._elementLikeButton=this._element.querySelector(".button_type_like"),this._elementLikesCounter=this._element.querySelector(".cards__like-counter"),this._elementLikesCounter.textContent=this._likesLength,this._elementImage.src=this._link,this._elementImage.alt=this._name,this._elementTitle.textContent=this._name,this._setEvenetListeners(),this._verifyOwner(),this._element}},{key:"_likeClickHandler",value:function(){this._elementLikeButton.classList.toggle("button_active"),this._elementLikeButton.classList.contains("button_active")?(this._elementLikesCounter.textContent=parseInt(this._elementLikesCounter.textContent,10)+1,this._handleLike(this._data._id,!0)):(this._elementLikesCounter.textContent=parseInt(this._elementLikesCounter.textContent,10)-1,this._handleLike(this._data._id,!1))}},{key:"_setEvenetListeners",value:function(){var e=this;this._elementLikeButton.addEventListener("click",(function(){e._likeClickHandler()})),this._elementDeleteButton.addEventListener("click",this._handleCardDelete),this._elementImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r,o,i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o=function(){i._hasInvalidInput()?(i._button.disabled=!0,i._button.classList.add(i._config.inactiveButtonClass)):(i._button.disabled=!1,i._button.classList.remove(i._config.inactiveButtonClass))},(r="_toggleButtonState")in this?Object.defineProperty(this,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[r]=o,this._config=t,this._form=n,this._inputList=Array.from(this._form.querySelectorAll(this._config.inputSelector)),this._button=this._form.querySelector(t.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_hideError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));t.textContent="",t.classList.remove(this._config.errorClass),e.classList.remove(this._config.inputErrorClass)}},{key:"_showError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));t.textContent=e.validationMessage,t.classList.add(this._config.errorClass),e.classList.add(this._config.inputErrorClass)}},{key:"deleteError",value:function(){var e=this;this._inputList.forEach((function(t){e._hideError(t)})),this._toggleButtonState()}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._button.disabled=!0,e._button.classList.add(e._config.inactiveButtonClass),e._checkFormInputValidity(t),e._toggleButtonState()}))}))}},{key:"_checkFormInputValidity",value:function(e){e.validity.valid?this._hideError(e):this._showError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.reverse().forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(t.userName),this._about=document.querySelector(t.userActivity),this._avatar=document.querySelector(t.userAvatar)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,activity:this._about.textContent}}},{key:"setUserInfo",value:function(e){e.name&&(this._name.textContent=e.name),e.about&&(this._about.textContent=e.about)}},{key:"setUserAvatar",value:function(e){e.avatar&&(this._avatar.src=e.avatar)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),f(this,"_handleEscClose",(function(e){"Escape"===e.key&&n.close()})),f(this,"_handleOverlayClick",(function(e){e.target===e.currentTarget&&n.close()})),this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".button_type_close")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._closeButton.addEventListener("click",this.close.bind(this)),this._popup.addEventListener("click",this._handleOverlayClick.bind(this))}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=_(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},y.apply(this,arguments)}function _(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},v(e,t)}function b(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__image"),t._popupCaption=t._popup.querySelector(".popup__caption"),t}return t=a,(n=[{key:"open",value:function(e,t){this._popupImage.src=t,this._popupImage.alt=e,this._popupCaption.textContent=e,y(m(a.prototype),"open",this).call(this)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=O(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function O(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=L(e)););return e}function C(e,t){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},C(e,t)}function E(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=L(r);if(o){var n=L(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function a(e,t){var n,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleFormSubmit=r,n._form=n._popup.querySelector(".popup__form"),n._inputList=n._form.querySelectorAll(".popup__input"),n._submitButton=n._form.querySelector(".popup__button"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"close",value:function(){S(L(a.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var e=this;S(L(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues(),e._submitButton),e.close()}))}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=R(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},q.apply(this,arguments)}function R(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function B(e,t){if(t&&("object"===P(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var D=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return B(this,e)});function a(e,t){var n,r=e.submit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._form=n._popup.querySelector(".popup__form"),n._submitButton=n._form.querySelector(".popup__button_type_confirm"),n._submit=r,n}return t=a,(n=[{key:"open",value:function(e){q(x(a.prototype),"open",this).call(this),this._card=e}},{key:"setEventListeners",value:function(){var e=this;q(x(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submit(e._card),e.close()}))}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function A(e,t){e.textContent=t?"Сохранение...":"Сохранить"}var U,V=document.querySelector(".button_type_edit"),F=document.querySelector(".button_type_add"),N=document.querySelector('[name="popup-profile"]'),H=document.querySelector('[name="popup-card"]'),J=document.querySelector(".popup_type_avatar"),M=document.querySelector(".popup__input_name"),z=document.querySelector(".popup__input_activity"),G=(document.querySelector(".cards"),{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"});function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var K=new i(G,N);K.enableValidation();var Q=new i(G,H);Q.enableValidation();var W=new i(G,J);W.enableValidation();var X=new t({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-43",headers:{authorization:"aac17baf-7cf9-4e4a-9ab3-7682aecd0de7","Content-Type":"application/json"}});Promise.all([X.getData("/users/me"),X.getData("/cards")]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return $(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];Y.setUserInfo(o),Y.setUserAvatar(o),U=o._id,Z.renderItems(i)})).catch((function(e){console.log(e)}));var Y=new s({userName:".profile__name",userActivity:".profile__activity",userAvatar:".profile__avatar"}),Z=new u({renderer:function(e){var t=ae(e,U);Z.addItem(t)}},".cards"),ee=new g(".popup_type_image");ee.setEventListeners();var te=new j({handleFormSubmit:function(e,t){console.log(t),A(t,!0),X.patchProfile(e,t).then((function(){return Y.setUserInfo(e)})).catch((function(e){return console.log(e)})).finally((function(){return A(t,!1)}))}},".popup_type_edit");te.setEventListeners(),V.addEventListener("click",(function(){M.value=Y.getUserInfo().name,z.value=Y.getUserInfo().activity,K.deleteError(),te.open()}));var ne=new j({handleFormSubmit:function(e,t){e.likes=[],A(t,!0),X.addNewCard(e,t).then((function(e){var t=ae(e,U);Z.addItem(t),ne.close()})).catch((function(e){return console.log(e)})).finally((function(){return A(t,!1)}))}},".popup_type_add");ne.setEventListeners(),F.addEventListener("click",(function(){Q.deleteError(),ne.open()}));var re=document.querySelector(".profile__avatar"),oe=new j({handleFormSubmit:function(e,t){A(t,!0),re.src=e.avatarlink,X.updateAvatar(e,t).then((function(){oe.close()})).catch((function(e){return console.log(e)})).finally((function(){return A(t,!1)}))}},".popup_type_avatar");oe.setEventListeners(),document.querySelector(".profile__update-avatar").addEventListener("click",(function(){W.deleteError(),oe.open()}));var ie=new D({submit:function(e){X.deleteCard(e._id).then((function(){e.deleteCard()})).catch((function(e){return console.log(e)}))}},".popup_type_confirm");function ae(e,t){var n=new r({data:e,handleCardClick:function(){ee.open(e.name,e.link)},handleCardDelete:function(){return ie.open(n)}},ue,t,"#card-template");return n.craftCard()}function ue(e,t){!0===t?X.handleCard(e,!0):X.handleCard(e,!1)}ie.setEventListeners()})();
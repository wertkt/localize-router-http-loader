var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { LocalizeParser } from 'localize-router';
var LocalizeRouterHttpLoader = /** @class */ (function (_super) {
    __extends(LocalizeRouterHttpLoader, _super);
    /**
     * CTOR
     * @param translate
     * @param location
     * @param settings
     * @param http
     * @param path
     */
    function LocalizeRouterHttpLoader(translate, location, settings, http, path) {
        if (path === void 0) { path = 'assets/locales.json'; }
        var _this = _super.call(this, translate, location, settings) || this;
        _this.http = http;
        _this.path = path;
        return _this;
    }
    /**
     * Initialize or append routes
     * @param routes
     * @returns {Promise<any>}
     */
    LocalizeRouterHttpLoader.prototype.load = function (routes) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("" + _this.path)
                .subscribe(function (data) {
                _this.locales = data.locales;
                _this.prefix = data.prefix || '';
                _this.init(routes).then(resolve);
            });
        });
    };
    return LocalizeRouterHttpLoader;
}(LocalizeParser));
export { LocalizeRouterHttpLoader };

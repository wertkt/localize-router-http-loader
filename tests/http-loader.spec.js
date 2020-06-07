import { LocalizeRouterHttpLoader } from '../src/http-loader';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { ALWAYS_SET_PREFIX, CACHE_MECHANISM, CACHE_NAME, CacheMechanism, DEFAULT_LANG_FUNCTION, LocalizeRouterSettings, USE_CACHED_LANG } from 'localize-router';
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
var FakeTranslateService = /** @class */ (function () {
    function FakeTranslateService() {
    }
    return FakeTranslateService;
}());
var FakeLocation = /** @class */ (function () {
    function FakeLocation() {
    }
    FakeLocation.prototype.path = function () {
        return '';
    };
    return FakeLocation;
}());
describe('LocalizeRouterHttpLoader try 2', function () {
    var injector;
    var loader;
    var translate;
    var location;
    var settings;
    var http;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule],
            providers: [
                { provide: TranslateService, useClass: FakeTranslateService },
                { provide: Location, useClass: FakeLocation },
                { provide: USE_CACHED_LANG, useValue: true },
                { provide: DEFAULT_LANG_FUNCTION, useValue: void 0 },
                { provide: CACHE_NAME, useValue: 'LOCALIZE_DEFAULT_LANGUAGE' },
                { provide: CACHE_MECHANISM, useValue: CacheMechanism.LocalStorage },
                { provide: ALWAYS_SET_PREFIX, useValue: true },
                LocalizeRouterSettings
            ]
        });
        injector = getTestBed();
        translate = injector.get(TranslateService);
        location = injector.get(Location);
        settings = injector.get(LocalizeRouterSettings);
        http = injector.get(HttpClient);
        loader = new LocalizeRouterHttpLoader(translate, location, settings, http);
    });
    afterEach(inject([HttpTestingController], function (httpMock) {
        injector = undefined;
        translate = undefined;
        location = undefined;
        http = undefined;
        loader = undefined;
        httpMock.verify();
    }));
    it('should set locales and prefix from file', inject([HttpTestingController], function (httpMock) {
        var mockResponse = {
            locales: ['en', 'de', 'fr'],
            prefix: 'PREFIX'
        };
        var myPromise = Promise.resolve();
        spyOn(loader, 'init').and.returnValue(myPromise);
        var promise = loader.load([]);
        var req = httpMock.expectOne('assets/locales.json');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);
        promise.then(function () {
            expect(loader.init).toHaveBeenCalledWith([]);
            expect(loader.locales).toEqual(mockResponse.locales);
            expect(loader.prefix).toEqual(mockResponse.prefix);
        });
    }));
    it('should set default value for prefix if not provided', inject([HttpTestingController], function (httpMock) {
        var mockResponse = {
            locales: ['en', 'de', 'fr']
        };
        var myPromise = Promise.resolve();
        spyOn(loader, 'init').and.returnValue(myPromise);
        var promise = loader.load([]);
        var req = httpMock.expectOne('assets/locales.json');
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);
        promise.then(function () {
            expect(loader.prefix).toEqual('');
        });
    }));
    it('should load config from custom path', inject([HttpTestingController], function (httpMock) {
        var mockResponse = {
            locales: ['en', 'de', 'fr']
        };
        var customPath = 'my/custom/path/to/config.json';
        var myPromise = Promise.resolve();
        loader = new LocalizeRouterHttpLoader(translate, location, settings, http, customPath);
        spyOn(loader, 'init').and.returnValue(myPromise);
        loader.load([]);
        var req = httpMock.expectOne(customPath);
        expect(req.request.method).toEqual('GET');
        req.flush(mockResponse);
    }));
});

import { HttpClient } from "@angular/common/http";
import { RemoteData } from "./remote-data";
import * as i0 from "@angular/core";
export declare class RemoteDataFactory {
    private http;
    constructor(http: HttpClient);
    create(): RemoteData;
    static ɵfac: i0.ɵɵFactoryDeclaration<RemoteDataFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RemoteDataFactory>;
}

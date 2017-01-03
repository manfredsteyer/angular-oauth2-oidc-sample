import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'flight-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    public info: string = "Welt";

    constructor(private oauthService: OAuthService) {

        // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = window.location.origin + "/index.html";

        // set the scope for the permissions the client should request
        this.oauthService.scope = "openid profile email flightapi_user";

        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oauthService.oidc = true;

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);

        this.oauthService.clientId = "angular-app-1";
        //this.oauthService.dummyClientSecret = "geheim";

        let url = 'https://hpg-keycloak.northeurope.cloudapp.azure.com/auth/realms/angular-spring/.well-known/openid-configuration';
        this.oauthService.loadDiscoveryDocument(url).then((doc) => {
            // This method just tries to parse the token within the url when
            // the auth-server redirects the user back to the web-app
            // It dosn't initiate the login
            this.oauthService.tryLogin({});      
            console.debug('discovery succeeded', doc);

        });


    }

}




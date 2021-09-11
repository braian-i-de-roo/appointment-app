package com.braian.springBackend.utils;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SessionUtil {

    @SuppressWarnings("unchecked")
    public String getUserName() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        KeycloakPrincipal<KeycloakSecurityContext> keycloakPrincipal
                = (KeycloakPrincipal<KeycloakSecurityContext>) securityContext.getAuthentication().getPrincipal();
        AccessToken accessToken = keycloakPrincipal.getKeycloakSecurityContext().getToken();
        return accessToken.getPreferredUsername();
    }

    public boolean isUserAuthenticated() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        var authentication = securityContext.getAuthentication();
        if (authentication == null) {
            return false;
        }
        String keycloakPrincipal = authentication.getPrincipal().toString();
        return !keycloakPrincipal.equals("anonymousUser");
    }

}

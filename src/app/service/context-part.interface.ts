import { environment } from '../../environments/environment';

export const base_authserver_url = environment['base_authserver_url'];
export const base_restserver_url = environment['base_restserver_url'];
export const csrf_token_uri = environment['base_authserver_url'] + `csrf`;
export const login_uri = environment['base_authserver_url'] + `login`;
export const logout_uri = environment['base_authserver_url'] + `logout`;
export const refresh_uri = environment['base_authserver_url'] + `refresh`;
export const http_basic = 'aWhyLXdlYjpzNHQyR1JUU0hXR0FSZDd6YlFteDR1SFQ=';
export const ACCESS_TOKEN_KEY = 'id_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const CSRF_TOKEN_HEADER = 'csrf_token_header';
export const CSRF_TOKEN = 'csrf_token';
export const MENU_PERMISSION = 'menu_permission';
export const microsoft_login_redirect = environment['microsoft_login_redirect'];
export const msal_uri = environment['base_authserver_url'] + `msal`;


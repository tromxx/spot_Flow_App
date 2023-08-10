package com.kh.project.spotflow.config.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

    public class CookieUtils {

        public static String getCookieValue(HttpServletRequest request, String name) {
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if (cookie.getName().equals(name)) {
                        return cookie.getValue();
                    }
                }
            }
            return null;
        }

        public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
            Cookie cookie = new Cookie(name, value);
            cookie.setPath("/");
            cookie.setMaxAge(maxAge);
            response.addCookie(cookie);
        }

        public static void removeCookie(HttpServletResponse response, String name) {
            addCookie(response, name, null, 0);
        }
    }


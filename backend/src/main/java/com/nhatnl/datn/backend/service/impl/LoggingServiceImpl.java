package com.nhatnl.datn.backend.service.impl;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.nhatnl.datn.backend.service.LoggingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;


@Component
@Slf4j
public class LoggingServiceImpl implements LoggingService {
    private final Gson gson;

    public LoggingServiceImpl(Gson gson) {
        this.gson = gson;
    }

    @Override
    public void logRequest(HttpServletRequest httpServletRequest, Object body) {
        this.logRequestDevMode(httpServletRequest, body);
    }

    private void logRequestDevMode(HttpServletRequest httpServletRequest, Object body) {
        Map<String, String> parameters = buildParametersMap(httpServletRequest);

        log.info("REQUEST ");

        if (!parameters.isEmpty()) {
            System.out.println("parameters=[" + parameters + "] ");
        }

        if (body != null) {
            System.out.println("requestBody= " + parseObjectToPrettyJson(body));
        }
    }

    private void logRequestProductionMode(HttpServletRequest httpServletRequest, Object body) {
        StringBuilder stringBuilder = new StringBuilder();
        Map<String, String> parameters = buildParametersMap(httpServletRequest);

        stringBuilder.append("REQUEST ");
        stringBuilder.append("method=[").append(httpServletRequest.getMethod()).append("] ");
        stringBuilder.append("path=[").append(httpServletRequest.getRequestURI()).append("] ");
        stringBuilder.append("headers=[").append(buildHeadersMap(httpServletRequest)).append("] ");

        if (!parameters.isEmpty()) {
            stringBuilder.append("parameters=[").append(parameters).append("] ");
        }

        if (body != null) {
            stringBuilder.append("requestBody=[").append(body).append("]");
        }

        log.info(stringBuilder.toString());
    }

    @Override
    public void logResponse(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object body) {
        this.logResponseDevMode(httpServletRequest, httpServletResponse, body);
    }

    private void logResponseDevMode(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object body) {
        log.info("RESPONSE ");

        System.out.println("responseBody= " + parseObjectToPrettyJson(body));
    }

    private void logResponseProductionMode(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object body) {
        String stringBuilder = "RESPONSE " +
                "method=[" + httpServletRequest.getMethod() + "] " +
                "path=[" + httpServletRequest.getRequestURI() + "] " +
                "responseHeaders=[" + buildHeadersMap(httpServletResponse) + "] " +
                "responseBody=[" + body + "] ";

        log.info(stringBuilder);
    }

    private Map<String, String> buildParametersMap(HttpServletRequest httpServletRequest) {
        Map<String, String> resultMap = new HashMap<>();
        Enumeration<String> parameterNames = httpServletRequest.getParameterNames();

        while (parameterNames.hasMoreElements()) {
            String key = parameterNames.nextElement();
            String value = httpServletRequest.getParameter(key);
            resultMap.put(key, value);
        }

        return resultMap;
    }

    private Map<String, String> buildHeadersMap(HttpServletRequest request) {
        Map<String, String> map = new HashMap<>();

        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }

        return map;
    }

    private Map<String, String> buildHeadersMap(HttpServletResponse response) {
        Map<String, String> map = new HashMap<>();

        Collection<String> headerNames = response.getHeaderNames();
        for (String header : headerNames) {
            map.put(header, response.getHeader(header));
        }

        return map;
    }

    private String parseObjectToPrettyJson(Object o) {
        String jsonString = gson.toJson(o);
        JsonElement jsonElement = JsonParser.parseString(jsonString);
        return gson.toJson(jsonElement);
    }
}

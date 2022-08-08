package org.adp.gable.runner.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import kotlin.Pair;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.adp.gable.runner.Action;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.time.Duration;
import java.util.Iterator;
import java.util.Locale;

/**
 * @author zzq
 */
@Slf4j
public class HttpAction implements Action {
    private static final int DEFAULT_HTTP_PORT = 80;
    private static final ObjectMapper mapper = new ObjectMapper();
    private static final String HTTP_PROTOCOL = "protocol";
    private static final String HTTP_HOST_ARR = "hostArr";
    private static final String HTTP_PORT = "port";
    private static final String HTTP_PATH_ARRAY = "pathArray";
    private static final String HTTP_QUERY_ARRAY = "query";
    private static final String HTTP_METHOD = "method";
    private static final String HTTP_BODY_TYPE = "bodyType";
    private static final String HTTP_BODY_TEXT_TYPE = "bodyTextType";
    private static final String URLENCODED = "bodyUrlEncoded";
    private static final String HTTP_BODY_FORM_DATA = "bodyForm";
    private static final String HTTP_BODY_CONTENT = "bodyText";
    private static final String HTTP_HEADER = "header";
    private static final String HEADERS = "headers";

    @Override
    public void execute(JsonNode in, JsonNode out, ObjectNode instance, ObjectNode global) {
        ObjectNode response = (ObjectNode) out;
        OkHttpClient client = new OkHttpClient().newBuilder()
                .readTimeout(Duration.ofSeconds(300))
                .callTimeout(Duration.ofSeconds(300))
                .build();
        Request.Builder builder = new Request.Builder().url(parserToUrlPath(in));
        String method = in.path(HTTP_METHOD).asText();
        if (StringUtils.equalsIgnoreCase(method, HttpMethod.GET.name())) {
            builder.method(method, null);
        } else if (StringUtils.equalsIgnoreCase(method, HttpMethod.DELETE.name())) {
            builder.method(method, null);
        } else if (StringUtils.equalsIgnoreCase(method, HttpMethod.POST.name())) {
            RequestBody body = parserHttpBody(in);
            if (body == null) {
                response.put("error", "unknown http body" + in.path(HTTP_BODY_TYPE).asText());
                return;
            }
            builder.method(method, body);
        } else if (StringUtils.equalsIgnoreCase(method, HttpMethod.PUT.name())) {
            RequestBody body = parserHttpBody(in);
            if (body == null) {
                response.put("error", "unknown http body" + in.path(HTTP_BODY_TYPE).asText());
                return;
            }
            builder.method(method, body);
        } else {
            response.put("error", "unknown http method" + method);
            return;
        }
        setRequestHeader(in, builder);
        try {
            Response res = client.newCall(builder.build()).execute();
            long startAt = res.sentRequestAtMillis();
            long endAt = res.receivedResponseAtMillis();
            response.put(HttpResponseField.CODE, res.code());
            response.put(HttpResponseField.MESSAGE, res.message());
            response.put(HttpResponseField.START_AT, startAt);
            response.put(HttpResponseField.END_AT, endAt);
            response.put(HttpResponseField.TIME_TAKES, (endAt - startAt));
            ResponseBody body = res.body();
            String bodyType = body.contentType().toString();
            response.put(HttpResponseField.CONTENT_TYPE, bodyType);
            if (StringUtils.contains(bodyType, "json")) {
                response.set(HttpResponseField.CONTENT, mapper.readTree(body.string()));
            }else {
                response.put(HttpResponseField.CONTENT, body.string());
            }
            response.put(HttpResponseField.SIZE, body.contentLength());
            handleHeaders(res.headers(), response);
        } catch (IOException e) {
            log.error("error happens while execute http request", e);
            response.put(HttpResponseField.CONTENT, e.getMessage());
            response.put(HTTP_BODY_TYPE, HttpResponseBodyType.TEXT.name().toLowerCase(Locale.ROOT));
        }
    }

    private void handleHeaders(Headers headers, ObjectNode response) {
        Iterator<Pair<String, String>> iterator = headers.iterator();
        HttpResponseBodyType bodyType = HttpResponseBodyType.TEXT;
        ArrayNode arrayNode = response.arrayNode();
        while (iterator.hasNext()) {
            Pair<String, String> next = iterator.next();
            ObjectNode content = response.objectNode();
            String key = next.getFirst();
            String value = next.getSecond();
            if (StringUtils.equalsIgnoreCase("cookie", key)) {
                setCookie(response, value);
            }
            content.put("key", key);
            content.put("value", value);
            arrayNode.add(content);
            if (StringUtils.equalsIgnoreCase(key, "content-type")) {
                if (StringUtils.contains(value, "application/json")) {
                    bodyType = HttpResponseBodyType.JSON;
                } else if (StringUtils.contains(value, "html")) {
                    bodyType = HttpResponseBodyType.HTML;
                } else if (StringUtils.contains(value, "xml")) {
                    bodyType = HttpResponseBodyType.XML;
                }
            }
        }
        log.info("find content type in http response: {}", bodyType.toString());
        response.set(HttpResponseField.HEADERS, arrayNode);
        response.put(HTTP_BODY_TYPE, bodyType.name().toLowerCase(Locale.ROOT));
    }


    private RequestBody parserHttpBody(JsonNode in) {
        String bodyType = in.path(HTTP_BODY_TYPE).asText();
        if (StringUtils.equalsIgnoreCase(bodyType, HttpBodyType.NONE.name())) {
            return RequestBody.create(MediaType.parse("text/plain"), "");
        }else if (StringUtils.equalsIgnoreCase(bodyType, HttpBodyType.RAW.name())) {
            String bodyTextType = in.path(HTTP_BODY_TEXT_TYPE).asText();
            JsonNode content = in.path(HTTP_BODY_CONTENT);
            String bodyText = content.isTextual() ? content.asText() : content.toString();
            MediaType mediaType = null;
            if (StringUtils.equalsIgnoreCase(bodyTextType, "json")) {
                mediaType = MediaType.parse(org.springframework.http.MediaType.APPLICATION_JSON_VALUE);
            } else if (StringUtils.equalsIgnoreCase(bodyTextType, "text")) {
                mediaType = MediaType.parse(org.springframework.http.MediaType.TEXT_PLAIN_VALUE);
            } else if (StringUtils.equalsIgnoreCase(bodyTextType, "xml")) {
                mediaType = MediaType.parse(org.springframework.http.MediaType.TEXT_XML_VALUE);
            } else if (StringUtils.equalsIgnoreCase(bodyTextType, "html")) {
                mediaType = MediaType.parse(org.springframework.http.MediaType.TEXT_HTML_VALUE);
            }
            return RequestBody.create(mediaType, bodyText);
        } else if (StringUtils.equalsIgnoreCase(bodyType, HttpBodyType.FORM_DATA.name())) {
            MultipartBody.Builder formDataBuilder = new MultipartBody.Builder().setType(MultipartBody.FORM);
            JsonNode forms = in.path(HTTP_BODY_FORM_DATA);
            for (int i = 0; i < forms.size(); i++) {
                JsonNode item = forms.get(i);
                if (item.path("using").asBoolean()) {
                    formDataBuilder.addFormDataPart(item.path("key").asText(),
                            item.path("value").asText());
                }
            }
            return formDataBuilder.build();
        } else if (StringUtils.equals(bodyType, HttpBodyType.URLENCODED.name())) {
            String urlEncodedContent = mapKeyValue(in.path(URLENCODED));
            return RequestBody.create(MediaType.parse("application/x-www-form-urlencoded"), urlEncodedContent);
        }
        return null;
    }


    private void setRequestHeader(JsonNode in, Request.Builder builder) {
        JsonNode path = in.path(HTTP_HEADER);
        for (int i = 0; i < path.size(); i++) {
            JsonNode item = path.get(i);
            boolean using = item.path("using").asBoolean();
            if (using) {
                String key = item.path("key").asText();
                String value = item.path("value").asText();
                if (StringUtils.isNotEmpty(key) && StringUtils.isNotEmpty(value)) {
                    log.info("http add header: {} is {}", key, value);
                    builder.addHeader(key, value);
                }
            }
        }
    }

    public static String parserToUrlPath(JsonNode in) {
        StringBuilder urlBuilder = new StringBuilder();
        String protocol = in.path(HTTP_PROTOCOL).asText();
        urlBuilder.append(protocol).append("://");
        final JsonNode hostArr = in.path(HTTP_HOST_ARR);
        for (int i = 0; i < hostArr.size(); i++) {
            if (i != 0) {
                urlBuilder.append(".");
            }
            urlBuilder.append(hostArr.path(i).asText());
        }
        String port = in.path(HTTP_PORT).asText();
        if (StringUtils.isNotEmpty(port)) {
            urlBuilder.append(":").append(port);
        }
        JsonNode paths = in.path(HTTP_PATH_ARRAY);
        for (JsonNode node : paths) {
            String v = node.asText();
            if (StringUtils.isNotEmpty(v)) {
                urlBuilder.append("/").append(v);
            }
        }
        JsonNode queries = in.path(HTTP_QUERY_ARRAY);
        boolean isFirstQuery = true;
        for (JsonNode query : queries) {
            if (!query.path("using").asBoolean()) {
                continue;
            }
            final String key = query.path("key").asText();
            final String value = query.path("value").asText();
            if (StringUtils.isEmpty(key)) {
                continue;
            }
            if (isFirstQuery) {
                urlBuilder.append("?");
                isFirstQuery = false;
            }else {
                urlBuilder.append("&");
            }
            urlBuilder.append(key).append("=").append(value);
        }
        return urlBuilder.toString();
    }

    private static String mapKeyValue(JsonNode queries) {
        int index = 0;
        String queryStr = "";
        for (int i = 0; i < queries.size(); i++) {
            JsonNode item = queries.get(i);
            if (!item.isObject()) {
                continue;
            }
            if (index != 0) {
                queryStr += "&";
            }
            queryStr += item.path("key").asText() + "=" + item.path("value").asText();
            index++;
        }
        return queryStr;
    }

    private void setCookie(ObjectNode response, String value) {
        if (StringUtils.isEmpty(value)) {
            return;
        }
        String[] split = StringUtils.split(value, ";");
        ArrayNode arrayNode = response.arrayNode();
        for (String s : split) {
            if (!StringUtils.contains(s, "=")) {
                continue;
            }
            String[] kv = StringUtils.trim(s).split("=");
            if (kv.length != 2) {
                continue;
            }
            ObjectNode content = response.objectNode();
            content.put("key", kv[0]);
            content.put("value", kv[1]);
            arrayNode.add(content);
        }
        response.set(HttpResponseField.COOKIE, arrayNode);
    }

}

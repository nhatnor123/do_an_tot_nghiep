package com.nhatnl.datn.backend.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateTimeUtil {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");
    public static DateTimeFormatter ddMMyyyyFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    public static DateTimeFormatter yyyyMMddFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public DateTimeUtil() {
    }

    public static String toDDMMYYYYString(ZonedDateTime time) {
        return time == null ? null : time.format(ddMMyyyyFormatter);
    }

    public static String toYYYYMMDDString(ZonedDateTime time) {
        return time == null ? null : time.format(yyyyMMddFormatter);
    }

    public static Date parseISODate(String text) throws ParseException {
        return sdf.parse(text);
    }

    public static ZonedDateTime currentUTCTime() {
        return Instant.now().atZone(ZoneOffset.UTC);
    }

    public static ZonedDateTime currentVNTime() {
        return Instant.now().atZone(ZoneId.of("+07:00"));
    }


}

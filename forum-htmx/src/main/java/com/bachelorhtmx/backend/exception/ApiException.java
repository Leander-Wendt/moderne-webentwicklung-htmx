package com.bachelorhtmx.backend.exception;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

public record ApiException(String message, Throwable throwable, HttpStatus httpStatus, ZonedDateTime timestamp) {
}

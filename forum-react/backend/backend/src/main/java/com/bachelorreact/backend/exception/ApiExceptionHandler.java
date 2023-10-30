package com.bachelorreact.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException exception) {
        ApiException apiException = new ApiException(
                exception.getMessage(), exception, HttpStatus.BAD_REQUEST, ZonedDateTime.now(ZoneId.of("UTC+2"))
        );
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ApiConflictException.class})
    public ResponseEntity<Object> handleApiConflictException(ApiConflictException exception) {
        ApiException apiException = new ApiException(
                exception.getMessage(), exception, HttpStatus.CONFLICT, ZonedDateTime.now(ZoneId.of("UTC+2"))
        );
        return new ResponseEntity<>(apiException, HttpStatus.CONFLICT);
    }
}

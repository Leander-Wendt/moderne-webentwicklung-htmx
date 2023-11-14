package com.bachelorhtmx.backend.exception;

public class ApiConflictException extends RuntimeException {
    public ApiConflictException(String message) {
        super(message);
    }

    public ApiConflictException(String message, Throwable cause) {
        super(message, cause);
    }

}

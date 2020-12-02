package ru.job4j.controllers;

import javax.servlet.ServletException;

public class MsgResponseException  extends ServletException {
    public MsgResponseException(int code) {
        super(String.valueOf(code));
    }

    public int getCode() {
        return Integer.valueOf(super.getMessage());
    }
}

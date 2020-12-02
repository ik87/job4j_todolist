package ru.job4j.controllers;

import javax.servlet.ServletException;
import java.io.IOException;

@FunctionalInterface
public interface BiConsumerEx<T, U> {

    /**
     * Performs this operation on the given arguments.
     *
     * @param t the first input argument
     * @param u the second input argument
     */
    void accept(T t, U u) throws ServletException, IOException;
}

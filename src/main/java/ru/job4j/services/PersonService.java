package ru.job4j.services;

import ru.job4j.model.Person;

public interface PersonService {
    boolean checkExistPerson(Person person);
    Person getPerson(Person person);
    Person createNewPerson(Person person);
}

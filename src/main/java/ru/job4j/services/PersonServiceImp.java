package ru.job4j.services;

import ru.job4j.model.Person;

public class PersonServiceImp implements PersonService {
    private static final PersonService INSTANCE = new PersonServiceImp();
    private PersonServiceImp() {

    }

    public static PersonService getInstance() {
        return INSTANCE;
    }

    @Override
    public boolean checkExistPerson(Person person) {
        return false;
    }

    @Override
    public Person getPerson(Person person) {
        return null;
    }

    @Override
    public Person createNewPerson(Person person) {
        return null;
    }
}

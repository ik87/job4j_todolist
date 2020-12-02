package ru.job4j.services;

import ru.job4j.controllers.MsgResponseException;
import ru.job4j.entities.RecordDTO;
import ru.job4j.model.Person;


public class RecordsServiceImp implements RecordsService{
    private static final RecordsServiceImp INSTANCE = new RecordsServiceImp();

    private RecordsServiceImp() {}

    public static RecordsService getInstance() {
        return INSTANCE;
    }


    @Override
    public RecordDTO addRecord(RecordDTO recordDto, Person person) throws MsgResponseException {
        return null;
    }

    @Override
    public RecordDTO updateRecord(RecordDTO recordDto, Person person) throws MsgResponseException {
        return null;
    }

    @Override
    public boolean removeRecord(RecordDTO recordDto, Person person) throws MsgResponseException {
        return false;
    }

    @Override
    public boolean eraseCurrentBunch(Person person) throws MsgResponseException {
        return false;
    }

    @Override
    public boolean saveInHistoryAndEraseCurrentBunch(Person person) throws MsgResponseException {
        return false;
    }

    @Override
    public Iterable<RecordDTO> getRecords(Person person) throws MsgResponseException {
        return null;
    }
}

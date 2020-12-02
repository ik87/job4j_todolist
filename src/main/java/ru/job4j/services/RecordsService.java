package ru.job4j.services;

import ru.job4j.controllers.MsgResponseException;
import ru.job4j.entities.RecordDTO;
import ru.job4j.model.Person;
import ru.job4j.model.Record;


public interface RecordsService {
    RecordDTO addRecord(RecordDTO recordDto, Person person) throws MsgResponseException;
    RecordDTO updateRecord(RecordDTO recordDto, Person person) throws MsgResponseException;
    boolean removeRecord(RecordDTO recordDto, Person person) throws MsgResponseException;
    boolean eraseCurrentBunch(Person person) throws MsgResponseException;
    boolean saveInHistoryAndEraseCurrentBunch(Person person) throws MsgResponseException;
    Iterable<RecordDTO> getRecords(Person person) throws MsgResponseException;
}

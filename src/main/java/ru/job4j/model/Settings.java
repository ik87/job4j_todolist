package ru.job4j.model;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class Settings {
    private boolean showCompleted;
    @Enumerated(EnumType.STRING)
    private SortRecordsBy sortRecordsBy;
}

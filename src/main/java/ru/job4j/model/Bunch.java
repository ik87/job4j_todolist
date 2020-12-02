package ru.job4j.model;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Bunch {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String href;

    @OneToMany(mappedBy = "bunch",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Record> records = new ArrayList<>();

    private ZonedDateTime completed;



    @ManyToOne(fetch = FetchType.LAZY)
    private Person person;


    public Bunch() {
    }

    public Bunch(Person person) {
        this.person = person;
    }

    public ZonedDateTime getCompleted() {
        return completed;
    }

    public void setCompleted(ZonedDateTime completed) {
        this.completed = completed;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public List<Record> getRecords() {
        return records;
    }

    public void setRecords(List<Record> records) {
        this.records = records;
    }

    @Override
    public String toString() {
        return "Bunch{" +
                "id=" + id +
                ", href='" + href + '\'' +
                ", records=" + records +
                ", person=" + person +
                '}';
    }
}

package ru.job4j.model;

import org.hibernate.annotations.NotFound;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity(name="RECORD")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private ZonedDateTime created;
    private String description;
    private ZonedDateTime completed;
    private boolean done;

    @ManyToOne(fetch = FetchType.LAZY)
    private Bunch bunch;

    public Record() {

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bunch getBunch() {
        return bunch;
    }

    public void setBunch(Bunch bunch) {
        this.bunch = bunch;
    }

    public Record(ZonedDateTime created, String description, ZonedDateTime completed, boolean done, Bunch bunch) {
        this.created = created;
        this.description = description;
        this.completed = completed;
        this.done = done;
        this.bunch = bunch;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getCompleted() {
        return completed;
    }

    public void setCompleted(ZonedDateTime completed) {
        this.completed = completed;
    }




    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    @Override
    public String toString() {
        return "Record{" +
                "created=" + created +
                ", description='" + description + '\'' +
                ", completed=" + completed +
                ", done=" + done +
                '}';
    }
}

package ru.job4j.entities;

public class RecordDTO {
    private Long id;
    private String created;
    private String description;
    private String completed;
    private boolean done;

    public RecordDTO() {
    }

    public RecordDTO(Long id, String created, String description, String completed, boolean done) {
        this.id = id;
        this.created = created;
        this.description = description;
        this.completed = completed;
        this.done = done;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}

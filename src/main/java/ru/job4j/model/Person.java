package ru.job4j.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "PERSON")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String email;
    private String imageUrl;
    @OneToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false,
            orphanRemoval = true
    )
    @JoinColumn(unique = true)
    private Bunch current;
    @OneToMany(mappedBy = "person",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bunch> history = new ArrayList<>();

    public Person() {
    }

    public Person(String name, String email, String imageUrl) {
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Bunch> getHistory() {
        return history;
    }

    public void setHistory(List<Bunch> history) {
        this.history = history;
    }

    public Bunch getCurrent() {
        return current;
    }

    public void setCurrent(Bunch current) {
        this.current = current;
    }
}

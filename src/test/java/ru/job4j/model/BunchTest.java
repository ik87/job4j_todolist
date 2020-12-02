package ru.job4j.model;

import junit.framework.TestCase;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

import java.time.ZonedDateTime;


public class BunchTest extends TestCase {

    private SessionFactory sessionFactory;

    public ZonedDateTime stz(String time) {
        return ZonedDateTime.parse(time);
    }

    @Override
    public void setUp() throws Exception {
        // A SessionFactory is set up once for an application!
        final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
                .configure() // configures settings from hibernate.cfg.xml
                .build();
        try {
            sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
        } catch (Exception e) {
            // The registry would be destroyed by the SessionFactory, but we had trouble building the SessionFactory
            // so destroy it manually.
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }

    @Override
    public void tearDown() throws Exception {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
    }


    @SuppressWarnings({ "unchecked" })
    public void testBasicUsage() {
        // create a couple of events...
        Person person = new Person("Ilya", "d_dexter@mail.ru", "http://ik87.ru/img.jpg");
        Bunch current = new Bunch(person);
        Bunch history1 = new Bunch(person);
        Bunch history2 = new Bunch(person);

        ZonedDateTime[] created = new ZonedDateTime[10];
        ZonedDateTime[] completed = new ZonedDateTime[4];

        created[0] = stz("2020-06-01T10:38:22+03:00");
        created[1] = stz("2020-06-01T12:38:22+03:00");
        created[2] = stz("2020-06-01T14:22:22+03:00");
        completed[0] = stz("2020-06-01T12:55:22+03:00");

        created[3] = stz("2020-05-01T15:38:22+03:00");
        created[4] = stz("2020-05-01T16:18:22+03:00");
        created[5] = stz("2020-05-01T17:35:22+03:00");
        completed[1] = stz("2020-05-01T17:00:22+03:00");

        created[6] = stz("2020-04-01T18:33:22+03:00");
        created[7] = stz("2020-04-01T19:38:22+03:00");
        created[8] = stz("2020-04-01T20:38:22+03:00");
        completed[2] = stz("2020-06-01T11:00:22+03:00");
        completed[3] = stz("2020-04-01T21:05:22+03:00");

        current.getRecords().add(new Record(created[0], "first record", null, false,current));
        current.getRecords().add(new Record(created[1], "second record", completed[0], true,current));
        current.getRecords().add(new Record(created[2], "third record", null, false,current));


        history1.getRecords().add(new Record(created[3], "history 1 first record", null, false, history1));
        history1.getRecords().add(new Record(created[4], "history 1 second record", completed[1], true, history1));
        history1.getRecords().add(new Record(created[5], "history 1 third record", null, false, history1));

        history2.getRecords().add(new Record(created[6], "history 2 first record", null, false, history2));
        history2.getRecords().add(new Record(created[7], "history 2 second record", completed[2], true, history2));
        history2.getRecords().add(new Record(created[8], "history 2 third record", completed[3], true, history2));

        person.setCurrent(current);
        person.getHistory().add(history1);
        person.getHistory().add(history2);

        Session session = sessionFactory.openSession();
        session.beginTransaction();
        session.persist(person);
        Long personId = person.getId();
        session.getTransaction().commit();
        session.close();

        session = sessionFactory.openSession();
        Person result1 = session.get(Person.class, personId);
        Person result = session.find(Person.class, personId);
        System.out.println("current");
        System.out.println(result.getCurrent());
        System.out.println("hisotry");
        for(var h : result.getHistory()) {
            System.out.println(h);
        }
        session.close();

/*        // now lets pull events from the database and list them
        session = sessionFactory.openSession();
        session.beginTransaction();
*//*        List result = session.createQuery( "from Event" ).list();
        for ( Event event : (List<Event>) result ) {
            System.out.println( "Event (" + event.getDate() + ") : " + event.getTitle() );
        }*//*
        session.getTransaction().commit();
        session.close();*/
    }
}

package ru.job4j.controllers;

import com.google.gson.Gson;
import ru.job4j.entities.RecordDTO;
import ru.job4j.model.Person;
import ru.job4j.services.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/todo")
public class TodoServlet extends HttpServlet {

    private final Map<String, BiConsumerEx<HttpServletRequest, HttpServletResponse>> roadPost = new HashMap<>();
    private final Map<String, BiConsumerEx<HttpServletRequest, HttpServletResponse>> roadDelete = new HashMap<>();
    private final Map<String, BiConsumerEx<HttpServletRequest, HttpServletResponse>> roadGet = new HashMap<>();
    private final Map<String, BiConsumerEx<HttpServletRequest, HttpServletResponse>> roadPut = new HashMap<>();
    private final OauthGoogleService oauthGoogleService = new OauthGoogleService();
    private final RecordsService recordsService = RecordsServiceImp.getInstance();
    private final PersonService personService = PersonServiceImp.getInstance();
    //private final

    @Override
    public void init() throws ServletException {
        /**
         * POST
         */
        roadPost.put("oauth_google", this::oauthGoogle);//+
        roadPost.put("create_record", this::createRecord);//+
        roadPost.put("save_in_history_and_erase_current_branch", this::saveAndErase);
        roadPost.put("copyFromHistory", this::copyFromHistory);
        /**
         * DELETE
         */
        roadDelete.put("erase_current_branch", this::eraseCurrentBranch);//+
        roadDelete.put("remove_record", this::removeRecord);//+

        /**
         * GET
         */
        roadGet.put("get_current", this::getCurrent); //+
        roadGet.put("get_history", this::getHistory);

        /**
         * PUT
         */
        roadPut.put("update_record", this::updateRecord);//+
        roadPut.put("check_in", this::checkIn);
        roadPut.put("show_done", this::showDone);

    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        roadGet.get(action).accept(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        try {
            roadPost.get(action).accept(req, resp);
        } catch (MsgResponseException e) {
            resp.setStatus(e.getCode());
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        roadPut.get(action).accept(req, resp);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        roadDelete.get(action).accept(req, resp);
    }

    //when login/sign up with use google
    private void oauthGoogle(HttpServletRequest req, HttpServletResponse resp) throws ServletException {
        String token = req.getParameter("token");
        Person person = oauthGoogleService.getUser(token);
        authPerson(req, resp, person);
    }


    //when create record
    private void createRecord(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String recordJson = req.getParameter("record");
        RecordDTO recordDTO = new Gson().fromJson(recordJson,RecordDTO.class);
        Person person = (Person) req.getSession(false).getAttribute("person");
        checkAuthorize(person);
        recordDTO = recordsService.addRecord(recordDTO, person);
        checkOnNull(recordDTO);
        resp.setStatus(HttpServletResponse.SC_CREATED);
        respJson(resp, recordDTO);
    }

    private void respJson(HttpServletResponse resp, Object recordDTO) throws IOException {
        String json = new Gson().toJson(recordDTO);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(json);
    }

    //get all records from current bunch
    private void getCurrent(HttpServletRequest req, HttpServletResponse resp) throws MsgResponseException, IOException {
        Person person = (Person) req.getSession(false).getAttribute("person");
        checkAuthorize(person);
        Iterable<RecordDTO> recordsDTO = recordsService.getRecords(person);
        checkOnNull(recordsDTO);
        resp.setStatus(HttpServletResponse.SC_OK);
        respJson(resp, recordsDTO);
    }
    //when erase current branch
    private void eraseCurrentBranch(HttpServletRequest req, HttpServletResponse resp) throws MsgResponseException {
        Person person = (Person) req.getSession(false).getAttribute("person");
        checkAuthorize(person);
        boolean result = recordsService.eraseCurrentBunch(person);
        if(!result) {
            throw new MsgResponseException(HttpServletResponse.SC_BAD_REQUEST);
        }
        resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
    //when remove current branch to history
    private void saveAndErase(HttpServletRequest request, HttpServletResponse httpServletResponse) {

    }
    //when remove record
    private void removeRecord(HttpServletRequest req, HttpServletResponse resp) throws MsgResponseException {
        String recordJson = req.getParameter("record");
        RecordDTO recordDTO = new Gson().fromJson(recordJson, RecordDTO.class);
        checkOnNull(recordDTO);
        Person person = (Person) req.getSession(false).getAttribute("person");
        checkAuthorize(person);
        boolean result = recordsService.removeRecord(recordDTO, person);
        if(!result) {
            throw new MsgResponseException(HttpServletResponse.SC_BAD_REQUEST);
        }
        resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }

    private void checkIn(HttpServletRequest request, HttpServletResponse httpServletResponse) {
    }
    //when update record, return updated record
    private void updateRecord(HttpServletRequest req, HttpServletResponse resp) throws MsgResponseException, IOException {
        String recordJson = req.getParameter("record");
        RecordDTO recordDTO = new Gson().fromJson(recordJson, RecordDTO.class);
        checkOnNull(recordDTO);
        Person person = (Person) req.getSession(false).getAttribute("person");
        checkAuthorize(person);
        recordDTO = recordsService.updateRecord(recordDTO, person);
        checkOnNull(recordDTO);
        resp.setStatus(HttpServletResponse.SC_OK);
        respJson(resp, recordDTO);
    }

    private void getHistory(HttpServletRequest request, HttpServletResponse httpServletResponse) {
    }

    private void copyFromHistory(HttpServletRequest request, HttpServletResponse httpServletResponse) {
    }

    private void showDone(HttpServletRequest request, HttpServletResponse httpServletResponse) {
    }

    private void checkAuthorize(Person person) throws MsgResponseException {
        if (person == null) {
            throw new MsgResponseException(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private void checkOnNull(Object obj) throws MsgResponseException {
        if (obj == null) {
            throw new MsgResponseException(HttpServletResponse.SC_BAD_REQUEST);
        }
    }


    private void authPerson(HttpServletRequest req, HttpServletResponse resp, Person person) throws MsgResponseException {
        checkAuthorize(person);
        HttpSession session = req.getSession();
        if (personService.checkExistPerson(person)) {
            person = personService.getPerson(person);
        } else {
            person = personService.createNewPerson(person);
        }
        session.setAttribute("person", person);
        resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
}

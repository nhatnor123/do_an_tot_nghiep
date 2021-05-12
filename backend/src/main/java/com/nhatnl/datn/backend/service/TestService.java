package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.request.test.*;
import com.nhatnl.datn.backend.model.Test;

import java.text.ParseException;
import java.util.List;

public interface TestService {

    Test create(CreateReq req) throws ParseException;

    Test update(UpdateReq req);

    Test getById(Long testId);

    List<Test> search(SearchReq req);

    Test archive(Long testId);

}

package com.nhatnl.datn.backend.service;

import com.nhatnl.datn.backend.dto.request.comment.*;
import com.nhatnl.datn.backend.dto.response.comment.CommentResp;
import com.nhatnl.datn.backend.model.Comment;

import java.util.List;

public interface CommentService {

    Comment create(CreateReq req);

    Comment update(UpdateReq req);

    Comment getById(Long commentId);

    List<CommentResp> search(SearchReq req);

    Comment archive(Long commentId);

}

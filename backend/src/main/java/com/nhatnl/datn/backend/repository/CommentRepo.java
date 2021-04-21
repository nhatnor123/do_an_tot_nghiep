package com.nhatnl.datn.backend.repository;

import com.nhatnl.datn.backend.model.Comment;

import java.util.Date;
import java.util.List;

public interface CommentRepo {
    Comment create(Comment comment);

    Comment update(Comment comment);

    void update(Long commentId, String content);

    Comment getById(Long commentId);

    List<Comment> search(Long commentId, Long commentParentId, Long lessonId, Long accountId, String content,
                         Date createdAtFrom, Date createdAtTo, Date updatedAtFrom, Date updatedAtTo, List<String> fieldList);

    void archive(Long commentId);

    void recover(Long commentId);


}

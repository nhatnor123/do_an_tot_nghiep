package com.nhatnl.datn.backend.service.impl;

import com.nhatnl.datn.backend.dto.request.comment.*;
import com.nhatnl.datn.backend.dto.response.comment.CommentResp;
import com.nhatnl.datn.backend.model.Account;
import com.nhatnl.datn.backend.model.Comment;
import com.nhatnl.datn.backend.repository.CommentRepo;
import com.nhatnl.datn.backend.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    public final CommentRepo commentRepo;

    public CommentServiceImpl(CommentRepo commentRepo) {
        this.commentRepo = commentRepo;
    }

    @Override
    public Comment create(CreateReq req) {
        Comment comment = Comment.builder()
                .commentParentId(req.getCommentParentId())
                .lessonId(req.getLessonId())
                .accountId(req.getAccountId())
                .content(req.getContent())
                .isActive(true)
                .build();

        return commentRepo.create(comment);
    }

    @Override
    public Comment update(UpdateReq req) {
        commentRepo.update(
                req.getCommentId(),
                req.getContent()
        );

        return this.getById(req.getCommentId());
    }

    @Override
    public Comment getById(Long commentId) {
        return commentRepo.getById(commentId);
    }

    @Override
    public List<CommentResp> search(SearchReq req) {
        List<Comment> commentList = commentRepo.search(
                req.getCommentId(),
                req.getCommentParentId(),
                req.getLessonId(),
                req.getAccountId(),
                req.getContent(),
                req.getCreatedAtFrom(),
                req.getCreatedAtTo(),
                req.getUpdatedAtFrom(),
                req.getUpdatedAtTo(),
                req.getFieldList()
        );

        List<CommentResp> commentRespList = new ArrayList<>();
        for (Comment comment : commentList) {
            String name = "";
            Account account = comment.getAccount();
            if (account.getRole() == Account.Role.TEACHER) {
                if (account.getTeacher().getDescription().length() == 0) {
                    name = account.getFirstName() + " " + account.getLastName();
                } else {
                    name = account.getTeacher().getDisplayName();
                }
            } else if (account.getRole() == Account.Role.STUDENT) {
                if (account.getStudent().getDescription().length() == 0) {
                    name = account.getFirstName() + " " + account.getLastName();
                } else {
                    name = account.getStudent().getDisplayName();
                }
            }

            commentRespList.add(
                    CommentResp.builder()
                            .comment(comment)
                            .otherInfo(
                                    CommentResp.AccountInfo.builder()
                                            .name(name)
                                            .imageUrl(account.getImageUrl())
                                            .build()
                            )
                            .build());
        }

        return commentRespList;
    }

    @Override
    public Comment archive(Long commentId) {
        commentRepo.archive(commentId);
        return this.getById(commentId);
    }

}

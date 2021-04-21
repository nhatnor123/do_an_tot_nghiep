package com.nhatnl.datn.backend.dto.response.comment;

import com.nhatnl.datn.backend.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResp {
    private Comment comment;
    private AccountInfo otherInfo;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class AccountInfo {
        private String name;
        private String imageUrl;
    }
}

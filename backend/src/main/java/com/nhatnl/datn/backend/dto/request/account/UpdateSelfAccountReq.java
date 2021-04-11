package com.nhatnl.datn.backend.dto.request.account;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateSelfAccountReq {
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String address;
    private String imageUrl;
    private Date birthday;
    private OtherInfo otherInfo;
    private List<String> fieldList;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OtherInfo {
        private String displayName;
        private String description;
        private Boolean isPublic;
    }

}

package com.ibs.common.ibs_common.dto;

import com.ibs.common.ibs_common.model.ibs.Token;
import com.ibs.common.ibs_common.model.ibs.ViewTokenApplication;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class TokenReponseDTO{
    private Token token;
    private ViewTokenApplication TokenApplication;
}
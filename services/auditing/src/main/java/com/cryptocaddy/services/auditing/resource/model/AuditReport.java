package com.cryptocaddy.services.auditing.resource.model;

import org.knowm.xchange.dto.account.AccountInfo;

import java.io.Serializable;

public class AuditReport implements Serializable {
    AccountInfo accountInfo;

    public AuditReport() {

    }

    public AuditReport(AccountInfo accountInfo) {
        //testing exchange api calls with hard-coded data. remove if found
        this.accountInfo = accountInfo;
    }

    public AccountInfo getAccountInfo() {
        return accountInfo;
    }

    public void setAccountInfo(AccountInfo accountInfo) {
        this.accountInfo = accountInfo;
    }
}

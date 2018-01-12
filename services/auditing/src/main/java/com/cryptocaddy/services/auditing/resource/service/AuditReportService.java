package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.binance.BinanceController;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportPathAttributes;
import com.cryptocaddy.services.common.builder.Builder;
import org.knowm.xchange.dto.account.AccountInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuditReportService {
    @Value("${binance.bkey}")
    private String bKey;
    @Value("${binance.bsecret}")
    private String bSecret;

    public AuditReport getAuditReport(AuditReportPathAttributes auditReportPathAttributes,
                                      AuditReportAttributes auditReportAttributes) {

        AccountInfo accountInfo = testingSoRemoveIfFound(bKey, bSecret);

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setAccountInfo(accountInfo))
                .get();
    }

    private AccountInfo testingSoRemoveIfFound(String bKey, String bSecret){
        BinanceController binanceController = new BinanceController(bKey, bSecret);
        return binanceController.getAccountInfo();
    }

}

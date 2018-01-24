package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.services.auditing.model.AuditReport;
import com.cryptocaddy.services.auditing.model.attributes.AuditReportAttributes;
import org.springframework.stereotype.Service;

@Service
public class AuditReportService {

    public AuditReport getAuditReport(AuditReportAttributes auditReportAttributes) {
        String username = auditReportAttributes.getUsername();
        // TODO: 1/13/2018 - use this username and go to core and lookup account exchange apis and generate audit report with trade data

        /* This function is currently useless. Don't let it fool you. */
        /*

        List<Coin> binanceCoinList = testBinanceWallets();

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setCoins(binanceCoinList))
                .get();
                */
        return null;
    }





}

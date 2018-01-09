package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportPathAttributes;
import com.cryptocaddy.services.common.builder.Builder;
import org.springframework.stereotype.Service;

@Service
public class AuditReportService {

    public AuditReport getAuditReport(AuditReportPathAttributes auditReportPathAttributes,
                                      AuditReportAttributes auditReportAttributes) {

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setType(auditReportPathAttributes.getType()))
                .with(auditReport -> auditReport.setName(auditReportAttributes.getName()))
                .get();
    }

}

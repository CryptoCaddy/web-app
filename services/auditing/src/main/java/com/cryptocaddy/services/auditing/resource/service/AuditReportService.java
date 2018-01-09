package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportPathAttributes;
import org.springframework.stereotype.Service;

@Service
public class AuditReportService {

    public AuditReport getAuditReport(AuditReportPathAttributes auditReportPathAttributes,
                                      AuditReportAttributes auditReportAttributes) {

        return new AuditReport(auditReportPathAttributes.getType(), auditReportAttributes.getName());
    }

}

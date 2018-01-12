package com.cryptocaddy.services.auditing.resource.controller;

import com.cryptocaddy.services.auditing.resource.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.resource.api.AuditReportApi;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportPathAttributes;
import com.cryptocaddy.services.auditing.resource.service.AuditReportService;
import com.cryptocaddy.services.auditing.resource.validation.AuditReportValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@RestController
public class AuditReportApiController extends AbstractRestHandler implements AuditReportApi {
    private AuditReportService auditReportService;

    @Autowired
    public AuditReportApiController(AuditReportService auditReportService) {
        this.auditReportService = auditReportService;
    }

    @Override
    public ResponseEntity<AuditReport> auditReportGet(AuditReportPathAttributes auditReportPathAttributes,
                                                      AuditReportAttributes auditReportAttributes) {

        AuditReportValidator auditReportValidator = new AuditReportValidator();
        if (!auditReportValidator.test(auditReportPathAttributes)) {
            return new ResponseEntity<>(new AuditReport(null), HttpStatus.BAD_REQUEST);
        }

        AuditReport auditReport = auditReportService.getAuditReport(auditReportPathAttributes, auditReportAttributes);

        return new ResponseEntity<>(auditReport, HttpStatus.OK);
    }

}

package com.cryptocaddy.services.auditing.controller;

import com.cryptocaddy.services.auditing.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.api.AuditReportApi;
import com.cryptocaddy.services.auditing.model.AuditReport;
import com.cryptocaddy.services.auditing.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.auditing.service.AuditReportService;
import com.cryptocaddy.services.auditing.validation.AuditReportValidator;
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
    public ResponseEntity<AuditReport> auditReportGet(AuditReportAttributes auditReportAttributes) {

        AuditReportValidator auditReportValidator = new AuditReportValidator();
        if (!auditReportValidator.test(auditReportAttributes)) {
            return new ResponseEntity<>(new AuditReport(null), HttpStatus.BAD_REQUEST);
        }

        AuditReport auditReport = auditReportService.getAuditReport(auditReportAttributes);

        return new ResponseEntity<>(auditReport, HttpStatus.OK);
    }

}

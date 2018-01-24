package com.cryptocaddy.services.auditing.api;

import com.cryptocaddy.services.auditing.model.AuditReport;
import com.cryptocaddy.services.auditing.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.common.model.RestErrorInfo;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Nick Fields
 * Date: 1/7/2018
 */
@Api(value = "auditReport", description = "The Audit Report API")
public interface AuditReportApi {

    @ApiOperation(value = "Audit Report", notes = "The Audit Report API returns all auditing details for reports.", response = AuditReport.class, tags = {"Audit Report"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Audit Report Response", response = AuditReport.class),
            @ApiResponse(code = 400, message = "Unexpected Error", response = RestErrorInfo.class)
    })
    @SuppressWarnings("all")
    @RequestMapping(value = "/auditReport/{type}",
            produces = { "application/json" },
            method = RequestMethod.GET)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "Username", required = true, paramType = "query")
    })
    ResponseEntity<AuditReport> auditReportGet(@ModelAttribute AuditReportAttributes auditReportAttributes);

}

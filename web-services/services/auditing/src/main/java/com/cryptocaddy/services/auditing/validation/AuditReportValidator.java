package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static org.apache.commons.lang3.StringUtils.isBlank;

public class AuditReportValidator extends GenericValidator<AuditReportAttributes> {
    private static final List<Predicate<AuditReportAttributes>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(auditReportPathAttributes -> notBlank(auditReportPathAttributes.getUsername()));
    }

    public AuditReportValidator() {
        super(VALIDATORS);
    }

    @SuppressWarnings("unused")
    private static boolean notBlank(String value) {
        if (isBlank(value)) {
            throw new IllegalArgumentException("Required path parameter may not be null or empty!");
        }
        return true;
    }
}

package com.cryptocaddy.services.auditing.resource.validation;

import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportPathAttributes;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static org.apache.commons.lang3.StringUtils.isBlank;

public class AuditReportValidator extends GenericValidator<AuditReportPathAttributes> {
    private static final List<Predicate<AuditReportPathAttributes>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(auditReportPathAttributes -> notBlank("Type", auditReportPathAttributes.getType()));
    }

    public AuditReportValidator() {
        super(VALIDATORS);
    }

    private static boolean notBlank(String desc, String value) {
        if (isBlank(value)) {
            throw new IllegalArgumentException(desc + " may not be null or empty");
        }
        return true;
    }
}

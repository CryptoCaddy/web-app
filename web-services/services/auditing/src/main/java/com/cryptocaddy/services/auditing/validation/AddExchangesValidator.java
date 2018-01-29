package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.attributes.AddExchangesRequestBody;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static org.apache.commons.lang3.StringUtils.isBlank;

public class AddExchangesValidator extends GenericValidator<AddExchangesRequestBody> {
    private static final List<Predicate<AddExchangesRequestBody>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(addExchangesRequestBody -> notBlank(addExchangesRequestBody.getUsername()));
    }

    public AddExchangesValidator() {
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

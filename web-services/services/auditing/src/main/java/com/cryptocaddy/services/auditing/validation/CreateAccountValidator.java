package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.attributes.CreateAccountRequestBody;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static org.apache.commons.lang3.StringUtils.isBlank;

public class CreateAccountValidator extends GenericValidator<CreateAccountRequestBody> {
    private static final List<Predicate<CreateAccountRequestBody>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(createAccountRequestBody -> notBlank(createAccountRequestBody.getEmail()));
    }

    public CreateAccountValidator() {
        super(VALIDATORS);
    }


}

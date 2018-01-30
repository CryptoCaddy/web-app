package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.request.RequestAddExchanges;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

public class AddExchangesValidator extends GenericValidator<RequestAddExchanges> {
    private static final List<Predicate<RequestAddExchanges>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(requestAddExchanges -> notBlank(requestAddExchanges.getUsername()));
    }

    public AddExchangesValidator() {
        super(VALIDATORS);
    }

}

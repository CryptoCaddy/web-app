package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

public class AddExchangeValidator extends GenericValidator<RequestAddExchange> {
    private static final List<Predicate<RequestAddExchange>> VALIDATORS = new LinkedList<>();

    static {

    }

    public AddExchangeValidator() {
        super(VALIDATORS);
    }

}

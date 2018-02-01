package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.request.RequestCreateAccount;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

public class CreateAccountValidator extends GenericValidator<RequestCreateAccount> {
    private static final List<Predicate<RequestCreateAccount>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(requestCreateAccount -> notBlank(requestCreateAccount.getEmail()));
        VALIDATORS.add(requestCreateAccount -> notBlank(requestCreateAccount.getToken()));

        VALIDATORS.add(requestCreateAccount -> isAuthorized(requestCreateAccount.getToken()));
    }

    public CreateAccountValidator() {
        super(VALIDATORS);
    }


}

package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.request.RequestAddExchange;
import com.cryptocaddy.services.common.validation.GenericValidator;
import com.cryptocaddy.xchange.data.exchanges.IExchangeController;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;


public class AddExchangeValidator extends GenericValidator<RequestAddExchange> {
    private static final List<Predicate<RequestAddExchange>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(requestAddExchange -> notBlank(requestAddExchange.getExchangeName()));
        VALIDATORS.add(requestAddExchange -> requiredParametersExist(requestAddExchange));

    }

    public AddExchangeValidator() {
        super(VALIDATORS);
    }

    protected static boolean requiredParametersExist(RequestAddExchange requestAddExchange) {
        //TODO: this still needs implementation. Check the provided parameters in the request against the required ones in the Exchange Controller
        return true;
    }

}

package com.cryptocaddy.services.auditing.validation;

import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import com.cryptocaddy.services.common.validation.GenericValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static org.apache.commons.lang3.StringUtils.isBlank;

public class ExchangeValidator extends GenericValidator<Exchange> {
    private static final List<Predicate<Exchange>> VALIDATORS = new LinkedList<>();

    static {
        VALIDATORS.add(exchange -> notBlank(exchange.getExchangeName()));
        VALIDATORS.add(exchange -> notBlank(exchange.getExchangeKey()));
        VALIDATORS.add(exchange -> notBlank(exchange.getExchangeSecret()));
    }

    public ExchangeValidator() {
        super(VALIDATORS);
    }

    @SuppressWarnings("unused")
    private static boolean notBlank(String value) {
        if (isBlank(value)) {
            throw new IllegalArgumentException("Required exchange name, api key and api secret parameter may not be null or empty!");
        }
        return true;
    }
}

package com.cryptocaddy.services.common.validation;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

public class GenericValidator<T> implements Predicate<T> {
    private final List<Predicate<T>> validators = new LinkedList<>();

    public GenericValidator(List<Predicate<T>> validators) {
        this.validators.addAll(validators);
    }

    @Override
    public boolean test(final T toValidate) {
        return validators.parallelStream().allMatch(tPredicate -> tPredicate.test(toValidate));
    }

}

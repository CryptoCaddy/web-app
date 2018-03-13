package com.cryptocaddy.services.common.validation;

import com.cryptocaddy.services.common.authentication.JWTAuthenticator;
import com.cryptocaddy.services.common.exception.UserAuthenticationException;

import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static org.apache.commons.lang3.StringUtils.isBlank;

public class GenericValidator<T> implements Predicate<T> {
    private final List<Predicate<T>> validators = new LinkedList<>();

    public GenericValidator(List<Predicate<T>> validators) {
        this.validators.addAll(validators);
    }

    @Override
    public boolean test(final T toValidate) {
        return validators.parallelStream().allMatch(tPredicate -> tPredicate.test(toValidate));
    }

    protected static boolean notBlank(String value) {
        if (isBlank(value)) {
            throw new IllegalArgumentException("Required path parameter may not be null or empty!");
        }
        return true;
    }

    /**
     * Authorize a user by JWT token
     * @param token
     * @return
     */
    protected static boolean isAuthorized(String token) {

        if (JWTAuthenticator.isAuthorized(token))
            return true;

        return false;

    }


}

package com.cryptocaddy.services.auditing.model.builder;

import java.util.function.Consumer;

/**
 * Created by: Nick Fields
 * Date: 1/8/2018
 */
public class Builder<T> {
    private T instance;

    private Builder(Class<T> clazz) {
        try {
            this.instance = clazz.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    public Builder<T> with(Consumer<T> setter) {
        setter.accept(instance);
        return this;
    }

    public static <T> Builder<T> build(Class<T> clazz) {
        return new Builder<>(clazz);
    }

    public T get() {
        return instance;
    }

}

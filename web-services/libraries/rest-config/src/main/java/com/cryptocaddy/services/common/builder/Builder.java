package com.cryptocaddy.services.common.builder;

import java.lang.reflect.InvocationTargetException;
import java.util.function.Consumer;

/**
 * Created by: Nick Fields
 * Date: 1/8/2018
 */
public class Builder<T> {
    private T instance;

    private Builder(Class<T> clazz) {
        try {
            this.instance = clazz.getConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
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

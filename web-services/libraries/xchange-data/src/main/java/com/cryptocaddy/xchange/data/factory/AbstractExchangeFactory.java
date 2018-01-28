package com.cryptocaddy.xchange.data.factory;

import com.cryptocaddy.xchange.data.exchanges.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class AbstractExchangeFactory implements ApplicationContextAware {
    private ApplicationContext applicationContext;

    private static final Logger LOGGER = LoggerFactory.getLogger(AbstractExchangeFactory.class);

    public IExchangeController getExchangeController(ExchangeType exchange) {
        IExchangeController exchangeController;

        try {
            switch (exchange) {
                case GDAX:
                    exchangeController = applicationContext.getBean(GdaxController.class);
                    break;
                case BINANCE:
                    exchangeController = applicationContext.getBean(BinanceController.class);
                    break;
                case BITTREX:
                    exchangeController = applicationContext.getBean(BittrexController.class);
                    break;
                default:
                    //TODO: this should not return base class since it is abstract and not usable by itself
                    exchangeController = applicationContext.getBean(ExchangeController.class);
                    break;
            }

            return exchangeController;
        } catch (Exception e) {
            LOGGER.error("Failed to get exchange controller: ", e);
        }

        return null;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}

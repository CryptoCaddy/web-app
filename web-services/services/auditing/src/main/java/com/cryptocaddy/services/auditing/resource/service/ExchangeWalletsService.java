package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import com.cryptocaddy.core.exchanges.ExchangeControllerBuilder;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.Exchange;
import com.cryptocaddy.services.common.builder.Builder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExchangeWalletsService {

    public AuditReport getExchangeWallets(Exchange exchange) {
        String exchangeName = exchange.getExchangeName();
        String exchangeKey = exchange.getExchangeKey();
        String exchangeSecret = exchange.getExchangeSecret();
        String exchangePass = exchange.getExchangePass();

        ExchangeController controller = ExchangeControllerBuilder.createExchangeController(exchangeName, exchangeKey, exchangeSecret, exchangePass);
        List<Coin> coinList = controller.getAllCoins();

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setCoins(coinList))
                .get();

    }

}

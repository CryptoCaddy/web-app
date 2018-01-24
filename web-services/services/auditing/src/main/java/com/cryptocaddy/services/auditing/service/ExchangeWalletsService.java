package com.cryptocaddy.services.auditing.service;

import com.cryptocaddy.fiat.client.service.IFiatEngineService;
import com.cryptocaddy.xchange.data.model.Coin;
import com.cryptocaddy.xchange.data.exchanges.ExchangeController;
import com.cryptocaddy.xchange.data.exchanges.ExchangeControllerBuilder;
import com.cryptocaddy.services.auditing.model.AuditReport;
import com.cryptocaddy.services.auditing.model.attributes.Exchange;
import com.cryptocaddy.services.common.builder.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExchangeWalletsService {
    private final IFiatEngineService fiatEngineService;

    @Autowired
    public ExchangeWalletsService(IFiatEngineService fiatEngineService) {
        this.fiatEngineService = fiatEngineService;
    }

    public AuditReport getExchangeWallets(Exchange exchange) {
        String exchangeName = exchange.getExchangeName();
        String exchangeKey = exchange.getExchangeKey();
        String exchangeSecret = exchange.getExchangeSecret();
        String exchangePass = exchange.getExchangePass();

        ExchangeController controller = ExchangeControllerBuilder.createExchangeController(exchangeName, exchangeKey, exchangeSecret, exchangePass);
        List<Coin> coinList = controller != null ? controller.getAllCoins() : new ArrayList<>();

        // Convert crypto value via Fiat Engine
        BigDecimal fiatValue = fiatEngineService.convertValues(null, null, null, null);

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setCoins(coinList))
                .get();

    }

}

package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import com.cryptocaddy.core.exchanges.binance.BinanceController;
import com.cryptocaddy.core.exchanges.bittrex.BittrexController;
import com.cryptocaddy.core.exchanges.coinbase.CoinbaseController;
import com.cryptocaddy.core.exchanges.gdax.GdaxController;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.common.builder.Builder;
import org.knowm.xchange.dto.trade.UserTrade;
import org.knowm.xchange.dto.trade.UserTrades;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditReportService {

    public AuditReport getAuditReport(AuditReportAttributes auditReportAttributes) {
        String username = auditReportAttributes.getUsername();
        // TODO: 1/13/2018 - use this username and go to core and lookup account exchange apis and generate audit report with trade data

        /* This function is currently useless. Don't let it fool you. */
        /*

        List<Coin> binanceCoinList = testBinanceWallets();

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setCoins(binanceCoinList))
                .get();
                */
        return null;
    }





}

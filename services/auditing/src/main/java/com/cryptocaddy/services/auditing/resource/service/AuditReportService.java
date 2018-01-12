package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.binance.BinanceController;
import com.cryptocaddy.core.exchanges.bittrex.BittrexController;
import com.cryptocaddy.core.exchanges.coinbase.CoinbaseController;
import com.cryptocaddy.core.exchanges.gdax.GdaxController;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportPathAttributes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuditReportService {


    //TODO: Remove test functions and actually implement real audit report retriever
    public AuditReport getAuditReport(AuditReportPathAttributes auditReportPathAttributes,
                                      AuditReportAttributes auditReportAttributes) {

        /* This function is currently useless. Don't let it fool you. */



        runTestRoutines();
        return null;

        /*
        AccountInfo accountInfo = AccountInfo();

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setAccountInfo(accountInfo))
                .get();
                */
    }

    private void runTestRoutines(){
        testBinance();
        testBittrex();
        testGDAX();

        //Coinbase is currently not working as is.
        //testCoinbase();

    }

    /*
    TEMPORARY TESTING FUNCTIONS. USE config-local.yml to hardcode api keys for testing
     */

    @Value("${binance.binancekey}")
    private String binanceKey;
    @Value("${binance.binancesecret}")
    private String binanceSecret;
    private void testBinance(){
        BinanceController binanceController = new BinanceController(binanceKey, binanceSecret);
        binanceController.getAllCoins();
    }


    @Value("${bittrex.bittrexkey}")
    private String bittrexKey;
    @Value("${bittrex.bittrexsecret}")
    private String bittrexSecret;
    private void testBittrex(){
        BittrexController bittrexController = new BittrexController(bittrexKey, bittrexSecret);
        bittrexController.getAllCoins();
    }

    @Value("${coinbase.coinbasekey}")
    private String coinbaseKey;
    @Value("${coinbase.coinbasesecret}")
    private String coinbaseSecret;
    private void testCoinbase(){
        CoinbaseController coinbaseController = new CoinbaseController(coinbaseKey, coinbaseSecret);
        coinbaseController.getAllCoins();
    }

    @Value("${gdax.gdaxkey}")
    private String gdaxKey;
    @Value("${gdax.gdaxsecret}")
    private String gdaxSecret;
    @Value("${gdax.gdaxpass}")
    private String gdaxPass;
    private void testGDAX(){
        GdaxController gdaxController = new GdaxController(gdaxKey, gdaxSecret, gdaxPass);
        gdaxController.getAllCoins();
    }

}

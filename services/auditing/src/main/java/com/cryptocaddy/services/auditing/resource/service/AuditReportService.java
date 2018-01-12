package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import com.cryptocaddy.core.exchanges.binance.BinanceController;
import com.cryptocaddy.core.exchanges.bittrex.BittrexController;
import com.cryptocaddy.core.exchanges.coinbase.CoinbaseController;
import com.cryptocaddy.core.exchanges.gdax.GdaxController;
import com.cryptocaddy.services.auditing.resource.model.AuditReport;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportAttributes;
import com.cryptocaddy.services.auditing.resource.model.attributes.AuditReportPathAttributes;
import com.cryptocaddy.services.common.builder.Builder;
import org.knowm.xchange.dto.trade.UserTrade;
import org.knowm.xchange.dto.trade.UserTrades;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuditReportService {


    //TODO: Remove test functions and actually implement real audit report retriever
    public AuditReport getAuditReport(AuditReportPathAttributes auditReportPathAttributes,
                                      AuditReportAttributes auditReportAttributes) {

        /* This function is currently useless. Don't let it fool you. */



        runTestRoutines();

        return null;

        /*
        ArrayList<Coin> binanceCoinList = testBinance();

        return Builder.build(AuditReport.class)
                .with(auditReport -> auditReport.setCoins(binanceCoinList))
                .get();*/
    }

    private void runTestRoutines(){

        testBinanceWallets();
        testBinanceTrades();

        testBittrexWallets();
        testBittrexTrades();

        testGDAXWallets();
        testGDAXTrades();

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
    private ArrayList<Coin> testBinanceWallets(){
        if (binanceSecret == "" || binanceKey == "") {
            return null;
        }
        BinanceController binanceController = new BinanceController(binanceKey, binanceSecret);
        return binanceController.getAllCoins();
    }

    private List<UserTrade> testBinanceTrades(){
        if (binanceSecret == "" || binanceKey == "") {
            return null;
        }
        BinanceController binanceController = new BinanceController(binanceKey, binanceSecret);
        return getUserTrades(binanceController);
    }


    @Value("${bittrex.bittrexkey}")
    private String bittrexKey;
    @Value("${bittrex.bittrexsecret}")
    private String bittrexSecret;
    private ArrayList<Coin> testBittrexWallets(){
        if (bittrexKey == "" || bittrexSecret == "") {
            return null;
        }
        BittrexController bittrexController = new BittrexController(bittrexKey, bittrexSecret);
        return bittrexController.getAllCoins();
    }

    private List<UserTrade> testBittrexTrades(){
        if (bittrexKey == "" || binanceSecret == "") {
            return null;
        }
        BittrexController bittrexController = new BittrexController(bittrexKey, bittrexSecret);
        return getUserTrades(bittrexController);
    }


    @Value("${coinbase.coinbasekey}")
    private String coinbaseKey;
    @Value("${coinbase.coinbasesecret}")
    private String coinbaseSecret;
    private ArrayList<Coin> testCoinbaseWallets(){
        if (coinbaseKey == "" || coinbaseSecret == "") {
            return null;
        }
        CoinbaseController coinbaseController = new CoinbaseController(coinbaseKey, coinbaseSecret);
        return coinbaseController.getAllCoins();
    }

    @Value("${gdax.gdaxkey}")
    private String gdaxKey;
    @Value("${gdax.gdaxsecret}")
    private String gdaxSecret;
    @Value("${gdax.gdaxpass}")
    private String gdaxPass;
    private ArrayList<Coin> testGDAXWallets(){
        if (gdaxKey == "" || gdaxSecret == "" || gdaxPass == "") {
            return null;
        }
        GdaxController gdaxController = new GdaxController(gdaxKey, gdaxSecret, gdaxPass);
        return gdaxController.getAllCoins();
    }

    private List<UserTrade> testGDAXTrades(){
        if (gdaxKey == "" || gdaxSecret == "" || gdaxPass == "") {
            return null;
        }

        GdaxController gdaxController = new GdaxController(gdaxKey, gdaxSecret, gdaxPass);
        return getUserTrades(gdaxController);
    }

    private List<UserTrade> getUserTrades(ExchangeController controller){
        UserTrades userTrades = controller.getTradeHistory();

        if (userTrades == null) { return null; }
        return userTrades.getUserTrades();
    }

}

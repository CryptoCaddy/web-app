package com.cryptocaddy.services.auditing.resource.service;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.core.exchanges.ExchangeController;
import com.cryptocaddy.core.exchanges.binance.BinanceController;
import com.cryptocaddy.core.exchanges.bittrex.BittrexController;
import com.cryptocaddy.core.exchanges.coinbase.CoinbaseController;
import com.cryptocaddy.core.exchanges.gdax.GdaxController;
import org.knowm.xchange.dto.trade.UserTrade;
import org.knowm.xchange.dto.trade.UserTrades;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestExchangeService {

    /*
    TEMPORARY TESTING FUNCTIONS. USE config-local.yml to hardcode api keys for testing
     */

    public List<Coin> runWalletTestRoutines(){

        List<Coin> coinList = new ArrayList<>();

        List<Coin> binanceList = testBinanceWallets();
        if (binanceList != null)
            coinList.addAll(binanceList);

        List<Coin> bittrexList = testBittrexWallets();
        if (bittrexList != null)
            coinList.addAll(bittrexList);

        List<Coin> gdaxList = testGDAXWallets();
        if (gdaxList != null)
            coinList.addAll(gdaxList);

        /* coinbase not currently working correctly
        List<Coin> coinbaseList = testCoinbaseWallets();
        if (coinbaseList != null)
            coinList.addAll(coinbaseList);
            */

        return coinList;

    }

    public List<UserTrade> runTradeHistoryTestRoutines(){

        List<UserTrade> tradeList = new ArrayList<>();

        List<UserTrade> binanceList = testBinanceTrades();
        if (binanceList != null)
            tradeList.addAll(binanceList);

        List<UserTrade> bittrexList = testBittrexTrades();
        if (bittrexList != null)
            tradeList.addAll(bittrexList);

        List<UserTrade> gdaxList = testGDAXTrades();
        if (gdaxList != null)
            tradeList.addAll(gdaxList);

        /* coinbase not currently working correctly
        List<Coin> coinbaseList = testCoinbaseTrades();
        if (coinbaseList != null)
            coinList.addAll(coinbaseList);
            */

        return tradeList;

    }





    @Value("${binance.binancekey:}")
    private String binanceKey;
    @Value("${binance.binancesecret:}")
    private String binanceSecret;
    private List<Coin> testBinanceWallets(){
        if (binanceSecret == null || binanceKey == null || binanceSecret.isEmpty() || binanceKey.isEmpty()) {
            System.out.println("Null or empty key/secret");
            return null;
        }
        BinanceController binanceController = new BinanceController(binanceKey, binanceSecret);
        return binanceController.getAllCoins();
    }

    private List<UserTrade> testBinanceTrades(){
        if (binanceSecret == null || binanceKey == null || binanceSecret.isEmpty() || binanceKey.isEmpty()) {
            System.out.println("Null or empty key/secret");
            return null;
        }
        BinanceController binanceController = new BinanceController(binanceKey, binanceSecret);
        return getUserTrades(binanceController);
    }


    @Value("${bittrex.bittrexkey:}")
    private String bittrexKey;
    @Value("${bittrex.bittrexsecret:}")
    private String bittrexSecret;
    private List<Coin> testBittrexWallets(){
        if (bittrexKey == null || bittrexSecret == null || bittrexKey.isEmpty() || bittrexSecret.isEmpty()) {
            System.out.println("Null or empty key/secret");
            return null;
        }
        BittrexController bittrexController = new BittrexController(bittrexKey, bittrexSecret);
        return bittrexController.getAllCoins();
    }

    private List<UserTrade> testBittrexTrades(){
        if (bittrexKey == null || bittrexSecret == null || bittrexKey.isEmpty() || bittrexSecret.isEmpty()) {
            System.out.println("Null or empty key/secret");
            return null;
        }
        BittrexController bittrexController = new BittrexController(bittrexKey, bittrexSecret);
        return getUserTrades(bittrexController);
    }


    @Value("${coinbase.coinbasekey:}")
    private String coinbaseKey;
    @Value("${coinbase.coinbasesecret:}")
    private String coinbaseSecret;
    private List<Coin> testCoinbaseWallets(){
        if (coinbaseKey == null || coinbaseSecret == null || coinbaseKey.isEmpty() || coinbaseSecret.isEmpty()) {
            System.out.println("Null or empty key/secret");
            return null;
        }
        CoinbaseController coinbaseController = new CoinbaseController(coinbaseKey, coinbaseSecret);
        return coinbaseController.getAllCoins();
    }

    @Value("${gdax.gdaxkey:}")
    private String gdaxKey;
    @Value("${gdax.gdaxsecret:}")
    private String gdaxSecret;
    @Value("${gdax.gdaxpass:}")
    private String gdaxPass;
    private List<Coin> testGDAXWallets(){
        if (gdaxKey == null || gdaxSecret == null || gdaxPass == null || gdaxKey.isEmpty() || gdaxSecret.isEmpty() || gdaxPass.isEmpty()) {
            System.out.println("Null or empty key/secret");
            return null;
        }
        GdaxController gdaxController = new GdaxController(gdaxKey, gdaxSecret, gdaxPass);
        return gdaxController.getAllCoins();
    }

    private List<UserTrade> testGDAXTrades(){
        if (gdaxKey == null || gdaxSecret == null || gdaxPass == null || gdaxKey.isEmpty() || gdaxSecret.isEmpty() || gdaxPass.isEmpty()) {
            System.out.println("Null or empty key/secret");
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

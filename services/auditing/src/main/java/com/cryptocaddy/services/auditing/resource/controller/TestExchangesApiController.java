package com.cryptocaddy.services.auditing.resource.controller;

import com.cryptocaddy.core.exchanges.Coin;
import com.cryptocaddy.services.auditing.resource.api.AbstractRestHandler;
import com.cryptocaddy.services.auditing.resource.api.TestExchangesApi;
import com.cryptocaddy.services.auditing.resource.service.AuditReportService;
import com.cryptocaddy.services.auditing.resource.service.TestExchangeService;
import org.knowm.xchange.dto.trade.UserTrade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Jon Waggoner
 * Date: 1/12/2018
 */
@RestController
public class TestExchangesApiController extends AbstractRestHandler implements TestExchangesApi {
    private TestExchangeService testExchangeService;

    @Autowired
    public TestExchangesApiController(TestExchangeService testExchangeService) {
        this.testExchangeService = testExchangeService;
    }

    @Override
    public ResponseEntity<List<Coin>> testExchangeWallets() {

        List<Coin> result = testExchangeService.runWalletTestRoutines();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserTrade>> testExchangeTrades() {

        List<UserTrade> result = testExchangeService.runTradeHistoryTestRoutines();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}

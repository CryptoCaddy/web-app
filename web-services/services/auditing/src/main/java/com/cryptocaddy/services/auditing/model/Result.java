package com.cryptocaddy.services.auditing.model;

import java.util.ArrayList;
import java.util.List;

public class Result {
    private String status;
    private List<String> results;

    public Result(String status) {
        this.status = status;
        results = new ArrayList<>();
    }

    public String getStatus() {
        return status;
    }
    public List<String> getResults() {
        return results;
    }

    public void addResult(String resultToAdd){
        results.add(resultToAdd);
    }

}

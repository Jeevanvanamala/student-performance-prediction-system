package com.student.performance.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MlInfoController {

    @GetMapping("/ml-model-info")
    public Map<String, Object> getModelInfo() {

        RestTemplate restTemplate = new RestTemplate();

        String flaskUrl = "http://127.0.0.1:5000/model-info";

        Map<String, Object> response =
                restTemplate.getForObject(flaskUrl, Map.class);

        return response;
    }
}
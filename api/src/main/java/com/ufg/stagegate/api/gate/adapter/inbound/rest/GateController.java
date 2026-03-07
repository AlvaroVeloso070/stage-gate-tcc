package com.ufg.stagegate.api.gate.adapter.inbound.rest;

import com.ufg.stagegate.api.core.response.ApiResponse;
import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.GateResponse;
import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.UpdateGateRequest;
import com.ufg.stagegate.api.gate.domain.port.inbound.ListGatesUseCase;
import com.ufg.stagegate.api.gate.domain.port.inbound.UpdateGateUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/gates")
@RequiredArgsConstructor
public class GateController {

    private final ListGatesUseCase listGatesUseCase;
    private final UpdateGateUseCase updateGateUseCase;

    @GetMapping
    public ResponseEntity<ApiResponse<List<GateResponse>>> listGates() {
        List<GateResponse> gates = listGatesUseCase.execute();
        return ResponseEntity.ok(ApiResponse.ok(gates));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GateResponse>> updateGate(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateGateRequest request) {
        
        GateResponse updatedGate = updateGateUseCase.execute(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Gate updated successfully", updatedGate));
    }
}

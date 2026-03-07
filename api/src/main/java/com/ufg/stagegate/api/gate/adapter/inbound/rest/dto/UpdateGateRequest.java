package com.ufg.stagegate.api.gate.adapter.inbound.rest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateGateRequest(
        @NotBlank(message = "Name cannot be blank")
        @Size(max = 255, message = "Name must have at most 255 characters")
        String name,

        @NotNull(message = "hasDeliverable flag must be provided")
        Boolean hasDeliverable
) {
}

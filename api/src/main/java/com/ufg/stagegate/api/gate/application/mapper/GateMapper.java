package com.ufg.stagegate.api.gate.application.mapper;

import com.ufg.stagegate.api.gate.adapter.inbound.rest.dto.GateResponse;
import com.ufg.stagegate.api.gate.domain.model.Gate;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GateMapper {
    GateResponse toResponse(Gate gate);
    List<GateResponse> toResponseList(List<Gate> gates);
}

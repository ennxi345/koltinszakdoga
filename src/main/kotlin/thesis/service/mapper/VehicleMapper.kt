package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Vehicle
import thesis.service.dto.VehicleDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface VehicleMapper : EntityMapper<VehicleDTO, Vehicle>

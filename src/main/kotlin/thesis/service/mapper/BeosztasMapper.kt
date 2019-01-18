package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Beosztas
import thesis.service.dto.BeosztasDTO


@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface BeosztasMapper : EntityMapper<BeosztasDTO, Beosztas>

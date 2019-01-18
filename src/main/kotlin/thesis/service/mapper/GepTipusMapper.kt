package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.GepTipus
import thesis.service.dto.GepTipusDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface GepTipusMapper : EntityMapper<GepTipusDTO, GepTipus>


package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Gep
import thesis.service.dto.GepDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface GepMapper : EntityMapper<GepDTO, Gep>

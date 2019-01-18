package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Megye
import thesis.service.dto.MegyeDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface MegyeMapper : EntityMapper<MegyeDTO, Megye>

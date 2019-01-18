package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Dolgozo
import thesis.service.dto.DolgozoDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface DolgozoMapper : EntityMapper<DolgozoDTO, Dolgozo>

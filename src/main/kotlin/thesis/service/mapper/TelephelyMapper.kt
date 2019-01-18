package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Telephely
import thesis.service.dto.TelephelyDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface TelephelyMapper : EntityMapper<TelephelyDTO, Telephely>

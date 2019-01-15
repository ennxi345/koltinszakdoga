package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Dolgozo
import thesis.service.dto.DolgozoDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface DolgozoMapper {
    fun convertToDto(dolgozo: Dolgozo): DolgozoDTO

    fun convertToEntity(dolgozoDto: DolgozoDTO): Dolgozo

    fun convertToDtoList(dolgozoList: List<Dolgozo>): List<DolgozoDTO>

    fun convertToEntityList(dolgozoDtoList: List<DolgozoDTO>): List<Dolgozo>
}

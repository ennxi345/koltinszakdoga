package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Marka
import thesis.service.dto.MarkaDTO

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface MarkaMapper {
    fun convertToDto(marka: Marka): MarkaDTO

    fun convertToEntity(markaDto: MarkaDTO): Marka

    fun convertToDtoList(markaList: List<Marka>): List<MarkaDTO>

    fun convertToEntityList(markaDtoList: List<MarkaDTO>): List<Marka>
}

package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.GepTipus
import thesis.service.dto.GepTipusDTO

@Mapper(componentModel = "spring",collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface GepTipusMapper {
    fun convertToDto(gepTipus: GepTipus): GepTipusDTO

    fun convertToEntity(gepTipusDto: GepTipusDTO): GepTipus

    fun convertToDtoList(gepTipusList: List<GepTipus>): List<GepTipusDTO>

    fun convertToEntityList(gepTipusDtoList: List<GepTipusDTO>): List<GepTipus>
}


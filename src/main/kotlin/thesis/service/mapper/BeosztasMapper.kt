package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Beosztas
import thesis.service.dto.BeosztasDTO


@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
interface BeosztasMapper {

    fun convertToDto(beosztas: Beosztas): BeosztasDTO

    fun convertToEntity(beosztasDto: BeosztasDTO): Beosztas

    fun convertToDtoList(beosztasList: List<Beosztas>): List<BeosztasDTO>

    fun convertToEntityList(beosztasDtoList: List<BeosztasDTO>): List<Beosztas>
}

package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.Megye
import thesis.service.dto.MegyeDTO

@Mapper(componentModel = "spring",collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED )
interface MegyeMapper {

    fun convertToDto(megye: Megye) : MegyeDTO

    fun convertToEntity(megyeDto: MegyeDTO ) : Megye

    fun convertToDtoList(megyeList: List<Megye>) : List<MegyeDTO>

    fun convertToEntityList(megyeDtoList: List<MegyeDTO>) : List<Megye>
}

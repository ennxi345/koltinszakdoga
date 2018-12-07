package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import thesis.entities.Telephely
import thesis.service.dto.TelephelyDTO

@Mapper(componentModel = "spring",collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED )
interface TelephelyMapper {


    fun convertToDto(telephely: Telephely) : TelephelyDTO

    fun convertToEntity(telephelyDto: TelephelyDTO) : Telephely

    fun convertToDtoList(telephelyList: List<Telephely>) : List<TelephelyDTO>

    fun convertToEntityList(telephelyDtoList: List<TelephelyDTO>) : List<Telephely>
}

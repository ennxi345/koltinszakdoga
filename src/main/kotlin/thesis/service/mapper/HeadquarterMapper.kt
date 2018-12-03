package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import thesis.entities.Headquarter
import thesis.service.dto.HeadquarterDTO

@Mapper(componentModel = "spring",collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED )
interface HeadquarterMapper {


    @Mapping(source = "county.id", target = "countyId")
    fun convertToDto(headquarter: Headquarter) : HeadquarterDTO

    @Mapping(source = "countyId", target = "county.id")
    fun convertToEntity(headquarterDto: HeadquarterDTO) : Headquarter

    fun convertToDtoList(headquarterList: List<Headquarter>) : List<HeadquarterDTO>

    fun convertToEntityList(headquarterDtoList: List<HeadquarterDTO>) : List<Headquarter>
}

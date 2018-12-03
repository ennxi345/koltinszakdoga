package thesis.service.mapper

import org.mapstruct.CollectionMappingStrategy
import org.mapstruct.Mapper
import thesis.entities.County
import thesis.service.dto.CountyDTO

@Mapper(componentModel = "spring",collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED )
interface CountyMapper {

    fun convertToDto(county: County) : CountyDTO

    fun convertToEntity(countyDto: CountyDTO ) : County

    fun convertToDtoList(countyList: List<County>) : List<CountyDTO>

    fun convertToEntityList(countyDtoList: List<CountyDTO>) : List<County>
}

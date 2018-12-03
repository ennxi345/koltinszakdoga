package thesis.service.impl

import org.springframework.stereotype.Service
import thesis.repository.CountyRepository
import thesis.service.CountyService
import thesis.service.dto.CountyDTO
import thesis.service.mapper.CountyMapper

@Service
class CountyServiceImpl(val countyRepository: CountyRepository,val countyMapper: CountyMapper) : CountyService {


    override fun getAll(): List<CountyDTO> {
        return countyMapper.convertToDtoList(countyRepository.findAll())
    }
}

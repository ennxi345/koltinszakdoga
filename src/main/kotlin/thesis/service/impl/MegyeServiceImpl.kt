package thesis.service.impl

import org.springframework.stereotype.Service
import thesis.repository.CountyRepository
import thesis.service.MegyeService
import thesis.service.dto.MegyeDTO
import thesis.service.mapper.MegyeMapper

@Service
class MegyeServiceImpl(val countyRepository: CountyRepository, val megyeMapper: MegyeMapper) : MegyeService {


    override fun getAll(): List<MegyeDTO> {
        return megyeMapper.convertToDtoList(countyRepository.findAll())
    }
}

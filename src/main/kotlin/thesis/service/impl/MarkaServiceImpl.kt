package thesis.service.impl

import org.springframework.stereotype.Service
import thesis.repository.MarkaRepository
import thesis.service.MarkaService
import thesis.service.dto.MarkaDTO
import thesis.service.mapper.MarkaMapper

@Service
class MarkaServiceImpl(val markaRepository: MarkaRepository, val mapper: MarkaMapper) : MarkaService {

    override fun getAll(): List<MarkaDTO> {
        return markaRepository.findAll().map(mapper::toDto)
    }
}

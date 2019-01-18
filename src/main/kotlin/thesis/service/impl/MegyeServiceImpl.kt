package thesis.service.impl

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import thesis.repository.MegyeRepository
import thesis.service.MegyeService
import thesis.service.dto.MegyeDTO
import thesis.service.mapper.MegyeMapper

@Service
@Transactional
class MegyeServiceImpl(val megyeRepository: MegyeRepository, val mapper: MegyeMapper) : MegyeService {

    @Transactional(readOnly = true)
    override fun getAll(): List<MegyeDTO> {
        return megyeRepository.findAll().map(mapper::toDto)
    }
}
